function _e(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = e;
  return t.name === "ApiError" && typeof t.status == "number" && Number.isInteger(t.status) && t.status >= 100 && t.status <= 599 && Object.hasOwn(t, "data");
}
function nt(e) {
  if (typeof e != "string" || !e)
    throw new Error("invalid_studio_plugin_id");
  return `/api/ext/${encodeURIComponent(e)}`;
}
function Ae(e) {
  function t(f, y) {
    return (f === null || typeof f != "object" || Array.isArray(f)) && e(y), f;
  }
  function r(f) {
    return (y, O) => {
      const R = t(y, O), s = Object.entries(f).map(([g, u]) => [
        g,
        u(R[g], `${O}.${g}`)
      ]);
      return Object.fromEntries(s);
    };
  }
  function a(f, y) {
    return typeof f != "string" && e(y), f;
  }
  function d(f, y) {
    return (typeof f != "number" || !Number.isFinite(f)) && e(y), f;
  }
  function m(f, y) {
    return (typeof f != "number" || !Number.isSafeInteger(f) || f < 0) && e(y), f;
  }
  function o(f, y) {
    return typeof f != "boolean" && e(y), f;
  }
  function l(...f) {
    return (y, O) => {
      for (const R of f)
        if (y === R)
          return R;
      return e(O);
    };
  }
  function h(f) {
    return (y, O) => y === null ? null : f(y, O);
  }
  function p(f) {
    return (y, O) => y == null ? null : f(y, O);
  }
  function A(f) {
    return (y, O) => (Array.isArray(y) || e(O), y.map((R, s) => f(R, `${O}[${s}]`)));
  }
  function x(f) {
    return (y, O) => Object.fromEntries(Object.entries(t(y, O)).map(([R, s]) => [R, f(s, `${O}.${R}`)]));
  }
  return {
    boolean: o,
    listOf: A,
    mapOf: x,
    nullable: h,
    numeric: d,
    objectOf: r,
    optional: p,
    oneOf: l,
    record: t,
    text: a,
    wholeNumber: m
  };
}
const st = "Заказ не найден после трёх проверок. Можно прекратить ожидание; оплата неизвестна.", xe = [
  "image",
  "views",
  "model",
  "rigged",
  "animated",
  "parts",
  "splat",
  "export"
], ot = [
  {
    id: "create",
    label: "Создание"
  },
  {
    id: "images",
    label: "Картинки"
  },
  {
    id: "geometry",
    label: "Геометрия"
  },
  {
    id: "texture",
    label: "Текстура"
  },
  {
    id: "animation",
    label: "Анимация"
  },
  {
    id: "export",
    label: "Экспорт"
  },
  {
    id: "helpers",
    label: "Помощники"
  }
], Oe = [
  {
    id: "text-to-model",
    label: "Модель из текста",
    group: "create",
    inputs: ["text"],
    output: "model",
    hint: "Описание словами превращается в трёхмерную модель."
  },
  {
    id: "image-to-model",
    label: "Модель из картинки",
    group: "create",
    inputs: ["image"],
    output: "model",
    hint: "Одна картинка предмета или персонажа превращается в модель."
  },
  {
    id: "views-to-model",
    label: "Модель по видам",
    group: "create",
    inputs: ["views"],
    output: "model",
    hint: "От двух до четырёх видов одного объекта; вид спереди обязателен."
  },
  {
    id: "image-to-splat",
    label: "Сплат из фото",
    group: "create",
    inputs: ["image"],
    output: "splat",
    hint: "Облако гауссовых точек для фона и сцен; это не сетка, дальше его не обработать."
  },
  {
    id: "text-to-image",
    label: "Картинка из текста",
    group: "images",
    inputs: ["text"],
    output: "image",
    hint: "Дешёвая проверка облика до заказа модели."
  },
  {
    id: "image-edit",
    label: "Правка картинки",
    group: "images",
    inputs: ["image"],
    output: "image",
    hint: "Правка словами или шаблоном: T-поза, достроить персонажа, выделить предмет."
  },
  {
    id: "image-to-views",
    label: "Четыре вида",
    group: "images",
    inputs: ["image"],
    output: "views",
    hint: "Из одной картинки получаются виды спереди, слева, сзади и справа."
  },
  {
    id: "views-edit",
    label: "Правка видов",
    group: "images",
    inputs: ["views"],
    output: "views",
    hint: "Правка отдельных видов словами, например «убери фонарь из руки»."
  },
  {
    id: "retopology",
    label: "Меньше полигонов",
    group: "geometry",
    inputs: ["model", "parts"],
    output: "model",
    hint: "Новая сетка с нужным числом граней; текстура переносится на неё."
  },
  {
    id: "segment",
    label: "Разрезать на части",
    group: "geometry",
    inputs: ["model"],
    output: "parts",
    hint: "Модель делится на части, которые можно достроить и выгрузить по отдельности."
  },
  {
    id: "complete-parts",
    label: "Достроить части",
    group: "geometry",
    inputs: ["parts"],
    output: "parts",
    hint: "Закрывает скрытые поверхности у выбранных частей."
  },
  {
    id: "smart-segment",
    label: "Умная сегментация",
    group: "geometry",
    inputs: ["image", "model"],
    output: "parts",
    hint: "Части с подписями по картинке или готовой модели GLB."
  },
  {
    id: "stylize",
    label: "Стилизация",
    group: "geometry",
    inputs: ["model"],
    output: "model",
    hint: "Лего, воксели, мозаика Вороного или Minecraft."
  },
  {
    id: "retexture",
    label: "Новая текстура",
    group: "texture",
    inputs: ["model"],
    output: "model",
    hint: "Перерисовывает текстуру готовой модели."
  },
  {
    id: "uv-unwrap",
    label: "UV-развёртка",
    group: "texture",
    inputs: ["model", "rigged", "animated"],
    output: "same",
    hint: "Новая развёртка; текстура, скелет и движения переносятся на неё."
  },
  {
    id: "rig-check",
    label: "Проверка скелета",
    group: "animation",
    inputs: ["model"],
    output: "check",
    hint: "Можно ли поставить скелет и какой тип тела у модели."
  },
  {
    id: "rig",
    label: "Скелет",
    group: "animation",
    inputs: ["model"],
    output: "rigged",
    hint: "Кости и веса для анимации."
  },
  {
    id: "animate",
    label: "Движения",
    group: "animation",
    inputs: ["rigged"],
    output: "animated",
    hint: "Готовые движения на скелет: каждое — отдельная версия."
  },
  {
    id: "export",
    label: "Экспорт",
    group: "export",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "export",
    hint: "Другой формат, размер текстур, ориентация или пресет FBX."
  },
  {
    id: "rotate",
    label: "Развернуть",
    group: "helpers",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "same",
    hint: "Поворот модели целиком; скелет и движения поворачиваются вместе с ней."
  },
  {
    id: "scale",
    label: "Задать рост",
    group: "helpers",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "same",
    hint: "Масштаб по высоте в метрах."
  }
];
new Map(
  Oe.map((e) => [e.id, e])
);
function se(e, t) {
  const r = Math.abs(e);
  if (!Number.isInteger(r))
    return t.few;
  const a = r % 10, d = r % 100;
  return d >= 11 && d <= 14 ? t.many : a === 1 ? t.one : a >= 2 && a <= 4 ? t.few : t.many;
}
function ie(e, t) {
  if (e === null || !Number.isFinite(e) || e < 0)
    return "цена неизвестна";
  if (e === 0)
    return "бесплатно";
  if (t === null)
    return "цена неизвестна";
  const r = Math.round(e * 100) / 100;
  return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(r)} ${se(r, t)}`;
}
class q extends Error {
  constructor(t) {
    super(`Некорректный ответ раздела «3D»: поле ${t}`), this.name = "Studio3dContractError";
  }
}
const K = [
  "submitting",
  "waiting",
  "queued",
  "running",
  "downloading",
  "ready",
  "failed",
  "unknown",
  "unresolved",
  "remote",
  "lightened"
], at = [
  "submitting",
  "waiting",
  "queued",
  "running",
  "downloading",
  "unknown"
], ke = ["section", "agent", "file", "import"], lt = [
  {
    id: "character",
    label: "Персонаж"
  },
  {
    id: "prop",
    label: "Предмет"
  },
  {
    id: "part",
    label: "Деталь"
  },
  {
    id: "scene",
    label: "Сцена"
  }
], {
  boolean: E,
  listOf: b,
  mapOf: oe,
  numeric: z,
  objectOf: Re,
  oneOf: I,
  optional: n,
  text: i,
  wholeNumber: w
} = Ae((e) => {
  throw new q(e);
});
function c(e) {
  const t = Re(e);
  return (r, a) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      for (const d of Object.keys(r))
        if (!Object.hasOwn(e, d))
          throw new q(`${a}.${d}`);
    }
    return t(r, a);
  };
}
const v = (e, t) => {
  const r = z(e, t);
  if (r < 0)
    throw new q(t);
  return r;
}, $e = (e, t) => {
  const r = w(e, t);
  if (r > 100)
    throw new q(t);
  return r;
}, $ = (e, t) => {
  const r = i(e, t);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(r))
    throw new q(t);
  return r;
}, de = ["unpaid", "reserved", "charged", "refunded", "unknown", "free"], Ie = (e, t) => {
  if (e === null || ["string", "boolean"].includes(typeof e) || typeof e == "number" && Number.isFinite(e) || Array.isArray(e) && e.every((r) => typeof r == "string"))
    return e;
  if (Array.isArray(e))
    return b(c({
      view: I("front", "left", "back", "right"),
      prompt: i
    }))(e, t);
  throw new q(t);
}, W = oe(Ie), fe = (e, t) => {
  if (e === null || ["string", "boolean"].includes(typeof e) || typeof e == "number" && Number.isFinite(e))
    return e;
  throw new q(t);
}, P = c({
  one: i,
  few: i,
  many: i
}), je = (e, t) => {
  const r = b(v)(e, t);
  if (r.length !== 3)
    throw new q(t);
  return r;
}, ue = c({
  triangles: w,
  vertices: w,
  meshes: w,
  materials: w,
  bones: w,
  animations: b(c({
    name: i,
    duration: v
  })),
  textures: b(n(c({
    format: I("png", "jpeg", "webp"),
    width: w,
    height: w
  }))),
  size: n(je),
  facing: n(I("x", "z")),
  parts: b(i),
  extensions: b(i)
}), qe = c({
  id: i,
  role: i,
  name: i,
  size: w,
  url: i,
  sha256: i
}), L = c({
  kind: i,
  message: i,
  detail: n(i)
}), B = {
  jobId: $,
  childId: i,
  at: i
}, me = {
  pending: c({ ...B, status: I("pending") }),
  ready: c({
    ...B,
    status: I("ready"),
    riggable: E,
    rigType: n(i)
  }),
  failed: c({
    ...B,
    status: I("failed"),
    error: L
  }),
  unknown: c({
    ...B,
    status: I("unknown"),
    error: n(L)
  }),
  unresolved: c({
    ...B,
    status: I("unresolved"),
    error: n(L)
  })
}, Pe = (e, t) => {
  const r = e && typeof e == "object" ? e.status : null;
  if (typeof r != "string" || !Object.hasOwn(me, r))
    throw new q(`${t}.status`);
  return me[r](e, t);
}, Ee = {
  provider: i,
  unit: n(P),
  actual: v,
  estimated: v,
  refunded: v,
  unknownCount: w,
  unknownEstimated: v
}, Ce = c(Ee), Ne = c({
  ...Ee,
  sectionActual: v,
  externalActual: v,
  reserved: v
}), ee = c({
  libraryId: $,
  id: i,
  seq: w,
  parent: n(i),
  kind: I(...xe),
  operation: n(i),
  provider: n(i),
  label: i,
  status: I(...K),
  progress: $e,
  etaSeconds: n(z),
  params: W,
  files: b(qe),
  preview: n(i),
  stats: n(ue),
  task: n(c({
    provider: i,
    id: i,
    type: i
  })),
  cost: c({
    estimated: n(v),
    actual: n(v),
    free: E,
    unit: n(P),
    state: I(...de)
  }),
  error: n(L),
  origin: I(...ke),
  createdAt: i,
  updatedAt: i,
  savedTo: b(c({
    path: i,
    at: i,
    sha256: i
  })),
  rigCheck: n(Pe),
  intentId: n($),
  childId: n(i),
  waitReason: n(i),
  retryAvailable: E,
  retryReason: n(i),
  views: b(I("front", "left", "back", "right")),
  mainFileId: n(i)
}), te = c({
  id: i,
  name: i,
  project: n(i),
  category: n(I("character", "prop", "part", "scene")),
  tags: b(i),
  origin: I(...ke),
  createdAt: i,
  updatedAt: i,
  mainVersion: n(i),
  preview: n(i),
  versions: w,
  active: w,
  spent: n(v),
  spending: b(Ce),
  sizeBytes: w,
  has: c({
    rig: E,
    animation: E,
    parts: E,
    images: E
  })
}), De = c({
  libraryId: $,
  models: b(te),
  total: w,
  broken: b(i)
}), Me = c({
  libraryId: $,
  model: te,
  notes: i,
  versions: b(ee),
  incoming: b(i),
  modelDirectory: i,
  saveFolders: n(oe(oe(i)))
}), Te = c({
  id: i,
  name: i,
  local: E,
  available: E,
  unit: n(P),
  balance: n(c({
    available: v,
    reserved: v
  })),
  billingUrl: n(i)
}), Fe = c({
  libraryId: $,
  library: c({
    dir: i,
    ok: E,
    error: n(i),
    bytes: w,
    freeBytes: n(w),
    lowDisk: E,
    modelBytes: w,
    inputBytes: w,
    temporaryBytes: w
  }),
  providers: b(Te),
  active: w,
  autoImport: E
}), ae = c({
  total: n(v),
  lines: b(c({
    label: i,
    amount: v
  })),
  unit: n(P),
  usd: n(v),
  note: n(i)
}), be = c({
  field: n(i),
  message: i
}), ye = c({
  values: W,
  errors: b(be),
  warnings: b(be)
}), ze = c({
  value: i,
  label: i,
  hint: n(i),
  group: n(i)
}), Le = c({
  id: i,
  kind: I("text", "textarea", "number", "select", "toggle", "multiselect", "view-prompts"),
  label: i,
  hint: n(i),
  required: n(E),
  default: n(Ie),
  min: n(z),
  max: n(z),
  step: n(z),
  maxLength: n(w),
  maxItems: n(w),
  unit: n(i),
  options: n(b(ze)),
  advanced: n(E),
  visibleWhen: n(b(c({
    field: i,
    is: n(b(fe)),
    not: n(b(fe))
  })))
}), Ue = c({
  provider: i,
  providerName: i,
  local: E,
  operation: i,
  label: i,
  group: i,
  fields: b(Le),
  presets: b(c({
    id: i,
    label: i,
    hint: n(i),
    values: W
  })),
  note: n(i),
  priceKnown: E,
  available: E,
  reason: n(i),
  quote: ae
}), we = c({
  intentId: i,
  childId: i,
  modelId: n(i),
  modelName: n(i),
  versionId: n(i),
  label: i,
  provider: n(i),
  status: I(...K),
  progress: $e,
  etaSeconds: n(z),
  estimated: n(v),
  actual: n(v),
  paymentState: I(...de),
  unit: n(P),
  waitReason: n(i),
  retryAvailable: E,
  retryReason: n(i),
  error: n(L),
  updatedAt: i
}), Be = c({
  provider: i,
  taskId: i,
  type: i,
  label: i,
  credits: n(v),
  createdAt: n(i),
  modelId: n(i)
}), Ve = c({
  libraryId: $,
  uploadId: i,
  name: i,
  kind: I("image", "model"),
  size: w,
  stats: n(ue),
  width: n(w),
  height: n(w)
}), Ge = c({
  childId: i,
  versionId: n(i),
  operation: i,
  provider: n(i),
  status: I(...K),
  waitReason: n(i),
  estimated: v,
  actual: n(v),
  unit: n(P),
  paymentState: I(...de),
  taskId: n(i),
  candidates: b(c({
    taskId: i,
    type: i,
    createdAt: n(i),
    credits: n(v)
  })),
  retryAvailable: E,
  retryReason: n(i),
  error: n(L)
}), Je = c({
  intentId: $,
  libraryId: $,
  deleted: E,
  modelId: n(i),
  children: b(Ge),
  updatedAt: i
}), Ke = c({
  provider: i,
  operation: i,
  values: W,
  name: i,
  project: n(i),
  category: n(I("character", "prop", "part", "scene")),
  expectedPrice: v
}), Qe = c({
  libraryId: $,
  rows: b(Ke),
  catalogVersion: i,
  totalEstimated: v,
  unit: n(P)
}), We = c({
  libraryId: $,
  snapshot: Qe,
  snapshotHash: i,
  totalEstimated: v,
  unit: n(P)
}), He = c({
  intentId: $,
  libraryId: $,
  children: b(c({
    childId: i,
    intentId: $,
    modelId: n(i),
    status: I(...K),
    estimated: v
  })),
  totalEstimated: v,
  unit: n(P),
  status: I(...K)
});
function Xe(e) {
  const t = c({
    libraryId: $,
    intentId: $,
    deleted: E,
    checkJobId: n($),
    model: n(te),
    versions: b(ee)
  })(e, "run");
  if (t.deleted ? t.model !== null || t.versions.length !== 0 : t.model === null)
    throw new q("run.model");
  return t;
}
const k = {
  ok: (e) => c({ libraryId: $, ok: I(!0) })(e, "ok"),
  values: (e) => W(e, "values"),
  unit: (e) => n(P)(e, "unit"),
  price: (e) => ae(e, "price"),
  validation: (e) => ye(e, "validation"),
  stats: (e) => ue(e, "stats"),
  state: (e) => Fe(e, "state"),
  models: (e) => De(e, "models"),
  model: (e) => Me(e, "model"),
  version: (e) => ee(e, "version"),
  offers: (e) => c({ libraryId: $, offers: b(Ue) })(e, "offers"),
  quote: (e) => c({
    libraryId: $,
    quote: ae,
    validation: ye
  })(e, "quote"),
  run: Xe,
  job: (e) => Je(e, "job"),
  batchQuote: (e) => We(e, "batchQuote"),
  batchRun: (e) => He(e, "batchRun"),
  createdModel: (e) => c({
    libraryId: $,
    model: te,
    version: ee
  })(e, "createdModel"),
  upload: (e) => Ve(e, "upload"),
  tasks: (e) => c({
    libraryId: $,
    active: b(we),
    recent: b(we),
    external: b(Be),
    week: c({
      partial: E,
      groups: b(Ne)
    }),
    historyPartial: E,
    historyError: n(i)
  })(e, "tasks"),
  save: (e) => c({
    libraryId: $,
    path: i,
    overwritten: E
  })(e, "save"),
  scan: (e) => c({
    libraryId: $,
    found: w,
    imported: w,
    skipped: w,
    partial: E,
    reasons: b(i)
  })(e, "scan"),
  lighten: (e) => c({ libraryId: $, freed: w })(e, "lighten"),
  imported: (e) => c({ libraryId: $, modelId: i })(e, "imported"),
  viewer: (e) => c({
    libraryId: $,
    url: i,
    name: i,
    ext: i,
    size: w,
    libraryRef: n(c({
      modelId: i,
      versionId: i
    }))
  })(e, "viewer")
}, dt = {
  submitting: "Отправляется",
  waiting: "Ожидает",
  queued: "В очереди",
  running: "В работе",
  downloading: "Скачивается",
  ready: "Готово",
  failed: "Ошибка",
  unknown: "Исход неизвестен",
  unresolved: "Оставлен неразобранным",
  remote: "В облаке",
  lightened: "Облегчена"
}, Y = {
  front: "спереди",
  left: "слева",
  back: "сзади",
  right: "справа",
  character: "персонаж",
  prop: "предмет",
  part: "часть",
  scene: "сцена",
  image: "картинка",
  mask: "маска",
  preview: "превью",
  biped: "двуногий",
  quadruped: "четвероногий",
  hexapod: "шестиногий",
  octopod: "восьминогий",
  avian: "птица",
  serpentine: "змеевидный",
  walk: "ходьба",
  run: "бег",
  idle: "ожидание",
  jump: "прыжок",
  "v3.1-20260211": "Детальная модель",
  "P1-20260311": "Быстрая модель P1",
  "P2-20260801": "Быстрая модель P2",
  "v3.0-20250812": "Текстуры версии 3.0",
  "v3.5-20260815": "Текстуры версии 3.5",
  "v1.0-20240301": "Скелет для человека",
  "v2.5-20260210": "Скелет для разных типов тела",
  "v1.0-20250506": "Разделение на части версии 1.0",
  "v2.0-20260430": "Разделение на части версии 2.0"
}, Se = {
  prompt: "Описание",
  negative_prompt: "Исключить из описания",
  category: "Категория",
  view: "Вид",
  rig_type: "Тип тела",
  model: "Модель исполнителя",
  animation: "Движение",
  animations: "Движения",
  format: "Формат",
  texture: "Текстуры",
  texture_quality: "Качество текстур",
  texture_resolution: "Размер текстур",
  pbr: "Материалы PBR",
  seed: "Начальное число",
  face_limit: "Предел полигонов",
  target_face_num: "Число полигонов",
  quad: "Четырёхугольная сетка",
  turn: "Поворот",
  height: "Высота",
  orientation: "Ориентация",
  export_orientation: "Ориентация экспорта",
  original_model_id: "Исходная модель",
  input: "Исходная версия"
};
function ut(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.find((a) => a.id === e)) == null ? void 0 : r.name) ?? (e === "tripo" ? "Tripo" : e === "local" || !e ? "Локально" : "Исполнитель");
}
function ct(e) {
  return {
    text_to_model: "Модель по описанию",
    image_to_model: "Модель по картинке",
    multiview_to_model: "Модель по видам",
    text_to_image: "Картинка по описанию",
    generate_image: "Картинка",
    image_to_image: "Изменение картинки",
    image_to_multiview: "Виды",
    edit_multiview: "Изменение видов",
    animate_prerigcheck: "Проверка скелета",
    animate_rig: "Скелет",
    animate_retarget: "Движение",
    convert_model: "Экспорт",
    texture_model: "Текстуры",
    stylize_model: "Стиль",
    decimate_model: "Уменьшение полигонов",
    mesh_segmentation: "Части",
    mesh_completion: "Дополнение частей",
    image_to_splat: "Сплат"
  }[e] ?? "Облачный заказ";
}
function le(e) {
  if (e == null)
    return "—";
  if (typeof e == "boolean")
    return e ? "Да" : "Нет";
  if (Array.isArray(e))
    return e.map(le).join(", ");
  if (typeof e == "object")
    return Object.entries(e).map(([r, a]) => `${Se[r] ?? "Параметр"}: ${le(a)}`).join("; ");
  const t = String(e);
  return Y[t] ? Y[t] : /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(t) ? "Другой облачный заказ" : t.startsWith("preset:") ? Y[t.split(":").at(-1)] ?? "Выбранное движение" : /^v\d+\.\d+-\d+$/.test(t) ? `Версия ${t.split("-")[0].slice(1)}` : Y[t] ?? t;
}
function ht(e) {
  return Object.entries(e).map(([t, r], a) => ({
    name: Se[t] ?? `Дополнительный параметр ${a + 1}`,
    value: ["prompt", "negative_prompt"].includes(t) ? String(r ?? "—") : le(r)
  }));
}
function Ye(e) {
  const t = e instanceof Error ? e.message : typeof e == "string" ? e : "", r = {
    price_changed: "Цена изменилась. Подтвердите новую цену.",
    not_found: "Запись не найдена.",
    unauthorized: "Требуется вход в GrigDesk.",
    plugin_disabled: "Плагин «3D» выключен.",
    unavailable: "Раздел временно недоступен.",
    invalid_request: "Проверьте параметры запроса."
  };
  return /Failed to fetch|fetch failed|signal timed out|aborted due to timeout|NetworkError|Load failed/i.test(t) ? "Нет связи с сервером" : !r[t] && /^[a-z0-9]+(?:_[a-z0-9]+)+$/i.test(t) ? "Не удалось выполнить действие. Обновите раздел и повторите." : r[t] ?? (t || "Не удалось выполнить действие.");
}
function pt(e) {
  var t;
  if (!e)
    return "";
  if (e.status === "pending")
    return "Проверяется…";
  if (e.status === "ready") {
    const r = {
      biped: "двуногий",
      quadruped: "четвероногий",
      hexapod: "шестиногий",
      octopod: "восьминогий",
      avian: "птица",
      serpentine: "змеевидный"
    };
    return e.riggable ? `Можно: ${r[e.rigType ?? ""] ?? "подходящий тип тела"}` : "Нельзя: модель не подходит для построения скелета.";
  }
  return ((t = e.error) == null ? void 0 : t.message) ?? "Результат проверки неизвестен. Разберите заказ во вкладке «Задачи».";
}
function gt(e) {
  return e.state === "free" ? "Бесплатно" : e.state === "refunded" ? "Возврат подтверждён" : e.state === "charged" && e.actual !== null ? `Списано ${ie(e.actual, e.unit)}` : e.state === "unknown" ? "Списание неизвестно" : e.state === "reserved" ? `В резерве ${ie(e.estimated, e.unit)}` : `Оценка ${ie(e.estimated, e.unit)}`;
}
function ft(e) {
  var a;
  if (!e)
    return "Сводка пока недоступна";
  const t = e.textures.filter((d) => d !== null).map((d) => `${d.width}×${d.height}`).join(", "), r = (a = e.size) == null ? void 0 : a.map((d) => d.toFixed(2)).join(" × ");
  return `${new Intl.NumberFormat("ru-RU").format(e.triangles)} треугольников, текстуры ${t || "нет"}, ${e.bones} ${se(e.bones, {
    one: "кость",
    few: "кости",
    many: "костей"
  })}, ${e.animations.length} ${se(e.animations.length, {
    one: "движение",
    few: "движения",
    many: "движений"
  })}` + (r ? `, размер ${r}` : "") + (e.facing ? `, предполагаемый взгляд +${e.facing.toUpperCase()}` : "");
}
function mt(e) {
  return e.trim().toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "model";
}
class Q extends Error {
  constructor(t, r, a) {
    super(Ye(typeof a.message == "string" ? a.message : r)), this.name = "Studio3dApiError", this.status = t, this.code = r, this.body = a;
  }
}
async function C(e, t) {
  try {
    return t(await e);
  } catch (r) {
    if (_e(r)) {
      const a = r.data && typeof r.data == "object" && !Array.isArray(r.data) ? r.data : {};
      throw new Q(r.status, typeof a.error == "string" ? a.error : "", a);
    }
    throw r;
  }
}
function V(e) {
  const t = new URLSearchParams();
  for (const [r, a] of Object.entries(e))
    a != null && a !== "" && t.set(r, String(a));
  return t.toString();
}
function bt(e, t) {
  if (!/^\/api\/ext\/[^/?#]+$/.test(t))
    throw new Error("invalid_studio_api_prefix");
  const r = encodeURIComponent, a = (o, l) => `${t}/models/${r(o)}/versions/${r(l)}`, d = (o, l, h, p) => C(e.post(o, l, { signal: p, retry: !1 }), h), m = (o, l, h) => C(e.get(o, { signal: h, retry: !1 }), l);
  return {
    state: (o) => m(`${t}/state`, k.state, o),
    models: (o = {}, l) => m(`${t}/models?${V(o)}`, k.models, l),
    model: (o, l) => m(`${t}/models/${r(o)}`, k.model, l),
    patchModel: (o, l) => C(e.patch(`${t}/models/${r(o)}`, l), k.model),
    createModel: (o) => d(`${t}/models`, o, k.createdModel),
    deleteModel: (o, l) => C(e.del(`${t}/models/${r(o)}?${V({ libraryId: l })}`), k.ok),
    deleteVersion: (o, l, h) => C(e.del(`${a(o, l)}?${V({ libraryId: h })}`), k.ok),
    lighten: (o, l, h) => d(`${a(o, l)}/lighten`, h, k.lighten),
    redownload: (o, l, h) => d(`${a(o, l)}/redownload`, h, k.version),
    retry: (o, l, h, p) => d(`${a(o, l)}/retry`, h, k.run, p),
    preview: (o, l, h, p) => C(e.postBytes(
      `${a(o, l)}/preview?${V({ libraryId: h })}`,
      p,
      { headers: { "Content-Type": p.type } }
    ), k.version),
    save: (o, l, h) => d(`${a(o, l)}/save`, h, k.save),
    fromFile: (o, l) => d(`${t}/models/${r(o)}/versions/from-file`, l, k.version),
    file: (o, l, h) => C(e.getBlob(`${t}/files/${r(o)}/${r(l)}/${r(h)}`), (p) => p),
    offers: (o, l) => d(`${t}/offers`, o, k.offers, l),
    quote: (o, l) => d(`${t}/quote`, o, k.quote, l),
    run: (o, l) => d(`${t}/run`, o, k.run, l),
    job: (o, l, h) => m(`${t}/jobs/${r(o)}?${V({ libraryId: l })}`, k.job, h),
    reconcile: (o, l, h) => d(`${t}/jobs/${r(o)}/children/${r(l)}/reconcile`, h, k.job),
    closeUnknown: (o, l, h) => d(`${t}/jobs/${r(o)}/children/${r(l)}/close-unknown`, h, k.job),
    batchQuote: (o) => d(`${t}/batches/quote`, o, k.batchQuote),
    batchRun: (o, l) => d(`${t}/batches/run`, o, k.batchRun, l),
    upload: (o, l, h) => {
      const p = new FormData();
      return p.append("libraryId", o), p.append("file", l), C(e.upload(`${t}/uploads`, p, { signal: h }), k.upload);
    },
    tasks: (o = !1, l) => m(`${t}/tasks${o ? "?refresh=1" : ""}`, k.tasks, l),
    importTask: (o, l, h) => d(`${t}/tasks/${r(o)}/${r(l)}/import`, { libraryId: h }, k.imported),
    scan: (o) => d(`${t}/scan`, { libraryId: o }, k.scan),
    resolve: (o, l) => d(`${t}/viewer/resolve`, o, k.viewer, l),
    viewerFile: (o, l) => C(
      e.getBlob(`${t}/viewer/file/${r(o)}/${r(l)}`),
      (h) => h
    )
  };
}
const Ze = 6e5;
function G() {
  return new DOMException("Сессия изменилась. Намерение сохранено без отправки.", "AbortError");
}
function F(e) {
  return e instanceof Q && e.status >= 400 && e.status < 500;
}
function et(e) {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), a = () => ({ ...e.session() }), d = (s, g) => {
    var S;
    const u = e.session();
    return s.owner === u.owner && s.generation === u.generation && (s.libraryEpoch ?? 0) === (u.libraryEpoch ?? 0) && s.libraryId === u.libraryId && u.started && u.libraryOk && !((S = s.signal) != null && S.aborted) && (!g || g.owner === s.owner && g.libraryId === s.libraryId);
  }, m = (s, g) => () => d(s, g), o = (s, g) => {
    const u = r.get(s.key);
    if (u)
      return u;
    const S = Promise.resolve().then(g);
    return r.set(s.key, S), S.finally(() => {
      r.get(s.key) === S && r.delete(s.key);
    }).catch(() => {
    }), S;
  }, l = (s) => {
    var g;
    return (g = e.onStale) == null || g.call(e, s), new Q(409, "stale_library", { error: "stale_library" });
  }, h = (s, g) => {
    if (g.libraryId !== s.libraryId)
      throw l(s);
  }, p = async (s, g, u) => {
    if (!d(g, s) || (h(s, u), await e.storage.remove(s.key, m(g, s)), !d(g, s)))
      throw G();
    return e.pending.remove(s.key), e.onSent(u, g.generation), u;
  }, A = async (s, g) => {
    if (!d(g, s) || s.blocked)
      throw new Error(s.blocked || "Библиотека или сессия изменилась. Намерение сохранено.");
    let u;
    return s.kind === "batch" ? u = await e.api.batchRun(structuredClone(s.request), g.signal) : s.kind === "retry" ? u = await e.api.retry(
      s.modelId,
      s.versionId,
      structuredClone(s.request),
      g.signal
    ) : u = await e.api.run(structuredClone(s.request), g.signal), p(s, g, u);
  }, x = async (s, g, u = a()) => {
    if (!d(u, s) || (await e.storage.remove(s.key, m(u, s)), !d(u, s)))
      throw G();
    const S = s.kind === "run" && typeof s.request.name == "string" && s.request.name ? s.request.name : "3D";
    e.pending.remove(s.key), e.onDropped(s, `Заказ «${S}» не отправлен: ${g}`);
  }, f = async (s, g, u) => {
    var S;
    if (!d(g, s))
      throw u;
    if (F(u) && u.code === "stale_library")
      throw (S = e.onStale) == null || S.call(e, s), u;
    if (F(u)) {
      const N = { ...s, blocked: u.message };
      if (await e.storage.put(N, m(g, s)), !d(g, s))
        throw u;
      if (e.pending.replace(N), u.code === "price_changed" && u.body.quote)
        return { priceChanged: k.price(u.body.quote) };
    }
    throw d(g, s) && e.onError(u, g.generation), u;
  }, y = (s, g, u, S, N) => {
    const _ = a(), j = g, H = j.snapshot;
    if (j.libraryId !== void 0 && j.libraryId !== _.libraryId || (H == null ? void 0 : H.libraryId) !== void 0 && H.libraryId !== _.libraryId)
      return Promise.reject(new Q(409, "stale_library", { error: "stale_library" }));
    const ce = JSON.parse(JSON.stringify({ ...g, libraryId: _.libraryId })), T = e.fingerprint({
      owner: _.owner,
      kind: s,
      modelId: S,
      versionId: N,
      request: ce
    }), he = t.get(T);
    if (he)
      return he;
    const X = (async () => {
      if (!d(_))
        throw new Error("Библиотека 3D недоступна.");
      const pe = e.pending.list().find((M) => M.fingerprint === T && !M.blocked), re = pe ? structuredClone(pe) : {
        key: u ?? e.uuid(),
        owner: _.owner,
        libraryId: _.libraryId,
        kind: s,
        fingerprint: T,
        request: {},
        modelId: S,
        versionId: N,
        at: e.now()
      }, ge = e.pending.list().find((M) => M.key === re.key);
      if (ge && ge.fingerprint !== T)
        throw new Error("Снимок этого намерения уже другой.");
      const D = { ...re, request: { ...ce, idempotencyKey: re.key } };
      if (await e.storage.put(D, m(_, D)), !d(_, D))
        throw G();
      return e.pending.list().some((M) => M.key === D.key) || e.pending.add(D), o(D, async () => {
        e.busy.begin();
        try {
          return await A(D, _);
        } catch (M) {
          return f(D, _, M);
        } finally {
          _.generation === e.session().generation && e.busy.end(_.generation);
        }
      });
    })();
    return t.set(T, X), X.finally(() => {
      t.get(T) === X && t.delete(T);
    }).catch(() => {
    }), X;
  }, O = (s, g = !1) => o(s, async () => {
    var S, N;
    const u = a();
    if (!(!d(u, s) || s.blocked))
      try {
        const _ = await e.api.job(s.key, s.libraryId, u.signal);
        return d(u, s) ? (h(s, _), p(s, u, {
          recovered: !0,
          libraryId: _.libraryId,
          intentId: s.key
        })) : void 0;
      } catch (_) {
        if (!d(u, s))
          return;
        if (F(_) && _.code === "stale_library") {
          (S = e.onStale) == null || S.call(e, s);
          return;
        }
        if (F(_) && _.status === 404) {
          if (e.now() - s.at > Ze) {
            await x(s, "связь оборвалась. Повторите вручную.", u);
            return;
          }
          try {
            return await A(s, u);
          } catch (j) {
            if (!d(u, s))
              return;
            if (F(j) && j.code === "stale_library")
              (N = e.onStale) == null || N.call(e, s);
            else {
              if (g)
                return f(s, u, j);
              F(j) ? await x(s, j.message, u) : e.onError(j, u.generation);
            }
          }
        } else F(_) ? await x(s, _.message, u) : e.onError(_, u.generation);
      }
  });
  return {
    submit: y,
    sendPending: (s) => A(s, a()),
    recoverPending: async () => {
      const s = a(), g = await e.storage.list(s.owner, m(s));
      if (d(s)) {
        e.pending.reset(g);
        for (const u of g) {
          if (!d(s))
            return;
          await O(u);
        }
      }
    },
    recoverOne: O,
    dropPending: x
  };
}
function J(e) {
  if (Array.isArray(e))
    return `[${e.map(J).join(",")}]`;
  if (e && typeof e == "object") {
    const t = e;
    return `{${Object.keys(t).filter((r) => t[r] !== void 0).sort().map((r) => `${JSON.stringify(r)}:${J(t[r])}`).join(",")}}`;
  }
  return JSON.stringify(e) ?? "null";
}
function tt(e) {
  let t = null;
  const r = () => t || (t = new Promise((m, o) => {
    const l = globalThis.indexedDB;
    if (!l) {
      o(new Error("Не удалось сохранить намерение 3D. Проверьте доступ к хранилищу браузера."));
      return;
    }
    const h = l.open("grigdesk-studio3d-intents", 1);
    h.onupgradeneeded = () => {
      h.result.createObjectStore("intents", { keyPath: "key" });
    }, h.onerror = () => o(new Error("Хранилище намерений 3D недоступно.")), h.onblocked = () => o(new Error("Закройте другую вкладку для обновления хранилища 3D.")), h.onsuccess = () => {
      const p = h.result;
      p.onversionchange = () => {
        p.close(), t = null;
      }, m(p);
    };
  }).catch((m) => {
    throw t = null, m;
  }), t), a = (m) => {
    if (m && !m())
      throw new DOMException("Сессия намерения отозвана.", "AbortError");
  }, d = async (m, o) => {
    const l = await r();
    a(o), await new Promise((h, p) => {
      const A = l.transaction("intents", "readwrite", { durability: "strict" });
      A.oncomplete = () => h(), A.onerror = () => p(new Error("Не удалось сохранить намерение 3D.")), A.onabort = () => p(new Error("Сохранение намерения 3D отменено."));
      try {
        a(o), m(A.objectStore("intents"));
      } catch (x) {
        A.abort(), p(x);
      }
    });
  };
  return {
    list: async (m, o) => {
      const l = await r();
      a(o);
      const h = await new Promise((p, A) => {
        const x = l.transaction("intents", "readonly").objectStore("intents").getAll();
        x.onsuccess = () => p(x.result), x.onerror = () => A(new Error("Не удалось прочитать намерения 3D."));
      });
      return a(o), h.filter((p) => {
        var A, x;
        return p.owner === m && ["run", "retry", "batch"].includes(p.kind) && typeof p.libraryId == "string" && typeof p.key == "string" && ((A = p.request) == null ? void 0 : A.idempotencyKey) === p.key && ((x = p.request) == null ? void 0 : x.libraryId) === p.libraryId;
      });
    },
    put: (m, o) => d((l) => {
      a(o), l.put(structuredClone(m));
    }, o),
    remove: (m, o) => d((l) => {
      a(o), l.delete(m);
    }, o)
  };
}
const U = /* @__PURE__ */ new Map();
let ve = 0;
const ne = () => new DOMException("Сессия намерений отозвана.", "AbortError"), Z = () => new Q(409, "stale_library", { error: "stale_library" });
function rt(e) {
  return U.get(e);
}
function yt(e) {
  const t = rt(e);
  if (!t)
    throw new Error("studio3d_service_not_ready");
  return t;
}
function wt(e) {
  var r;
  e.signal.throwIfAborted(), (r = U.get(e.owner)) == null || r.close();
  const t = new it(e);
  return U.set(e.owner, t), t;
}
class it {
  constructor(t) {
    this.listeners = /* @__PURE__ */ new Set(), this.serviceAbort = new AbortController(), this.libraryAbort = new AbortController(), this.epoch = ++ve, this.libraryEpoch = 0, this.requestSeq = 0, this.marker = "", this.state = null, this.admitted = !1, this.closed = !1, this.error = null, this.pending = [], this.pendingRevision = 0, this.pendingChanges = /* @__PURE__ */ new Map(), this.busy = 0, this.sentRevision = 0, this.stateRead = null, this.pendingRead = null, this.recovering = null, this.submitting = /* @__PURE__ */ new Map(), this.suppressed = /* @__PURE__ */ new Set(), this.close = () => {
      this.closed || (this.closed = !0, this.admitted = !1, this.epoch = ++ve, this.libraryEpoch += 1, this.requestSeq += 1, this.serviceAbort.abort(), this.libraryAbort.abort(), this.options.signal.removeEventListener("abort", this.close), U.get(this.owner) === this && U.delete(this.owner), this.publish(), this.listeners.clear());
    }, this.owner = t.owner, this.options = t, this.storage = t.storage ?? tt(), this.controller = et({
      storage: this.storage,
      api: t.api,
      fingerprint: J,
      now: t.now ?? Date.now,
      uuid: t.uuid ?? (() => crypto.randomUUID()),
      session: () => ({
        owner: this.owner,
        generation: this.epoch,
        libraryEpoch: this.libraryEpoch,
        libraryId: this.marker,
        started: this.live(),
        libraryOk: this.admitted,
        signal: AbortSignal.any([this.serviceAbort.signal, this.libraryAbort.signal])
      }),
      pending: {
        list: () => this.pending,
        add: (r) => this.changePending(r.key, r),
        replace: (r) => this.changePending(r.key, r),
        remove: (r) => this.changePending(r, null),
        reset: (r) => {
          this.pending = r, this.publish();
        }
      },
      busy: {
        begin: () => {
          this.busy += 1, this.publish();
        },
        end: () => {
          this.busy = Math.max(0, this.busy - 1), this.publish();
        }
      },
      onSent: () => {
        this.sentRevision += 1, this.publish();
      },
      onError: (r) => this.reportError(r),
      onDropped: (r, a) => {
        var d;
        return (d = t.onDropped) == null ? void 0 : d.call(t, r, a);
      },
      onStale: (r) => {
        this.suppressed.add(r.key), this.invalidateLibrary(Z()), this.refreshLibrary().catch((a) => this.reportError(a));
      }
    }), t.signal.addEventListener("abort", this.close, { once: !0 });
  }
  live() {
    return !this.closed && !this.options.signal.aborted && !this.serviceAbort.signal.aborted && U.get(this.owner) === this;
  }
  /**
  * Снимок фиксирует независимые owner/service/library epochs до await.
  * Guard повторно проверяется IDB adapter непосредственно перед mutation.
  */
  capture() {
    const t = this.epoch, r = this.libraryEpoch, a = this.marker;
    return () => this.live() && t === this.epoch && r === this.libraryEpoch && a === this.marker && this.admitted;
  }
  publish() {
    const t = this.librarySnapshot();
    for (const r of this.listeners)
      r(t);
  }
  /**
  * Локальная ревизия сохраняет порядок put/remove относительно чтения IDB.
  * Поздний список не возвращает снятую запись и не теряет новое нажатие.
  */
  changePending(t, r) {
    this.pendingRevision += 1, this.pendingChanges.set(t, this.pendingRevision), this.pending = this.pending.filter((a) => a.key !== t), r && this.pending.push(structuredClone(r)), this.publish();
  }
  librarySnapshot() {
    var t;
    return Object.freeze({
      owner: this.owner,
      state: this.state,
      libraryId: this.marker,
      libraryOk: this.admitted && ((t = this.state) == null ? void 0 : t.library.ok) === !0,
      admitted: this.admitted && this.live(),
      serviceEpoch: this.epoch,
      libraryEpoch: this.libraryEpoch,
      requestSeq: this.requestSeq,
      pending: Object.freeze(this.pending.map((r) => structuredClone(r))),
      busy: this.busy,
      error: this.error,
      sentRevision: this.sentRevision
    });
  }
  subscribe(t) {
    return this.listeners.add(t), t(this.librarySnapshot()), () => {
      this.listeners.delete(t);
    };
  }
  /**
  * Settings/stale закрывают admission синхронно, до любого await нового state.
  * Снимки IDB не переписываются, прежние запросы не могут снова открыть библиотеку.
  */
  invalidateLibrary(t = null) {
    this.live() && (this.admitted = !1, this.libraryEpoch += 1, this.requestSeq += 1, this.libraryAbort.abort(), this.libraryAbort = new AbortController(), this.stateRead = null, this.pendingRead = null, this.recovering = null, this.error = t, this.publish());
  }
  /**
  * requestSeq/epoch проверяются даже при возврате A после A→B→A.
  * Устаревший reader может получить только подтверждённый новый state, но не публикует свой ответ.
  */
  refreshLibrary() {
    if (!this.live())
      return Promise.reject(ne());
    if (this.stateRead)
      return this.stateRead.promise;
    const t = this.epoch, r = this.libraryEpoch, a = ++this.requestSeq, d = AbortSignal.any([this.serviceAbort.signal, this.libraryAbort.signal]), m = () => this.live() && t === this.epoch && r === this.libraryEpoch && a === this.requestSeq, o = async () => {
      if (this.stateRead && this.stateRead.seq !== a)
        return this.stateRead.promise;
      if (this.live() && this.admitted && this.state)
        return this.state;
      throw this.error ?? ne();
    }, l = Promise.resolve().then(async () => {
      var h;
      try {
        const p = await this.options.api.state(d);
        if (!m())
          return o();
        const A = this.marker !== p.libraryId, x = this.admitted && p.library.ok !== !0, f = !this.admitted || A;
        return (A || x) && (this.libraryEpoch += 1, this.libraryAbort.abort(), this.libraryAbort = new AbortController(), this.pendingRead = null, this.recovering = null), A && this.suppressed.clear(), this.marker = p.libraryId, this.state = Object.freeze(structuredClone(p)), this.admitted = p.library.ok === !0, this.error = null, this.publish(), f && this.admitted && !this.recovering && queueMicrotask(() => {
          this.live() && this.recoverPending().catch((y) => this.reportError(y));
        }), this.state;
      } catch (p) {
        if (!m())
          return o();
        throw this.invalidateLibrary(p), p;
      } finally {
        ((h = this.stateRead) == null ? void 0 : h.seq) === a && (this.stateRead = null);
      }
    });
    return this.stateRead = { seq: a, promise: l }, l;
  }
  /**
  * Общий read barrier предшествует UUID и recovery; IDB adapter проверяет guard после open await.
  * Поздний список сливается с локальными изменениями, не возвращая уже снятый record.
  */
  loadPending() {
    if (this.pendingRead)
      return this.pendingRead;
    const t = this.capture(), r = this.pendingRevision, a = (async () => {
      const d = await this.storage.list(this.owner, t);
      if (!t())
        throw ne();
      const m = new Map(d.map((o) => [o.key, o]));
      for (const [o, l] of this.pendingChanges)
        if (l > r) {
          const h = this.pending.find((p) => p.key === o);
          h ? m.set(o, h) : m.delete(o);
        }
      this.pending = [...m.values()], this.publish();
    })();
    return this.pendingRead = a, a.finally(() => {
      this.pendingRead === a && (this.pendingRead = null);
    }).catch(() => {
    }), a;
  }
  /**
  * Expected marker обязателен и сравнивается после fresh state и внутреннего IDB await.
  * Только затем engine вправе выделить UUID: ни снимок A, ни batch A не переименовываются в B.
  */
  submit(t, r, a, d, m, o) {
    const l = JSON.parse(JSON.stringify(a)), h = J({
      owner: this.owner,
      expectedLibraryId: t,
      kind: r,
      input: l,
      modelId: m,
      versionId: o
    }), p = this.submitting.get(h);
    if (p)
      return p;
    const A = this.epoch, x = this.libraryEpoch, f = (async () => {
      const y = await this.refreshLibrary();
      if (typeof t != "string" || !t || !this.live() || A !== this.epoch || x !== this.libraryEpoch || !this.admitted || y.libraryId !== t)
        throw Z();
      const O = this.capture();
      if (await this.loadPending(), !O() || this.marker !== t)
        throw Z();
      const R = l, s = R.snapshot;
      if (R.libraryId !== void 0 && R.libraryId !== t || (s == null ? void 0 : s.libraryId) !== void 0 && s.libraryId !== t)
        throw Z();
      const g = J({
        owner: this.owner,
        kind: r,
        modelId: m,
        versionId: o,
        request: { ...l, libraryId: t }
      }), u = this.pending.find((S) => S.fingerprint === g && !S.blocked);
      if (u) {
        this.suppressed.delete(u.key);
        const S = await this.controller.recoverOne(u, !0);
        if (!S)
          throw this.error ?? new Error("studio3d_pending_not_sent");
        return S;
      }
      return this.controller.submit(r, l, d, m, o);
    })();
    return this.submitting.set(h, f), f.finally(() => {
      this.submitting.get(h) === f && this.submitting.delete(h);
    }).catch(() => {
    }), f;
  }
  /**
  * Каждый проход начинает fresh state, затем GET только records текущей библиотеки.
  * Suppressed stale ответ не запускается автоматически; возврат другого marker снимает suppression.
  */
  recoverPending() {
    if (this.recovering)
      return this.recovering;
    const t = (async () => {
      if (await this.refreshLibrary(), !this.admitted)
        return;
      const r = this.capture();
      await this.loadPending();
      for (const a of [...this.pending]) {
        if (!r())
          return;
        a.libraryId === this.marker && !a.blocked && !this.suppressed.has(a.key) && await this.controller.recoverOne(a);
      }
    })();
    return this.recovering = t, t.finally(() => {
      this.recovering === t && (this.recovering = null);
    }).catch(() => {
    }), t;
  }
  /**
  * Ошибка публикуется только живым сервисом текущего owner.
  * Abort старой эпохи не превращается в новый alert или изменение pending.
  */
  reportError(t) {
    var r, a;
    !this.live() || t instanceof Error && t.name === "AbortError" || (this.error = t, (a = (r = this.options).onError) == null || a.call(r, t), this.publish());
  }
}
export {
  at as A,
  lt as M,
  ot as O,
  K as V,
  bt as a,
  Ae as b,
  wt as c,
  se as d,
  J as e,
  ie as f,
  yt as g,
  ut as h,
  dt as i,
  ft as j,
  mt as k,
  st as l,
  gt as m,
  ht as n,
  nt as o,
  rt as p,
  pt as r,
  Ye as s,
  ct as t,
  Y as v
};
