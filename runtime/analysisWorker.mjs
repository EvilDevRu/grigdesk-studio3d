import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// src/lib/studio3d/analysisWorker.ts
import {
  closeSync,
  constants as FS,
  fstatSync,
  fsyncSync,
  linkSync,
  openSync,
  readSync,
  realpathSync,
  unlinkSync,
  writeSync
} from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

// src/lib/studio3d/glb.ts
var GLB_MAGIC = 1179937895;
var CHUNK_JSON = 1313821514;
var CHUNK_BIN = 5130562;
var IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var GLB_MAX_BYTES = 150 * 1024 * 1024;
var GLB_JSON_MAX_BYTES = 16 * 1024 * 1024;
var GLB_MAX_NODES = 1e5;
var GLB_MAX_DEPTH = 256;
var FACE_PLUS_Z = [0, -Math.SQRT1_2, 0, Math.SQRT1_2];
var GlbError = class extends Error {
  code;
  constructor(code) {
    super(code);
    this.code = code;
  }
};
function parseGlb(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.byteLength < 20 || view.getUint32(0, true) !== GLB_MAGIC) {
    throw new GlbError("not_glb");
  }
  const total = view.getUint32(8, true);
  if (bytes.byteLength > GLB_MAX_BYTES) {
    throw new GlbError("too_large");
  }
  if (view.getUint32(4, true) !== 2 || total !== bytes.byteLength || total % 4 !== 0) {
    throw new GlbError("bad_glb");
  }
  let offset = 12;
  let json = null;
  let bin = null;
  while (offset < total) {
    if (offset + 8 > total) {
      throw new GlbError("bad_chunk");
    }
    const length = view.getUint32(offset, true);
    const type = view.getUint32(offset + 4, true);
    if (length % 4 !== 0 || offset + 8 + length > total || offset === 12 && type !== CHUNK_JSON) {
      throw new GlbError("bad_chunk");
    }
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === CHUNK_JSON) {
      if (json || length > GLB_JSON_MAX_BYTES) {
        throw new GlbError(length > GLB_JSON_MAX_BYTES ? "json_too_large" : "bad_chunk");
      }
      json = readJson(data);
    } else if (type === CHUNK_BIN) {
      if (bin) {
        throw new GlbError("bad_chunk");
      }
      bin = data;
    }
    offset += 8 + length;
  }
  if (!json) {
    throw new GlbError("bad_glb");
  }
  validateJson(json, bin?.byteLength ?? 0);
  return {
    json,
    bin
  };
}
function requireObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new GlbError("bad_schema");
  }
}
function requireIndex(value, length) {
  if (!Number.isSafeInteger(value) || value < 0 || value >= length) {
    throw new GlbError("bad_index");
  }
}
function requireVector(value, length) {
  if (!Array.isArray(value) || value.length !== length || !value.every(Number.isFinite)) {
    throw new GlbError("bad_vector");
  }
}
function validateJson(json, binarySize) {
  const arrays = [
    "nodes",
    "scenes",
    "meshes",
    "accessors",
    "materials",
    "skins",
    "animations",
    "images",
    "bufferViews",
    "buffers",
    "extensionsUsed"
  ];
  for (const key of arrays) {
    if (json[key] !== void 0 && !Array.isArray(json[key])) {
      throw new GlbError("bad_schema");
    }
  }
  const nodes = json.nodes ?? [];
  const meshes = json.meshes ?? [];
  const accessors = json.accessors ?? [];
  const views = json.bufferViews ?? [];
  if (nodes.length > GLB_MAX_NODES) {
    throw new GlbError("nodes_limit");
  }
  for (const accessor of accessors) {
    requireObject(accessor);
    if (!Number.isSafeInteger(accessor.count) || accessor.count < 0) {
      throw new GlbError("bad_accessor");
    }
    for (const key of ["min", "max"]) {
      if (accessor[key] !== void 0) {
        const vector = accessor[key];
        if (!Array.isArray(vector) || !vector.length || !vector.every(Number.isFinite)) {
          throw new GlbError("bad_accessor");
        }
      }
    }
  }
  for (const mesh of meshes) {
    requireObject(mesh);
    if (!Array.isArray(mesh.primitives)) {
      throw new GlbError("bad_mesh");
    }
    for (const primitive of mesh.primitives) {
      requireObject(primitive);
      requireObject(primitive.attributes);
      for (const index of Object.values(primitive.attributes)) {
        requireIndex(index, accessors.length);
      }
      if (primitive.indices !== void 0) {
        requireIndex(primitive.indices, accessors.length);
      }
      if (primitive.mode !== void 0 && (!Number.isInteger(primitive.mode) || primitive.mode < 0 || primitive.mode > 6)) {
        throw new GlbError("bad_primitive");
      }
      const position = accessors[primitive.attributes.POSITION ?? -1];
      if (position?.min !== void 0) {
        requireVector(position.min, 3);
      }
      if (position?.max !== void 0) {
        requireVector(position.max, 3);
      }
    }
  }
  for (const node of nodes) {
    requireObject(node);
    if (node.mesh !== void 0) {
      requireIndex(node.mesh, meshes.length);
    }
    if (node.skin !== void 0) {
      requireIndex(node.skin, (json.skins ?? []).length);
    }
    const vectors = [["matrix", 16], ["translation", 3], ["rotation", 4], ["scale", 3]];
    for (const [key, length] of vectors) {
      if (node[key] !== void 0) {
        requireVector(node[key], length);
      }
    }
  }
  validateGraph(json);
  for (const skin of json.skins ?? []) {
    requireObject(skin);
    if (!Array.isArray(skin.joints)) {
      throw new GlbError("bad_skin");
    }
    for (const index of skin.joints) {
      requireIndex(index, nodes.length);
    }
  }
  for (const animation of json.animations ?? []) {
    requireObject(animation);
    if (!Array.isArray(animation.samplers)) {
      throw new GlbError("bad_animation");
    }
    for (const sampler of animation.samplers) {
      requireObject(sampler);
      requireIndex(sampler.input, accessors.length);
    }
  }
  for (const view of views) {
    requireObject(view);
    const offset = view.byteOffset ?? 0;
    if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(view.byteLength) || view.byteLength < 0) {
      throw new GlbError("bad_buffer_view");
    }
  }
  for (const image of json.images ?? []) {
    requireObject(image);
    if (image.bufferView !== void 0) {
      requireIndex(image.bufferView, views.length);
      const view = views[image.bufferView];
      if ((view.byteOffset ?? 0) + view.byteLength > binarySize) {
        throw new GlbError("bad_image");
      }
    }
  }
  validateLinks(json);
}
function validateLinks(json) {
  const arrays = {
    bufferView: json.bufferViews ?? [],
    buffer: json.buffers ?? [],
    material: json.materials ?? [],
    inverseBindMatrices: json.accessors ?? [],
    skeleton: json.nodes ?? [],
    output: json.accessors ?? []
  };
  const groups = [
    [json.accessors ?? [], ["bufferView"]],
    [json.bufferViews ?? [], ["buffer"]],
    [json.skins ?? [], ["inverseBindMatrices", "skeleton"]],
    [(json.meshes ?? []).flatMap((mesh) => mesh.primitives), ["material"]],
    [(json.animations ?? []).flatMap((animation) => animation.samplers), ["output"]]
  ];
  for (const [entries, fields] of groups) {
    for (const raw of entries) {
      requireObject(raw);
      for (const field of fields) {
        if (raw[field] !== void 0) {
          requireIndex(raw[field], arrays[field].length);
        }
      }
    }
  }
  for (const animation of json.animations ?? []) {
    const channels = animation.channels;
    if (channels === void 0) {
      continue;
    }
    if (!Array.isArray(channels)) {
      throw new GlbError("bad_animation");
    }
    for (const channel of channels) {
      requireObject(channel);
      requireIndex(channel.sampler, animation.samplers.length);
      requireObject(channel.target);
      if (channel.target.node !== void 0) {
        requireIndex(channel.target.node, (json.nodes ?? []).length);
      }
    }
  }
}
function validateGraph(json) {
  const nodes = json.nodes ?? [];
  const parents = new Int32Array(nodes.length).fill(-1);
  for (let index = 0; index < nodes.length; index += 1) {
    const children = nodes[index]?.children ?? [];
    if (!Array.isArray(children)) {
      throw new GlbError("bad_children");
    }
    for (const child of children) {
      requireIndex(child, nodes.length);
      if (parents[child] !== -1) {
        throw new GlbError("multiple_parents");
      }
      parents[child] = index;
    }
  }
  const stack = nodes.flatMap((_, index) => parents[index] === -1 ? [{ index, depth: 1 }] : []);
  let visited = 0;
  while (stack.length) {
    const current = stack.pop();
    if (current.depth > GLB_MAX_DEPTH) {
      throw new GlbError("depth_limit");
    }
    visited += 1;
    for (const child of nodes[current.index]?.children ?? []) {
      stack.push({ index: child, depth: current.depth + 1 });
    }
  }
  if (visited !== nodes.length) {
    throw new GlbError("cycle");
  }
  if (json.scene !== void 0) {
    requireIndex(json.scene, (json.scenes ?? []).length);
  }
  for (const scene of json.scenes ?? []) {
    requireObject(scene);
    const roots = scene.nodes ?? [];
    const unique = /* @__PURE__ */ new Set();
    if (!Array.isArray(roots)) {
      throw new GlbError("bad_scene");
    }
    for (const root of roots) {
      requireIndex(root, nodes.length);
      if (parents[root] !== -1 || unique.has(root)) {
        throw new GlbError("bad_scene");
      }
      unique.add(root);
    }
  }
}
function readJson(data) {
  let parsed;
  try {
    parsed = JSON.parse(new TextDecoder().decode(data));
  } catch {
    throw new GlbError("bad_glb");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new GlbError("bad_glb");
  }
  return parsed;
}
function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) {
        sum += (a[k * 4 + row] ?? 0) * (b[column * 4 + k] ?? 0);
      }
      out[column * 4 + row] = sum;
    }
  }
  return out;
}
function nodeMatrix(node) {
  if (Array.isArray(node.matrix) && node.matrix.length === 16) {
    return node.matrix;
  }
  const [tx = 0, ty = 0, tz = 0] = node.translation ?? [];
  const [x = 0, y = 0, z = 0, w = 1] = node.rotation ?? [];
  const [sx = 1, sy = 1, sz = 1] = node.scale ?? [];
  return [
    (1 - 2 * (y * y + z * z)) * sx,
    2 * (x * y + z * w) * sx,
    2 * (x * z - y * w) * sx,
    0,
    2 * (x * y - z * w) * sy,
    (1 - 2 * (x * x + z * z)) * sy,
    2 * (y * z + x * w) * sy,
    0,
    2 * (x * z + y * w) * sz,
    2 * (y * z - x * w) * sz,
    (1 - 2 * (x * x + y * y)) * sz,
    0,
    tx,
    ty,
    tz,
    1
  ];
}
function transform(m, x, y, z) {
  return [
    (m[0] ?? 0) * x + (m[4] ?? 0) * y + (m[8] ?? 0) * z + (m[12] ?? 0),
    (m[1] ?? 0) * x + (m[5] ?? 0) * y + (m[9] ?? 0) * z + (m[13] ?? 0),
    (m[2] ?? 0) * x + (m[6] ?? 0) * y + (m[10] ?? 0) * z + (m[14] ?? 0)
  ];
}
function imageSize(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const ascii = (start, end) => String.fromCharCode(...bytes.subarray(start, end));
  if (bytes.byteLength > 24 && view.getUint32(0) === 2303741511) {
    return {
      format: "png",
      width: view.getUint32(16),
      height: view.getUint32(20)
    };
  }
  if (bytes.byteLength > 4 && bytes[0] === 255 && bytes[1] === 216) {
    return jpegSize(bytes, view);
  }
  if (bytes.byteLength > 30 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") {
    return webpSize(bytes, view, ascii(12, 16));
  }
  return null;
}
function jpegSize(bytes, view) {
  let index = 2;
  while (index + 9 < bytes.byteLength) {
    if (bytes[index] !== 255) {
      index += 1;
      continue;
    }
    const marker = bytes[index + 1] ?? 0;
    const length = view.getUint16(index + 2);
    if (marker >= 192 && marker <= 207 && ![196, 200, 204].includes(marker)) {
      return {
        format: "jpeg",
        width: view.getUint16(index + 7),
        height: view.getUint16(index + 5)
      };
    }
    index += 2 + length;
  }
  return null;
}
function webpSize(bytes, view, kind) {
  const uint24 = (at) => {
    return (bytes[at] ?? 0) | (bytes[at + 1] ?? 0) << 8 | (bytes[at + 2] ?? 0) << 16;
  };
  if (kind === "VP8X") {
    return {
      format: "webp",
      width: 1 + uint24(24),
      height: 1 + uint24(27)
    };
  }
  if (kind === "VP8L") {
    const bits = view.getUint32(21, true);
    return {
      format: "webp",
      width: (bits & 16383) + 1,
      height: (bits >> 14 & 16383) + 1
    };
  }
  if (kind === "VP8 ") {
    return {
      format: "webp",
      width: view.getUint16(26, true) & 16383,
      height: view.getUint16(28, true) & 16383
    };
  }
  return null;
}
function inspectGlb(bytes) {
  const { json, bin } = parseGlb(bytes);
  const accessors = json.accessors ?? [];
  const nodes = json.nodes ?? [];
  const meshes = json.meshes ?? [];
  const scene = json.scenes?.[json.scene ?? 0];
  const childNodes = new Set(nodes.flatMap((node) => node.children ?? []));
  const roots = scene?.nodes ?? nodes.flatMap((_, index) => childNodes.has(index) ? [] : [index]);
  const totals = {
    triangles: 0,
    vertices: 0
  };
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  const parts = [];
  const stack = roots.map((index) => ({ index, parent: IDENTITY }));
  let reliableBounds = (json.animations ?? []).length === 0;
  while (stack.length) {
    const { index, parent } = stack.pop();
    const node = nodes[index];
    if (!node) {
      throw new GlbError("bad_index");
    }
    const world = multiply(parent, nodeMatrix(node));
    const mesh = node.mesh === void 0 ? void 0 : meshes[node.mesh];
    if (node.skin !== void 0) {
      reliableBounds = false;
    }
    if (mesh) {
      parts.push(node.name || mesh.name || `\u0427\u0430\u0441\u0442\u044C ${parts.length + 1}`);
      for (const primitive of mesh.primitives ?? []) {
        countPrimitive(primitive, accessors, world, totals, min, max);
        const position = accessors[primitive.attributes.POSITION ?? -1];
        if (!position?.min || !position.max || position.min.some((value, axis) => value > position.max[axis])) {
          reliableBounds = false;
        }
      }
    }
    for (const child of node.children ?? []) {
      stack.push({ index: child, parent: world });
    }
  }
  const size = reliableBounds && min.every(Number.isFinite) && max.every(Number.isFinite) ? max.map((value, axis) => round(value - (min[axis] ?? 0))) : null;
  return {
    triangles: Math.round(totals.triangles),
    vertices: totals.vertices,
    meshes: meshes.length,
    materials: (json.materials ?? []).length,
    bones: countBones(json),
    animations: readAnimations(json, accessors),
    textures: readTextures(json, bin),
    size,
    facing: facingOf(size),
    parts,
    extensions: Array.isArray(json.extensionsUsed) ? json.extensionsUsed.map(String) : []
  };
}
function countPrimitive(primitive, accessors, world, totals, min, max) {
  const position = accessors[primitive.attributes?.POSITION ?? -1];
  if (!position) {
    return;
  }
  const mode = primitive.mode ?? 4;
  const indexed = primitive.indices === void 0 ? void 0 : accessors[primitive.indices];
  const count = indexed ? indexed.count : position.count;
  if (mode === 4) {
    totals.triangles += count / 3;
  } else if (mode === 5 || mode === 6) {
    totals.triangles += Math.max(0, count - 2);
  }
  totals.vertices += position.count;
  if (!position.min || !position.max) {
    return;
  }
  for (const x of [position.min[0] ?? 0, position.max[0] ?? 0]) {
    for (const y of [position.min[1] ?? 0, position.max[1] ?? 0]) {
      for (const z of [position.min[2] ?? 0, position.max[2] ?? 0]) {
        const point = transform(world, x, y, z);
        for (let axis = 0; axis < 3; axis += 1) {
          min[axis] = Math.min(min[axis] ?? Infinity, point[axis] ?? 0);
          max[axis] = Math.max(max[axis] ?? -Infinity, point[axis] ?? 0);
        }
      }
    }
  }
}
function countBones(json) {
  const joints = /* @__PURE__ */ new Set();
  for (const skin of json.skins ?? []) {
    for (const joint of skin.joints ?? []) {
      joints.add(joint);
    }
  }
  return joints.size;
}
function readAnimations(json, accessors) {
  return (json.animations ?? []).map((animation) => {
    let duration = 0;
    for (const sampler of animation.samplers ?? []) {
      duration = Math.max(duration, accessors[sampler.input]?.max?.[0] ?? 0);
    }
    return {
      name: animation.name || "",
      duration: round(duration)
    };
  });
}
function readTextures(json, bin) {
  return (json.images ?? []).map((image) => {
    const view = image.bufferView === void 0 ? void 0 : json.bufferViews?.[image.bufferView];
    if (!view || !bin) {
      return null;
    }
    const start = view.byteOffset ?? 0;
    return imageSize(bin.subarray(start, start + view.byteLength));
  });
}
function facingOf(size) {
  if (!size) {
    return null;
  }
  const [x, , z] = size;
  const wider = Math.max(x, z);
  if (wider <= 0 || Math.abs(x - z) / wider < 0.15) {
    return null;
  }
  return x > z ? "z" : "x";
}
function round(value) {
  return Math.round(value * 1e3) / 1e3;
}
function chunk(type, payload, pad) {
  const length = Math.ceil(payload.byteLength / 4) * 4;
  const out = new Uint8Array(8 + length).fill(pad, 8);
  const view = new DataView(out.buffer);
  view.setUint32(0, length, true);
  view.setUint32(4, type, true);
  out.set(payload, 8);
  return out;
}
function wrapGlb(bytes, options) {
  const { json, bin } = parseGlb(bytes);
  if (options.rotation !== void 0) {
    requireVector(options.rotation, 4);
  }
  if (options.scale !== void 0 && (!Number.isFinite(options.scale) || options.scale <= 0)) {
    throw new GlbError("bad_scale");
  }
  const sceneIndex = json.scene ?? 0;
  const children = new Set((json.nodes ?? []).flatMap((node) => node.children ?? []));
  const roots = (json.nodes ?? []).flatMap((_, index) => children.has(index) ? [] : [index]);
  const scenes = json.scenes ?? [{ nodes: roots }];
  const scene = scenes[sceneIndex];
  if (!scene) {
    throw new GlbError("bad_glb");
  }
  const root = {
    name: options.name ?? "grigdesk-transform",
    children: [...scene.nodes ?? []]
  };
  if (options.rotation) {
    root.rotation = [...options.rotation];
  }
  if (options.scale !== void 0) {
    root.scale = [options.scale, options.scale, options.scale];
  }
  json.nodes = [...json.nodes ?? [], root];
  scene.nodes = [json.nodes.length - 1];
  json.scenes = scenes;
  validateJson(json, bin?.byteLength ?? 0);
  const jsonChunk = chunk(CHUNK_JSON, new TextEncoder().encode(JSON.stringify(json)), 32);
  const binChunk = bin ? chunk(CHUNK_BIN, bin, 0) : new Uint8Array(0);
  const out = new Uint8Array(12 + jsonChunk.byteLength + binChunk.byteLength);
  const view = new DataView(out.buffer);
  view.setUint32(0, GLB_MAGIC, true);
  view.setUint32(4, 2, true);
  view.setUint32(8, out.byteLength, true);
  out.set(jsonChunk, 12);
  out.set(binChunk, 12 + jsonChunk.byteLength);
  return out;
}

// src/lib/studio3d/analysisWorker.ts
function sourceRevision() {
  const stat = fstatSync(3, { bigint: true });
  if (!stat.isFile() || stat.nlink !== 1n || stat.size > BigInt(GLB_MAX_BYTES)) {
    throw new GlbError("unsafe-file");
  }
  return [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":");
}
function sourceBytes() {
  const size = Number(fstatSync(3).size);
  const header = Buffer.alloc(20);
  if (size < 20 || size > GLB_MAX_BYTES || readSync(3, header, 0, 20, 0) !== 20 || header.readUInt32LE(0) !== 1179937895 || header.readUInt32LE(4) !== 2 || header.readUInt32LE(8) !== size || header.readUInt32LE(16) !== 1313821514 || header.readUInt32LE(12) > GLB_JSON_MAX_BYTES) {
    throw new GlbError("bad_glb");
  }
  const bytes = Buffer.allocUnsafe(size);
  let offset = 0;
  while (offset < size) {
    const received = readSync(3, bytes, offset, size - offset, offset);
    if (!received) {
      throw new GlbError("changed");
    }
    offset += received;
  }
  return bytes;
}
function verifyPaths(sourcePath, directory, before) {
  if (sourceRevision() !== before || realpathSync("/proc/self/fd/3") !== sourcePath || realpathSync(sourcePath) !== sourcePath) {
    throw new GlbError("changed");
  }
  const source = fstatSync(3, { bigint: true });
  const reopened = openSync(sourcePath, FS.O_RDONLY | FS.O_NOFOLLOW | FS.O_NONBLOCK);
  try {
    const current = fstatSync(reopened, { bigint: true });
    if (current.dev !== source.dev || current.ino !== source.ino) {
      throw new GlbError("changed");
    }
  } finally {
    closeSync(reopened);
  }
  if (directory && (realpathSync("/proc/self/fd/4") !== directory || realpathSync(directory) !== directory)) {
    throw new GlbError("changed-directory");
  }
}
function publish(bytes, name, directory, source, before) {
  const temporary = `/proc/self/fd/4/.analysis-${randomUUID()}.tmp`;
  const destination = `/proc/self/fd/4/${name}`;
  const descriptor = openSync(temporary, FS.O_WRONLY | FS.O_CREAT | FS.O_EXCL | FS.O_NOFOLLOW, 384);
  let published = false;
  try {
    let offset = 0;
    while (offset < bytes.byteLength) {
      offset += writeSync(descriptor, bytes, offset, bytes.byteLength - offset);
    }
    fsyncSync(descriptor);
    verifyPaths(source, directory, before);
    linkSync(temporary, destination);
    published = true;
    verifyPaths(source, directory, before);
    unlinkSync(temporary);
    fsyncSync(4);
  } catch (error) {
    if (published) {
      unlinkSync(destination);
    }
    try {
      unlinkSync(temporary);
    } catch {
    }
    throw error;
  } finally {
    closeSync(descriptor);
  }
}
function main() {
  const raw = process.argv[2] ?? "";
  if (raw.length > 8192) {
    throw new GlbError("request-limit");
  }
  const request = JSON.parse(raw);
  if (!["inspect", "rewrite"].includes(request.operation) || typeof request.sourcePath !== "string") {
    throw new GlbError("bad-request");
  }
  const before = sourceRevision();
  const bytes = sourceBytes();
  const result = request.operation === "rewrite" ? wrapGlb(bytes, request.wrap ?? {}) : bytes;
  const stats = inspectGlb(result);
  verifyPaths(request.sourcePath, request.outputDirectory, before);
  if (request.operation === "rewrite") {
    if (!request.outputDirectory || !request.outputName || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/.test(request.outputName) || request.outputName.includes("..") || path.basename(request.outputName) !== request.outputName) {
      throw new GlbError("unsafe-output");
    }
    publish(result, request.outputName, request.outputDirectory, request.sourcePath, before);
  }
  process.stdout.write(JSON.stringify({ ok: true, stats }));
}
try {
  main();
} catch (error) {
  process.stdout.write(JSON.stringify({
    ok: false,
    code: error instanceof GlbError ? error.code : "invalid-file"
  }));
}
