import { effectScope as yl, ref as O, markRaw as hl, hasInjectionContext as Bl, inject as wl, reactive as Fl, isRef as pt, isReactive as kl, toRaw as $l, getCurrentScope as ql, onScopeDispose as Tl, watch as re, nextTick as xl, toRefs as Nl, computed as G, shallowRef as Ze, defineComponent as Ue, useModel as Il, useId as bt, openBlock as i, createElementBlock as V, createElementVNode as s, Fragment as Y, renderList as ie, createBlock as D, unref as t, normalizeClass as We, withCtx as k, toDisplayString as $, createTextVNode as q, createCommentVNode as A, createVNode as U, mergeModels as Dl, onUnmounted as Fe, withModifiers as Dt, normalizeStyle as Qt, onMounted as Ut, withDirectives as De, vShow as nt, renderSlot as zl, provide as Wl } from "vue";
import { r as Jl } from "./auth-BSqk3WDR.js";
import { a as Vl, o as zt, V as Xl, s as $e, g as Gl, b as Hl, f as Ae, d as Yt, e as rl, M as Sl, v as Vt, h as ot, i as vt, A as $t, j as Cl, O as ul, k as dl, l as St, m as xt, t as Zt, n as Kl, r as Ql } from "./pending-service-DT5JtEfa.js";
import { confirmDialog as et, UiField as de, UiInput as st, UiTextarea as cl, UiNumberField as tt, UiSelect as xe, UiSwitch as Wt, UiSearchInput as Ul, UiChoiceList as Yl, UiDisclosureButton as ft, UiButton as te, UiPopover as Zl, UiInlineMessage as ce, UiActionLink as el, UiPressable as _t, UiFilePicker as It, UiDialog as tl, UiSegmentedControl as Jt, UiLoadingState as ll, UiSkeleton as Ve, UiIconButton as at, UiProgress as Et, vTooltip as dt, UiCheckbox as vl, UiRange as ea, UiPaneHeader as ta, UiTabs as fl, UiTab as wt } from "@grigdesk/ui";
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let _l;
const Mt = (e) => _l = e, El = (
  /* istanbul ignore next */
  Symbol()
);
function Xt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var mt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(mt || (mt = {}));
function la() {
  const e = yl(!0), u = e.run(() => O({}));
  let l = [], d = [];
  const a = hl({
    install(f) {
      Mt(a), a._a = f, f.provide(El, a), f.config.globalProperties.$pinia = a, d.forEach((y) => l.push(y)), d = [];
    },
    use(f) {
      return this._a ? l.push(f) : d.push(f), this;
    },
    _p: l,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: u
  });
  return a;
}
function aa(e) {
  e._e.stop(), e._s.clear(), e._p.splice(0), e.state.value = {}, e._a = null;
}
const Ml = () => {
};
function ml(e, u, l, d = Ml) {
  e.push(u);
  const a = () => {
    const f = e.indexOf(u);
    f > -1 && (e.splice(f, 1), d());
  };
  return !l && ql() && Tl(a), a;
}
function lt(e, ...u) {
  e.slice().forEach((l) => {
    l(...u);
  });
}
const na = (e) => e(), pl = Symbol(), Tt = Symbol();
function Gt(e, u) {
  e instanceof Map && u instanceof Map ? u.forEach((l, d) => e.set(d, l)) : e instanceof Set && u instanceof Set && u.forEach(e.add, e);
  for (const l in u) {
    if (!u.hasOwnProperty(l))
      continue;
    const d = u[l], a = e[l];
    Xt(a) && Xt(d) && e.hasOwnProperty(l) && !pt(d) && !kl(d) ? e[l] = Gt(a, d) : e[l] = d;
  }
  return e;
}
const oa = (
  /* istanbul ignore next */
  Symbol()
);
function sa(e) {
  return !Xt(e) || !e.hasOwnProperty(oa);
}
const { assign: Ye } = Object;
function ia(e) {
  return !!(pt(e) && e.effect);
}
function ra(e, u, l, d) {
  const { state: a, actions: f, getters: y } = u, w = l.state.value[e];
  let p;
  function m() {
    w || (l.state.value[e] = a ? a() : {});
    const P = Nl(l.state.value[e]);
    return Ye(P, f, Object.keys(y || {}).reduce((I, c) => (I[c] = hl(G(() => {
      Mt(l);
      const S = l._s.get(e);
      return y[c].call(S, S);
    })), I), {}));
  }
  return p = Ol(e, m, u, l, d, !0), p;
}
function Ol(e, u, l = {}, d, a, f) {
  let y;
  const w = Ye({ actions: {} }, l), p = { deep: !0 };
  let m, P, I = [], c = [], S;
  const E = d.state.value[e];
  !f && !E && (d.state.value[e] = {}), O({});
  let _;
  function R(h) {
    let M;
    m = P = !1, typeof h == "function" ? (h(d.state.value[e]), M = {
      type: mt.patchFunction,
      storeId: e,
      events: S
    }) : (Gt(d.state.value[e], h), M = {
      type: mt.patchObject,
      payload: h,
      storeId: e,
      events: S
    });
    const B = _ = Symbol();
    xl().then(() => {
      _ === B && (m = !0);
    }), P = !0, lt(I, M, d.state.value[e]);
  }
  const C = f ? function() {
    const { state: M } = l, B = M ? M() : {};
    this.$patch((T) => {
      Ye(T, B);
    });
  } : (
    /* istanbul ignore next */
    Ml
  );
  function b() {
    y.stop(), I = [], c = [], d._s.delete(e);
  }
  const o = (h, M = "") => {
    if (pl in h)
      return h[Tt] = M, h;
    const B = function() {
      Mt(d);
      const T = Array.from(arguments), le = [], ee = [];
      function ae(ue) {
        le.push(ue);
      }
      function ne(ue) {
        ee.push(ue);
      }
      lt(c, {
        args: T,
        name: B[Tt],
        store: r,
        after: ae,
        onError: ne
      });
      let fe;
      try {
        fe = h.apply(this && this.$id === e ? this : r, T);
      } catch (ue) {
        throw lt(ee, ue), ue;
      }
      return fe instanceof Promise ? fe.then((ue) => (lt(le, ue), ue)).catch((ue) => (lt(ee, ue), Promise.reject(ue))) : (lt(le, fe), fe);
    };
    return B[pl] = !0, B[Tt] = M, B;
  }, v = {
    _p: d,
    // _s: scope,
    $id: e,
    $onAction: ml.bind(null, c),
    $patch: R,
    $reset: C,
    $subscribe(h, M = {}) {
      const B = ml(I, h, M.detached, () => T()), T = y.run(() => re(() => d.state.value[e], (le) => {
        (M.flush === "sync" ? P : m) && h({
          storeId: e,
          type: mt.direct,
          events: S
        }, le);
      }, Ye({}, p, M)));
      return B;
    },
    $dispose: b
  }, r = Fl(v);
  d._s.set(e, r);
  const g = (d._a && d._a.runWithContext || na)(() => d._e.run(() => (y = yl()).run(() => u({ action: o }))));
  for (const h in g) {
    const M = g[h];
    if (pt(M) && !ia(M) || kl(M))
      f || (E && sa(M) && (pt(M) ? M.value = E[h] : Gt(M, E[h])), d.state.value[e][h] = M);
    else if (typeof M == "function") {
      const B = o(M, h);
      g[h] = B, w.actions[h] = M;
    }
  }
  return Ye(r, g), Ye($l(r), g), Object.defineProperty(r, "$state", {
    get: () => d.state.value[e],
    set: (h) => {
      R((M) => {
        Ye(M, h);
      });
    }
  }), d._p.forEach((h) => {
    Ye(r, y.run(() => h({
      store: r,
      app: d._a,
      pinia: d,
      options: w
    })));
  }), E && f && l.hydrate && l.hydrate(r.$state, E), m = !0, P = !0, r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ua(e, u, l) {
  let d, a;
  const f = typeof u == "function";
  d = e, a = f ? l : u;
  function y(w, p) {
    const m = Bl();
    return w = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    w || (m ? wl(El, null) : null), w && Mt(w), w = _l, w._s.has(d) || (f ? Ol(d, u, a, w) : ra(d, a, w)), w._s.get(d);
  }
  return y.$id = d, y;
}
const da = /* @__PURE__ */ ua("studio3d", () => {
  const e = O(null), u = O([]), l = O(0), d = O(""), a = O({}), f = O(null), y = O([]), w = O(null), p = O(null), m = O([]), P = O([]), I = O(0), c = O(0), S = O(!1), E = G(() => I.value + c.value), _ = O(null), R = O([]), C = O(""), b = O(""), o = O(""), v = (j) => {
    var W;
    o.value = j, (W = B == null ? void 0 : B.notifications) == null || W.setViewing(j ? `model:${j}` : null);
  }, r = G(() => {
    var j, W;
    return ((j = p.value) == null ? void 0 : j.active.length) ?? ((W = e.value) == null ? void 0 : W.active) ?? 0;
  }), n = G(() => {
    var j;
    return ((j = e.value) == null ? void 0 : j.libraryId) ?? "";
  });
  let g = 0, h = "", M = !1, B = null, T, le = null, ee = null;
  const ae = [];
  let ne = -1, fe = "", ue = -1, K = null, N = null, J = null, pe = null, Se = null;
  const ke = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), qe = (j) => {
    (j == null ? void 0 : j.name) !== "AbortError" && (_.value = $e(j));
  }, Te = () => {
    g += 1;
    for (const j of ke.values())
      j.controller.abort();
    for (const j of ve)
      j.abort();
    ve.clear(), ke.clear(), N && clearTimeout(N), J && clearTimeout(J), K && clearTimeout(K), K = null, pe == null || pe(null), Se == null || Se(null), pe = null, Se = null, N = null, J = null, w.value = null, I.value = 0;
  }, me = () => {
    u.value = [], f.value = null, y.value = [], w.value = null, p.value = null, m.value = [], l.value = 0, C.value = "";
  }, Le = async (j, W, Z) => {
    const we = ke.get(j);
    we == null || we.controller.abort();
    const ge = { revision: ((we == null ? void 0 : we.revision) ?? 0) + 1, controller: new AbortController() }, ze = g, ht = n.value;
    ke.set(j, ge), I.value += 1;
    try {
      const ut = await W(ge.controller.signal);
      return ze !== g || ke.get(j) !== ge || ge.controller.signal.aborted || ht && ut.libraryId !== ht ? null : (Z(ut), ut);
    } catch (ut) {
      return ze === g && ke.get(j) === ge && !ge.controller.signal.aborted && qe(ut), null;
    } finally {
      ze === g && (I.value = Math.max(0, I.value - 1));
    }
  }, Je = async () => {
    const j = g;
    try {
      return await le.refreshLibrary();
    } catch (W) {
      return j === g && M && qe(W), null;
    }
  }, Pe = (j = !1) => Le("models", (W) => T.models({
    ...a.value,
    q: d.value,
    offset: j ? u.value.length : 0,
    limit: 50
  }, W), (W) => {
    u.value = j ? [...u.value, ...W.models] : W.models, l.value = W.total, R.value = W.broken;
  }), He = (j) => {
    var W;
    return d.value = j, (W = ke.get("models")) == null || W.controller.abort(), N && clearTimeout(N), pe == null || pe(null), new Promise((Z) => {
      pe = Z, N = setTimeout(() => {
        N = null, pe = null, Pe().then(Z);
      }, 300);
    });
  }, je = (j, W = "") => {
    var Z, we;
    return (b.value !== j || C.value !== W) && (f.value = null, y.value = [], w.value = null, (Z = ke.get("offers")) == null || Z.controller.abort(), (we = ke.get("quote")) == null || we.controller.abort()), b.value = j, C.value = W, v(j), Le("detail", (ge) => T.model(j, ge), (ge) => {
      var ze;
      f.value = ge, ge.versions.some((ht) => ht.id === C.value) || (C.value = ge.model.mainVersion ?? ((ze = ge.versions[0]) == null ? void 0 : ze.id) ?? "");
    });
  }, Ee = (j = {}) => Le("offers", (W) => T.offers({ libraryId: n.value, ...j }, W), (W) => {
    y.value = W.offers;
  }), F = (j) => {
    var Z;
    w.value = null, (Z = ke.get("quote")) == null || Z.controller.abort(), J && clearTimeout(J), Se == null || Se(null);
    const W = JSON.parse(JSON.stringify(j));
    return new Promise((we) => {
      Se = we, J = setTimeout(() => {
        Se = null, J = null, Le(
          "quote",
          (ge) => T.quote({ libraryId: n.value, ...W }, ge),
          (ge) => {
            w.value = ge;
          }
        ).then(we);
      }, 300);
    });
  }, x = (j = !1) => Le("tasks", (W) => T.tasks(j, W), (W) => {
    p.value = W;
  }), se = (j, W, Z, we, ge, ze) => !M || B != null && B.signal.aborted || !le ? Promise.reject(new Error((B == null ? void 0 : B.t("contextClosed")) ?? "Контекст раздела 3D закрыт.")) : le.submit(j, W, Z, we, ge, ze), z = (j, W, Z) => se(j, "run", W, Z), X = (j, W, Z, we, ge) => se(j, "retry", { expectedPrice: we }, ge, W, Z), Ce = (j, W, Z) => se(j, "batch", W, Z), H = (j) => T.batchQuote({ libraryId: n.value, rows: j }), Ie = (j, W) => {
    if (!M)
      return;
    const Z = W && typeof W == "object" ? W : {};
    if (Z.libraryId === n.value) {
      if (j === "studio-progress") {
        const we = f.value;
        if (!we || we.model.id !== Z.modelId)
          return;
        const ge = we.versions.find((ze) => ze.id === Z.versionId);
        if (!ge || !Xl.includes(Z.status) || typeof Z.progress != "number" || !Number.isFinite(Z.progress) || Z.progress < 0 || Z.progress > 100)
          return;
        ge.status = Z.status, ge.progress = Z.progress, ge.etaSeconds = typeof Z.etaSeconds == "number" ? Z.etaSeconds : null;
      }
      j === "studio-changed" && (K && clearTimeout(K), K = setTimeout(() => {
        K = null, Me();
      }, 300));
    }
  }, Me = async () => {
    var Z;
    if (!M)
      return;
    const j = h;
    !await Je() || h !== j || !M || !((Z = e.value) != null && Z.library.ok) || await Promise.all([Pe(), x(), b.value ? je(b.value, C.value) : Promise.resolve()]);
  }, Ke = (j) => {
    if (!M || B != null && B.signal.aborted || j.owner !== h)
      return;
    ne >= 0 && ne !== j.libraryEpoch && Te(), j.admitted && j.libraryOk && (fe && j.libraryId !== fe && me(), fe = j.libraryId);
    const W = ue >= 0 && j.sentRevision > ue;
    ne = j.libraryEpoch, ue = j.sentRevision, e.value = j.state, S.value = j.admitted, P.value = [...j.pending], c.value = j.busy, j.error && qe(j.error), W && j.admitted && Promise.all([Pe(), x(), b.value ? je(b.value, C.value) : Promise.resolve()]);
  }, be = async (j, W) => {
    M && B === j && le === W || (M && ye(), B = j, le = W, T = Vl(j.api, zt(j.pluginId)), h = W.owner, M = !0, _.value = null, ne = -1, fe = "", ue = -1, ee = W.subscribe(Ke), ae.push(j.events.on("studio-changed", (Z) => Ie("studio-changed", Z))), ae.push(j.events.on("studio-progress", (Z) => Ie("studio-progress", Z))), ae.push(j.providers.onChanged(() => {
      Me();
    })), j.signal.addEventListener("abort", ye, { once: !0 }), await Me());
  }, ye = () => {
    var j;
    M = !1, B == null || B.signal.removeEventListener("abort", ye), (j = B == null ? void 0 : B.notifications) == null || j.setViewing(null), ee == null || ee(), ee = null;
    for (const W of ae.splice(0))
      W();
    K && clearTimeout(K), K = null, Te(), me(), fe = "", e.value = null, _.value = null, P.value = [], b.value = "", o.value = "", c.value = 0, S.value = !1, B = null, le = null, h = "";
  }, Ne = async (j) => {
    const W = g, Z = new AbortController();
    ve.add(Z);
    try {
      const we = await T.upload(n.value, j, Z.signal);
      if (W !== g || we.libraryId !== n.value)
        throw new Error("Библиотека изменилась.");
      return m.value.push(we), we;
    } finally {
      ve.delete(Z);
    }
  }, Re = async (j) => {
    const W = g;
    I.value += 1;
    try {
      const Z = await j;
      if (W !== g || Z.libraryId !== n.value)
        throw new Error("Библиотека изменилась.");
      return await Promise.all([Pe(), x(), b.value ? je(b.value, C.value) : Promise.resolve()]), Z;
    } catch (Z) {
      throw W === g && qe(Z), Z;
    } finally {
      W === g && (I.value = Math.max(0, I.value - 1));
    }
  };
  return {
    state: e,
    models: u,
    total: l,
    query: d,
    filters: a,
    detail: f,
    offers: y,
    quoted: w,
    tasks: p,
    uploads: m,
    busy: E,
    admitted: S,
    error: _,
    broken: R,
    selectedVersion: C,
    openedModel: b,
    viewingModel: o,
    setViewingModel: v,
    active: r,
    libraryId: n,
    pending: P,
    loadState: Je,
    loadModels: Pe,
    search: He,
    openModel: je,
    loadOffers: Ee,
    quote: F,
    run: z,
    retry: X,
    batchQuote: H,
    batchRun: Ce,
    upload: Ne,
    patchModel: (j, W) => Re(T.patchModel(j, { ...W, libraryId: n.value })),
    deleteModel: (j) => Re(T.deleteModel(j, n.value)),
    deleteVersion: (j, W) => Re(T.deleteVersion(
      j,
      W,
      n.value
    )),
    lighten: (j, W, Z = !1) => Re(T.lighten(j, W, { libraryId: n.value, force: Z })),
    redownload: (j, W) => Re(T.redownload(j, W, { libraryId: n.value })),
    save: (j, W, Z) => Re(T.save(j, W, { ...Z, libraryId: n.value })),
    addFromFile: (j, W) => Re(T.fromFile(j, { ...W, libraryId: n.value })),
    createFromFile: (j) => Re(T.createModel({ ...j, libraryId: n.value })),
    loadTasks: x,
    importExternal: (j, W) => Re(T.importTask(j, W, n.value)),
    scan: () => Re(T.scan(n.value)),
    loadJob: (j) => T.job(j, n.value),
    reconcileChild: (j, W, Z) => Re(T.reconcile(j, W, { libraryId: n.value, taskId: Z })),
    closeUnknownChild: (j, W) => Re(T.closeUnknown(j, W, { libraryId: n.value })),
    start: be,
    stop: ye,
    refresh: Me
  };
}), kt = /* @__PURE__ */ new WeakMap();
async function ca(e) {
  var w;
  if (typeof e.backgroundReady != "function" || typeof ((w = e.notifications) == null ? void 0 : w.setViewing) != "function")
    throw new Error(e.t("runtimeIncompatible"));
  const u = await Jl(e);
  await e.backgroundReady(), e.signal.throwIfAborted();
  const l = Gl(u), d = la(), a = da(d);
  let f = !1;
  function y() {
    f || (f = !0, e.signal.removeEventListener("abort", y), a.stop(), a.$dispose(), aa(d));
  }
  e.signal.addEventListener("abort", y, { once: !0 });
  try {
    return e.signal.throwIfAborted(), await a.start(e, l), e.signal.throwIfAborted(), {
      context: e,
      owner: u,
      pinia: d,
      store: a,
      dispose: y
    };
  } catch (p) {
    throw y(), p;
  }
}
function Pl(e) {
  const u = kt.get(e);
  if (u)
    return u;
  const l = ca(e).catch((d) => {
    throw kt.get(e) === l && kt.delete(e), d;
  });
  return kt.set(e, l), l;
}
const Rl = Symbol("studio3d-session");
function Al() {
  const e = wl(Rl);
  if (!e)
    throw new Error("missing_studio_session");
  return e;
}
function Xe() {
  const e = Al();
  return new Proxy({}, {
    get(u, l) {
      var a;
      const d = (a = e.value) == null ? void 0 : a.store;
      if (!d)
        throw new Error("missing_studio_session");
      return Reflect.get(d, l);
    },
    set(u, l, d) {
      var f;
      const a = (f = e.value) == null ? void 0 : f.store;
      return !!(a && Reflect.set(a, l, d));
    }
  });
}
function Ge() {
  const e = Al();
  return new Proxy({}, {
    get(u, l) {
      var a;
      const d = (a = e.value) == null ? void 0 : a.context;
      if (!d)
        throw new Error("missing_studio_context");
      return Reflect.get(d, l);
    }
  });
}
class Ll extends Error {
  constructor(u) {
    super(`Некорректный ответ раздела проектов: поле ${u}`), this.name = "ProjectsContractError";
  }
}
const {
  boolean: gl,
  listOf: ct,
  nullable: Nt,
  objectOf: it,
  oneOf: Ot,
  record: va,
  text: Be,
  wholeNumber: jl
} = Hl((e) => {
  throw new Ll(e);
}), fa = Ot("passport", "profile"), ma = Ot("none", "pending", "imported", "conflict", "failed", "manual"), pa = {
  id: Be,
  title: Be,
  tags: ct(Be),
  repos: ct(it({ key: Be, dir: Be, exists: gl })),
  defaultRepoKey: Nt(Be),
  archivedAt: Nt(Be),
  revision: jl,
  updatedAt: Nt(Be),
  profile: it({ present: gl, pathsSource: fa }),
  importStatus: ma,
  routes: ct(Be),
  warnings: ct(Be)
}, ga = it(pa), ba = [
  "git",
  "worktree",
  "dir",
  "missing",
  "file",
  "denied",
  "timeout"
];
it({
  results: ct(it({
    dir: Be,
    state: Ot(...ba),
    message: Be
  }))
});
it({
  id: Be,
  revision: jl,
  kind: Ot("created", "updated", "archived", "restored", "deleted", "imported")
});
function ya(e) {
  const l = va(e, "projects").projects;
  if (!Array.isArray(l))
    throw new Ll("projects");
  return l.map((d, a) => ga(d, `projects.${a}`));
}
function Pt() {
  const e = Ge();
  return {
    /**
     * Новый context подтверждается после await до публикации списка проектов.
     * Abort прежнего подключения не меняет данные текущей формы.
     */
    async list() {
      const u = e.signal, l = await e.api.get("/api/projects", { signal: u, retry: !1 });
      return u.throwIfAborted(), ya(l);
    }
  };
}
function al(e) {
  return String(e.prompt ?? "").split(/\r?\n/).map((u) => u.trim()).filter(Boolean);
}
function ha(e, u = al(e)) {
  return {
    values: e,
    errors: u.length > 50 ? [{ field: "prompt", message: "Пачка содержит максимум 50 строк." }] : [],
    warnings: []
  };
}
function wa(e, u = al(e.values)) {
  const { selected: l, values: d, name: a, project: f, category: y } = e;
  if (!l || l.quote.total === null)
    throw new Error("Цена пока не опубликована.");
  return u.map((w, p) => ({
    provider: l.provider,
    operation: l.operation,
    values: { ...d, prompt: w },
    name: a.trim() ? `${a.trim().slice(0, 196)} ${p + 1}` : w.slice(0, 80),
    project: f || null,
    category: y || null,
    expectedPrice: l.quote.total
  }));
}
function ka(e) {
  const { selected: u, values: l, normalizedValues: d, expectedPrice: a, uploads: f, name: y, project: w, category: p } = e;
  return {
    provider: u.provider,
    operation: u.operation,
    values: JSON.parse(JSON.stringify(d ?? l)),
    expectedPrice: a,
    uploads: f,
    ...y.trim() && { name: y.trim() },
    project: w || null,
    category: p || null
  };
}
function _e(e) {
  const u = e.contextSignal();
  return () => !u.aborted && e.contextSignal() === u;
}
function $a(e) {
  const {
    offer: u,
    disabledReason: l,
    displayQuote: d,
    batch: a,
    mode: f,
    batchQuoted: y,
    outputUnit: w,
    values: p,
    quoted: m,
    inputs: P,
    name: I,
    project: c,
    category: S,
    providerId: E,
    selectedPreset: _,
    presetHint: R
  } = e, C = e.formFingerprint, b = /* @__PURE__ */ new Map();
  function o(r, n) {
    var M, B;
    if (n && n !== "undefined:undefined" && b.set(n, JSON.parse(JSON.stringify(p.value))), r === "undefined:undefined")
      return;
    const g = p.value.prompt, h = Object.fromEntries((((M = u.value) == null ? void 0 : M.fields) ?? []).map((T) => [T.id, JSON.parse(JSON.stringify(T.default ?? null))]));
    p.value = b.get(r) ?? {
      ...h,
      ...g && "prompt" in h ? { prompt: g } : {}
    }, E.value = ((B = u.value) == null ? void 0 : B.provider) ?? "", _.value = "", R.value = "";
  }
  async function v(r) {
    var T, le, ee;
    const n = u.value, g = _e(e);
    if (!g() || !n || l.value || !d.value || d.value.total === null)
      throw new Error(l.value || "Сначала проверьте цену.");
    if (a.value && f.value === "text") {
      const ae = y.value;
      if (!ae)
        throw new Error("Сначала рассчитайте пачку.");
      const ne = ae.libraryId, fe = JSON.parse(JSON.stringify(ae.snapshot)), ue = C(), K = Ae(ae.totalEstimated, ae.unit), N = Yt(fe.rows.length, w.value);
      if (!await et(
        `Создать ${fe.rows.length} ${N} — ${K}?`,
        { title: "Подтвердить пачку", okText: "Создать" }
      ))
        return { cancelled: !0 };
      if (!e.isAlive() || !e.isActive() || !g() || ue !== C())
        throw new Error("Форма изменилась. Рассчитайте пачку снова.");
      const pe = await e.batchRun(
        ne,
        { snapshot: fe, snapshotHash: ae.snapshotHash },
        r
      );
      return e.isAlive() && e.isActive() && g() && ue === C() && e.onTasks(), pe;
    }
    const h = C(), M = (T = m.value) == null ? void 0 : T.libraryId;
    if (!M)
      throw new Error("Сначала проверьте цену.");
    const B = await e.run(M, ka({
      selected: n,
      values: p.value,
      normalizedValues: (le = m.value) == null ? void 0 : le.validation.values,
      expectedPrice: d.value.total,
      uploads: P.value,
      name: I.value,
      project: c.value,
      category: S.value
    }), r);
    return e.isAlive() && e.isActive() && g() && h === C() && "model" in B && B.model && e.onCreated(B.model.id, (ee = B.versions[0]) == null ? void 0 : ee.id), B;
  }
  return { rememberDraft: o, execute: v };
}
function xa(e) {
  const { creationOffers: u, quoted: l, batchQuoted: d, changedPrice: a, error: f, offer: y, mode: w, batch: p, values: m } = e;
  let P = 0, I = 0, c = null;
  async function S() {
    const C = ++P, b = _e(e);
    if (b() && e.isActive() && e.libraryId()) {
      const o = await e.loadOffers({ uploads: e.inputs() });
      b() && e.isAlive() && e.isActive() && C === P && (o == null ? void 0 : o.libraryId) === e.libraryId() && (u.value = o.offers);
    }
  }
  function E() {
    a.value = !1;
    const C = ++I, b = _e(e);
    d.value = null, l.value = null, c && clearTimeout(c);
    const o = y.value;
    if (!(!b() || !e.isActive() || !o || w.value === "file"))
      if (p.value && w.value === "text") {
        if (!e.lines().length || e.lines().length > 50 || o.quote.total === null)
          return;
        const v = e.batchRows();
        c = setTimeout(() => {
          c = null, b() && e.batchQuote(v).then((r) => {
            b() && e.isAlive() && C === I && r.libraryId === e.libraryId() && (d.value = r);
          }).catch((r) => {
            b() && e.isAlive() && C === I && (f.value = $e(r));
          });
        }, 300);
      } else
        e.quote({
          provider: o.provider,
          operation: o.operation,
          values: m.value,
          uploads: e.inputs()
        }).then((v) => {
          b() && e.isAlive() && e.isActive() && C === I && (v == null ? void 0 : v.libraryId) === e.libraryId() && (l.value = v);
        });
  }
  function _(C) {
    a.value = !0, l.value && (l.value = { ...l.value, quote: C }), p.value && (d.value = null);
  }
  function R() {
    P += 1, I += 1, c && clearTimeout(c);
  }
  return {
    refreshOffers: S,
    refreshQuote: E,
    priceChanged: _,
    dispose: R
  };
}
const yt = 150 * 1024 * 1024, Rt = 20 * 1024 * 1024, Ct = 1024 * 1024 * 1024;
function Ht(e) {
  if (!e || /[\\\x00-\x1f?#]/.test(e))
    throw new Error("Недопустимый путь ресурса модели.");
  return e.split("/").map((u) => {
    let l;
    try {
      l = decodeURIComponent(u);
    } catch {
      throw new Error("Некорректное кодирование ресурса модели.");
    }
    if (!l || [".", ".."].includes(l) || /[%/:\\\x00-\x1f]/.test(l))
      throw new Error("Ресурс выходит из папки модели.");
    return encodeURIComponent(l);
  });
}
function At(e) {
  const u = "^data:(image/(?:png|jpeg|webp)|application/(?:octet-stream|gltf-buffer));base64,([A-Za-z0-9+/]*={0,2})$", l = new RegExp(u).exec(e);
  if (!l || l[2].length % 4 !== 0)
    throw new Error("Недопустимый data URI модели.");
  const d = l[1].startsWith("image/") ? Rt : yt;
  if (l[2].length * 3 / 4 > d + 2)
    throw new Error("Встроенный ресурс слишком большой.");
  const a = atob(l[2]);
  return { mime: l[1], bytes: Uint8Array.from(a, (f) => f.charCodeAt(0)) };
}
function Ia(e) {
  if (typeof e != "string" || !/^\/api\/ext\/[^/]+$/.test(e) || "/" + Ht(e.slice(1)).join("/") !== e)
    throw new Error("Недопустимый собственный API просмотрщика.");
}
function Xi(e, u, l = ((d) => (d = globalThis.location) == null ? void 0 : d.origin)() || "http://localhost") {
  if (Ia(u), !e || e.startsWith("//") || e.includes("\\"))
    throw new Error("Недопустимый источник модели.");
  const a = new URL(l), f = new URL(e, a);
  if (f.origin !== a.origin || f.search || f.hash || !f.pathname.startsWith(`${u}/`))
    throw new Error("Модель вне собственного API.");
  const y = e.replace(/^https?:\/\/[^/]+/i, "").replace(/^\//, ""), w = "/" + Ht(y).join("/"), p = w.slice(u.length), m = /^\/viewer\/file\/[a-f0-9]{48}\/[^/]+$/i, P = /^\/files\/[^/]+\/[^/]+\/[^/]+$/;
  if (!m.test(p) && !P.test(p) || w !== f.pathname)
    throw new Error("Недопустимый адрес файла модели.");
  const I = w.slice(0, w.lastIndexOf("/") + 1), c = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Map(), E = (R) => (c.add(R), R), _ = (R) => {
    if (R.startsWith("blob:")) {
      if (!c.has(R))
        throw new Error("Чужой Blob URL модели.");
      return R;
    }
    if (R.startsWith("data:"))
      return At(R), S.get(R) || R;
    if (/^[a-z][a-z\d+.-]*:/i.test(R) || R.startsWith("//"))
      throw new Error("Внешние ресурсы модели запрещены. Сохраните самостоятельный GLB.");
    let C = R;
    if (R.startsWith("/")) {
      if (!R.startsWith(I))
        throw new Error("Ресурс из чужой папки API.");
      C = R.slice(I.length);
    }
    const b = I + Ht(C).join("/");
    if (!/\.(?:bin|png|jpe?g|webp|glb|gltf|fbx|obj|stl|splat)$/i.test(b))
      throw new Error("Ресурс этого формата не поддержан (KTX2/Draco требуют другого декодера).");
    return S.get(b) || b;
  };
  return {
    ownApiPrefix: u,
    source: w,
    directory: I,
    resolve: _,
    registerBlob: E,
    replace: (R, C) => {
      S.set(_(R), E(C));
    },
    dispose: () => {
      for (const R of c)
        URL.revokeObjectURL(R);
      c.clear(), S.clear();
    }
  };
}
async function Va(e, u, l = yt, d) {
  var c;
  const a = await fetch(e, {
    credentials: "same-origin",
    signal: u,
    redirect: "error"
  });
  if (!a.ok)
    throw new Error(`Файл модели: HTTP ${a.status}`);
  const f = Number(a.headers.get("Content-Length")), y = f > 0 && Number.isFinite(f) ? f : null;
  if (y && y > l)
    throw new Error("Файл превышает допустимый размер просмотра.");
  const w = (c = a.body) == null ? void 0 : c.getReader();
  if (!w)
    throw new Error("Поток файла модели отсутствует.");
  const p = [];
  let m = 0;
  try {
    for (; ; ) {
      const S = await w.read();
      if (S.done)
        break;
      if (m += S.value.byteLength, m > l || p.length >= 65536)
        throw new Error("Файл превышает допустимый размер просмотра.");
      p.push(S.value), d == null || d(m, y);
    }
  } finally {
    await w.cancel().catch(() => {
    }), w.releaseLock();
  }
  if (y !== null && y !== m)
    throw new Error("Файл скачан не полностью.");
  const P = new Uint8Array(m);
  let I = 0;
  for (const S of p)
    P.set(S, I), I += S.length;
  return P;
}
function Sa(e, u) {
  var E;
  const l = {
    memory: 0,
    compressed: [],
    images: [],
    references: []
  }, d = new TextDecoder().decode(e.subarray(0, 20)).startsWith("Kaydara FBX Binary"), a = (_) => {
    if (/(?:blob:|https?:\/\/|file:\/\/)/i.test(_))
      throw new Error("Внешние URI в FBX запрещены. Сохраните самостоятельный GLB.");
  };
  if (!d) {
    const _ = new TextDecoder("utf-8", { fatal: !0 }).decode(e);
    a(_);
    for (const R of _.split(`
`))
      if ((((E = /^\t+/.exec(R)) == null ? void 0 : E[0].length) || 0) > 256)
        throw new Error("Глубина FBX превышает 256.");
    for (const R of _.matchAll(/\*([0-9]+)\s*\{/g))
      l.memory += Number(R[1]) * 24;
    for (const R of _.matchAll(/Content:\s*,?\s*"([A-Za-z0-9+/=]+)"/g))
      l.images.push(At(`data:image/png;base64,${R[1]}`).bytes);
    for (const R of _.matchAll(/(?:RelativeFilename|FileName|Filename):\s*"([^"\n]+)"/g))
      l.images.length || (u.resolve(R[1]), l.references.push(R[1]));
    if (l.memory = Math.max(l.memory, e.length * 8), l.memory > Ct / 2)
      throw new Error("Слишком большой объём FBX.");
    return l;
  }
  const f = new DataView(e.buffer, e.byteOffset, e.byteLength), y = e.length >= 27 && f.getUint32(23, !0) >= 7500, w = y ? 25 : 13, p = [];
  let m = 27, P = 0, I = 0;
  const c = (_) => y ? Number(f.getBigUint64(_, !0)) : f.getUint32(_, !0), S = (_, R) => {
    if (!Number.isSafeInteger(_) || _ < 0 || m + _ > R || R > e.length)
      throw new Error("Повреждённые границы FBX.");
  };
  for (; m + w <= e.length; ) {
    for (; p.length && m === p.at(-1); )
      p.pop();
    const _ = c(m);
    if (_ === 0) {
      if (m += w, !p.length)
        break;
      if (m !== p.pop())
        throw new Error("Некорректный конец node FBX.");
      continue;
    }
    const R = c(m + (y ? 8 : 4)), C = c(m + (y ? 16 : 8)), b = e[m + w - 1];
    if (I += R, P += 1, !Number.isSafeInteger(_) || _ > (p.at(-1) ?? e.length) || _ <= m || R > 1e5 || I > 1e6 || P > 1e5 || p.length >= 256)
      throw new Error("Слишком сложный или повреждённый FBX.");
    m += w, S(b + C, _);
    const o = new TextDecoder().decode(e.subarray(m, m + b));
    m += b;
    const v = m + C;
    for (let r = 0; r < R; r += 1) {
      S(1, v);
      const n = String.fromCharCode(e[m++]), g = {
        Y: 2,
        C: 1,
        I: 4,
        F: 4,
        D: 8,
        L: 8
      }[n];
      if (g) {
        S(g, v), m += g;
        continue;
      }
      if (n === "S" || n === "R") {
        S(4, v);
        const ee = f.getUint32(m, !0);
        m += 4, S(ee, v);
        const ae = e.subarray(m, m + ee);
        if (n === "S") {
          if (ee > 128 * 1024)
            throw new Error("Слишком длинная строка FBX.");
          const ne = new TextDecoder().decode(ae);
          a(ne), ["FileName", "Filename", "RelativeFilename"].includes(o) && ne && l.references.push(ne);
        } else o === "Content" && ee && l.images.push(ae);
        m += ee;
        continue;
      }
      const h = {
        f: 4,
        d: 8,
        i: 4,
        l: 8,
        b: 1,
        c: 1
      }[n];
      if (!h)
        throw new Error("Неизвестное свойство FBX.");
      S(12, v);
      const M = f.getUint32(m, !0), B = f.getUint32(m + 4, !0), T = f.getUint32(m + 8, !0), le = M * h;
      if (m += 12, l.memory += M * 24, S(T, v), B > 1 || le > 64 * 1024 * 1024 || l.memory > Ct / 2 || B === 0 && T !== le)
        throw new Error("Слишком большой или повреждённый массив FBX.");
      B === 1 && l.compressed.push({ bytes: e.subarray(m, m + T), length: le }), m += T;
    }
    if (m !== v)
      throw new Error("Неверная длина properties FBX.");
    m < _ && p.push(_);
  }
  if (!P || p.length)
    throw new Error("FBX обрезан.");
  if (l.images.length)
    l.references = [];
  else {
    l.references = [...new Set(l.references)];
    for (const _ of l.references)
      u.resolve(_);
  }
  return l;
}
async function Ca(e, u) {
  for (const l of e.compressed) {
    const f = new Blob([l.bytes]).stream().pipeThrough(new DecompressionStream("deflate")).getReader();
    let y = 0;
    try {
      for (; ; ) {
        u.throwIfAborted();
        const w = await f.read();
        if (w.done)
          break;
        if (y += w.value.length, y > l.length)
          throw new Error("Распакованный массив FBX превышает заявленную длину.");
      }
      if (y !== l.length)
        throw new Error("Неверная распакованная длина FBX.");
    } finally {
      await f.cancel().catch(() => {
      }), f.releaseLock();
    }
  }
}
function gt(e) {
  if (e.byteLength > Rt || e.byteLength < 16)
    throw new Error("Изображение модели слишком большое или повреждено.");
  const u = new DataView(e.buffer, e.byteOffset, e.byteLength);
  let l = 0, d = 0;
  if (u.getUint32(0) === 2303741511 && e.byteLength >= 24)
    l = u.getUint32(16), d = u.getUint32(20);
  else if (u.getUint16(0) === 65496) {
    let a = 2;
    for (; a + 9 < e.byteLength && a < 1024 * 1024; ) {
      if (e[a++] !== 255)
        throw new Error("Некорректный JPEG модели.");
      for (; e[a] === 255; )
        a += 1;
      const f = e[a++];
      if (f === 217 || f === 218)
        break;
      if (f === 1 || f >= 208 && f <= 215)
        continue;
      const y = u.getUint16(a);
      if (y < 2 || a + y > e.byteLength)
        throw new Error("Некорректный JPEG модели.");
      if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(f)) {
        d = u.getUint16(a + 3), l = u.getUint16(a + 5);
        break;
      }
      a += y;
    }
  } else if (u.getUint32(0) === 1380533830 && u.getUint32(8) === 1464156752) {
    const a = new TextDecoder().decode(e.subarray(12, 16));
    if (a === "VP8X" && e.length >= 30)
      l = 1 + e[24] + e[25] * 256 + e[26] * 65536, d = 1 + e[27] + e[28] * 256 + e[29] * 65536;
    else if (a === "VP8L" && e.length >= 25 && e[20] === 47) {
      const f = u.getUint32(21, !0);
      l = 1 + (f & 16383), d = 1 + (f >>> 14 & 16383);
    } else a === "VP8 " && e.length >= 30 && (l = u.getUint16(26, !0) & 16383, d = u.getUint16(28, !0) & 16383);
  }
  if (!l || !d || l * d > 64e6)
    throw new Error("Изображение модели превышает 64 Мп или имеет неподдержанный заголовок.");
  return l * d * 8;
}
function Ua(e) {
  const u = new Uint8Array(e.length), l = new Uint16Array(e.length);
  for (let d = 0; d < e.length; d += 1) {
    const a = [{ id: d, next: 0 }];
    for (; a.length; ) {
      const f = a.at(-1), y = e[f.id];
      if (!y || !Array.isArray(y.children || []))
        throw new Error("Некорректный узел модели.");
      if (u[f.id] === 2) {
        a.pop();
        continue;
      }
      u[f.id] = 1;
      const w = y.children || [];
      if (f.next < w.length) {
        const p = w[f.next++];
        if (!Number.isSafeInteger(p) || p < 0 || p >= e.length)
          throw new Error("Некорректная ссылка узла модели.");
        if (u[p] === 1)
          throw new Error("Цикл узлов модели.");
        if (a.length >= 256 || l[p] + a.length > 256)
          throw new Error("Глубина модели превышает 256.");
        a.push({ id: p, next: 0 });
      } else {
        let p = 1;
        for (const m of w)
          p = Math.max(p, l[m] + 1);
        l[f.id] = p, u[f.id] = 2, a.pop();
      }
    }
  }
}
function _a(e, u, l) {
  var m, P, I, c, S;
  if (typeof ((m = e.asset) == null ? void 0 : m.version) != "string" || !e.asset.version.startsWith("2."))
    throw new Error("Поддерживается только glTF2.");
  const d = [{ value: e, depth: 0 }];
  let a = 0;
  for (; d.length; ) {
    const { value: E, depth: _ } = d.pop();
    if (_ > 256 || ++a > 1e5)
      throw new Error("Слишком сложный JSON модели.");
    if (!(!E || typeof E != "object"))
      for (const [R, C] of Object.entries(E)) {
        if (R === "KHR_draco_mesh_compression" || R === "KHR_texture_basisu")
          throw new Error("Draco и KTX2 не поддержаны. Сохраните GLB без этих расширений.");
        R === "uri" && typeof C == "string" && l.resolve(C), d.push({ value: C, depth: _ + 1 });
      }
  }
  for (const E of [...e.extensionsUsed || [], ...e.extensionsRequired || []])
    if (["KHR_draco_mesh_compression", "KHR_texture_basisu"].includes(E))
      throw new Error("Draco и KTX2 не поддержаны.");
  if ((((P = e.nodes) == null ? void 0 : P.length) || 0) > 1e5)
    throw new Error("Слишком много узлов модели.");
  Ua(e.nodes || []);
  let f = 0;
  const y = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  };
  for (const E of e.accessors || []) {
    if (!Number.isSafeInteger(E.count) || E.count < 0 || E.count > 16e6 || !y[E.type])
      throw new Error("Некорректный accessor модели.");
    if (f += E.count * y[E.type] * 8, f > Ct / 2)
      throw new Error("Слишком большой объём геометрии модели.");
  }
  for (const E of e.bufferViews || []) {
    const _ = (I = E.extensions) == null ? void 0 : I.EXT_meshopt_compression;
    if (_ && (!Number.isSafeInteger(_.count) || !Number.isSafeInteger(_.byteStride) || _.count < 0 || _.byteStride < 1 || _.byteStride > 256 || _.count * _.byteStride > yt))
      throw new Error("Слишком большой meshopt buffer.");
  }
  const w = [
    ...(e.buffers || []).filter((E) => E.uri).map((E) => ({ uri: E.uri, image: !1 })),
    ...(e.images || []).filter((E) => E.uri).map((E) => ({ uri: E.uri, image: !0 }))
  ];
  if (w.length > 256)
    throw new Error("Слишком много внешних ресурсов модели.");
  const p = [];
  for (const E of e.images || [])
    if ((c = E.uri) != null && c.startsWith("data:") && (f += gt(At(E.uri).bytes)), E.bufferView !== void 0 && u) {
      const _ = (S = e.bufferViews) == null ? void 0 : S[E.bufferView];
      if (!_ || _.buffer !== 0 || _.byteLength > Rt || (_.byteOffset || 0) + _.byteLength > u.length)
        throw new Error("Некорректная встроенная картинка.");
      const R = u.subarray(_.byteOffset || 0, (_.byteOffset || 0) + _.byteLength);
      f += gt(R), p.push(R);
    }
  return {
    json: e,
    binary: u,
    references: w,
    embeddedImages: p,
    decodedMemory: f
  };
}
function Gi(e, u, l) {
  if (e.byteLength > yt)
    throw new Error("Модель превышает 150 МиБ.");
  let d = null, a = null;
  if (u === "glb") {
    const f = new DataView(e.buffer, e.byteOffset, e.byteLength);
    if (e.length < 20 || f.getUint32(0, !0) !== 1179937895 || f.getUint32(4, !0) !== 2 || f.getUint32(8, !0) !== e.length || f.getUint32(16, !0) !== 1313821514)
      throw new Error("Повреждённый GLB.");
    const y = f.getUint32(12, !0);
    if (y > 16 * 1024 * 1024 || 20 + y > e.length)
      throw new Error("Слишком большой или повреждённый JSON GLB.");
    if (d = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e.subarray(20, 20 + y))), 20 + y + 8 <= e.length) {
      const w = f.getUint32(20 + y, !0);
      if (f.getUint32(24 + y, !0) !== 5130562 || 28 + y + w !== e.length)
        throw new Error("Повреждённый бинарный чанк GLB.");
      a = e.subarray(28 + y);
    }
  } else if (u === "gltf") {
    if (e.length > 16 * 1024 * 1024)
      throw new Error("Слишком большой JSON glTF.");
    d = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
  }
  if (d)
    return _a(d, a, l);
  if (u === "fbx") {
    const f = Sa(e, l);
    let y = f.memory;
    for (const w of f.images)
      y += gt(w);
    return {
      json: null,
      binary: null,
      references: f.references.map((w) => ({ uri: w, image: !0 })),
      embeddedImages: f.images,
      decodedMemory: y,
      fbx: f
    };
  }
  return {
    json: null,
    binary: null,
    references: [],
    embeddedImages: [],
    decodedMemory: u === "splat" ? Math.floor(e.length / 32) * 64 : e.length * 8
  };
}
async function Hi(e, u, l, d = () => {
}) {
  let a = 0;
  const f = /* @__PURE__ */ new Set();
  e.fbx && await Ca(e.fbx, l);
  for (const y of e.references) {
    if (f.has(y.uri))
      continue;
    f.add(y.uri);
    const w = u.resolve(y.uri), p = (c) => d((a + c) * 2 + e.decodedMemory), m = y.uri.startsWith("data:") ? At(y.uri) : {
      bytes: await Va(w, l, y.image ? Rt : yt, p),
      mime: ""
    };
    if (a += m.bytes.byteLength, a > Ct / 2)
      throw new Error("Слишком большой общий объём соседей модели.");
    y.image && (e.decodedMemory += gt(m.bytes)), d(a * 2 + e.decodedMemory);
    const P = m.mime || (y.image ? /\.webp$/i.test(y.uri) ? "image/webp" : /\.jpe?g$/i.test(y.uri) ? "image/jpeg" : "image/png" : "application/octet-stream"), I = URL.createObjectURL(new Blob([m.bytes], { type: P }));
    u.replace(y.uri, I);
  }
  return a;
}
const Ea = 20 * 1024 * 1024;
async function nl(e) {
  var P;
  if (e.size > Ea)
    throw new Error("Картинка должна быть до 20 МиБ.");
  const u = new Uint8Array(await e.slice(0, 16).arrayBuffer()), l = [137, 80, 78, 71, 13, 10, 26, 10].every((I, c) => u[c] === I), d = u[0] === 255 && u[1] === 216 && u[2] === 255, a = new TextDecoder().decode(u.slice(0, 4)) === "RIFF" && new TextDecoder().decode(u.slice(8, 12)) === "WEBP", f = l ? "image/png" : d ? "image/jpeg" : a ? "image/webp" : "", y = (P = e.name.split(".").at(-1)) == null ? void 0 : P.toLowerCase(), w = f === "image/png" ? y === "png" : f === "image/jpeg" ? ["jpg", "jpeg"].includes(y ?? "") : f === "image/webp" && y === "webp";
  if (!f || !w || e.type && e.type !== f)
    throw new Error("Поддержаны настоящие PNG, JPEG и WebP с соответствующим расширением.");
  const p = e.type ? e : new File([e], e.name, { type: f });
  gt(new Uint8Array(await p.slice(0, 1024 * 1024).arrayBuffer()));
  const m = await createImageBitmap(p);
  if (!m.width || !m.height || m.width * m.height > 64 * 1024 * 1024)
    throw m.close(), new Error("Картинка должна содержать не больше 64 мегапикселей.");
  return { file: p, bitmap: m };
}
function Ma(e, u = "image/png") {
  return new Promise((l, d) => {
    e.toBlob((a) => a ? l(a) : d(new Error("Не удалось сохранить картинку.")), u);
  });
}
function Oa(e) {
  const { error: u, isAlive: l } = e, d = e.readImage ?? nl, a = O(null), f = O(""), y = O(""), w = O(null), p = O(""), m = O([]), P = Ze({
    front: null,
    left: null,
    back: null,
    right: null
  }), I = O(!1);
  let c = 0, S = /* @__PURE__ */ new WeakMap();
  function E(g) {
    let h = S.get(g);
    return h || (h = e.upload(g), S.set(g, h), h.catch(() => S.delete(g))), h;
  }
  function _() {
    c += 1, a.value = null, y.value = "", f.value && (URL.revokeObjectURL(f.value), f.value = "");
  }
  function R() {
    c += 1, w.value = null, p.value = "";
  }
  async function C(g) {
    if (!g)
      return;
    _();
    const h = c, M = _e(e);
    I.value = !0, u.value = "";
    try {
      const { file: B, bitmap: T } = await d(g);
      if (T.close(), !M() || !l() || h !== c)
        return;
      const le = await E(B);
      M() && l() && h === c && (a.value = le, f.value = URL.createObjectURL(B), y.value = g.name);
    } catch (B) {
      M() && l() && h === c && (u.value = $e(B));
    } finally {
      M() && l() && h === c && (I.value = !1);
    }
  }
  async function b(g) {
    var T;
    if (!g)
      return;
    w.value = null, p.value = "", u.value = "";
    const h = ++c, M = _e(e);
    I.value = !1;
    const B = (T = g.name.split(".").at(-1)) == null ? void 0 : T.toLowerCase();
    if (B === "gltf") {
      u.value = "Для импорта .gltf сохраните самостоятельный .glb.";
      return;
    }
    if (!["glb", "fbx", "obj", "stl", "splat"].includes(B ?? "") || g.size > 150 * 1024 * 1024) {
      u.value = "Поддержаны GLB, FBX, OBJ, STL, splat до 150 МиБ.";
      return;
    }
    I.value = !0;
    try {
      const le = await E(g);
      M() && l() && h === c && (w.value = le, p.value = g.name, u.value = "");
    } catch (le) {
      M() && l() && h === c && (u.value = $e(le));
    } finally {
      M() && l() && h === c && (I.value = !1);
    }
  }
  async function o(g) {
    const h = ++c, M = _e(e);
    I.value = !0, m.value = [];
    try {
      const B = await Promise.all(Object.entries(g).filter(([, T]) => T).map(async ([T, le]) => ({ role: T, uploadId: (await E(le)).uploadId })));
      M() && l() && h === c && (m.value = B);
    } catch (B) {
      M() && l() && h === c && (u.value = $e(B));
    } finally {
      M() && l() && h === c && (I.value = !1);
    }
  }
  function v() {
    c += 1, S = /* @__PURE__ */ new WeakMap(), a.value = null, w.value = null, m.value = [];
  }
  function r() {
    _();
  }
  function n() {
    c += 1, S = /* @__PURE__ */ new WeakMap(), I.value = !1;
  }
  return {
    rebindContext: n,
    primaryUpload: a,
    primaryPreview: f,
    primaryName: y,
    ownUpload: w,
    ownName: p,
    viewUploads: m,
    viewFiles: P,
    uploading: I,
    choosePrimary: C,
    chooseOwnFile: b,
    clearPrimary: _,
    clearOwn: R,
    uploadViews: o,
    resetForLibrary: v,
    dispose: r
  };
}
const Pa = { class: "studio-operation-form" }, Ra = ["value"], Aa = {
  key: 5,
  class: "studio-choices"
}, La = { key: 0 }, ja = {
  key: 6,
  class: "studio-view-prompts"
}, Ba = /* @__PURE__ */ Ue({
  __name: "OperationForm",
  props: /* @__PURE__ */ Dl({
    fields: {},
    errors: { default: () => [] }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const u = e, l = Il(e, "modelValue"), d = O(!1), a = `studio-advanced-${bt()}`, f = O({}), y = [
      { id: "front", label: "Спереди" },
      { id: "left", label: "Слева" },
      { id: "back", label: "Сзади" },
      { id: "right", label: "Справа" }
    ];
    function w(C) {
      return (C.visibleWhen ?? []).every((b) => {
        const o = l.value[b.field];
        return (!b.is || b.is.some((v) => Object.is(v, o))) && (!b.not || !b.not.some((v) => Object.is(v, o)));
      });
    }
    function p(C, b) {
      l.value = { ...l.value, [C]: b };
    }
    const m = (C) => typeof l.value[C] == "string" ? String(l.value[C]) : "", P = (C) => typeof l.value[C] == "number" ? l.value[C] : "", I = (C) => {
      var b;
      return (b = u.errors.find((o) => o.field === C)) == null ? void 0 : b.message;
    }, c = (C) => Array.isArray(l.value[C]) ? l.value[C].filter((b) => typeof b == "string") : [], S = (C, b) => p(
      C,
      Array.isArray(b) ? b.filter((o) => typeof o == "string") : []
    );
    function E(C) {
      const b = (f.value[C.id] ?? "").trim().toLocaleLowerCase("ru"), o = /* @__PURE__ */ new Map();
      for (const v of C.options ?? []) {
        if (b && !v.label.toLocaleLowerCase("ru").includes(b))
          continue;
        const r = v.group ?? "", n = o.get(r) ?? [];
        n.push({
          value: v.value,
          label: v.label,
          description: v.hint ?? void 0
        }), o.set(r, n);
      }
      return [...o].map(([v, r]) => ({ label: v, options: r }));
    }
    function _(C, b) {
      var v;
      const o = l.value[C];
      return Array.isArray(o) ? ((v = o.find((r) => typeof r == "object" && (r == null ? void 0 : r.view) === b)) == null ? void 0 : v.prompt) ?? "" : "";
    }
    function R(C, b, o) {
      p(C, y.map((v) => ({ view: v.id, prompt: v.id === b ? o : _(C, v.id) })).filter((v) => v.prompt.trim()));
    }
    return re(() => u.errors, (C) => {
      C.some((b) => u.fields.some((o) => o.id === b.field && o.advanced)) && (d.value = !0);
    }, { immediate: !0, deep: !0 }), (C, b) => (i(), V("div", Pa, [
      s("div", {
        id: a,
        class: "studio-operation-fields"
      }, [
        (i(!0), V(Y, null, ie(e.fields, (o) => (i(), V(Y, {
          key: o.id
        }, [
          w(o) && (!o.advanced || d.value) ? (i(), D(t(de), {
            key: 0,
            label: o.kind === "toggle" ? void 0 : o.label,
            class: We({
              "studio-field-wide": ["text", "textarea", "multiselect", "view-prompts"].includes(o.kind),
              "studio-field-toggle": o.kind === "toggle"
            }),
            hint: o.hint ?? void 0,
            required: !!o.required,
            error: I(o.id)
          }, {
            default: k(() => {
              var v;
              return [
                o.kind === "text" ? (i(), D(t(st), {
                  key: 0,
                  "model-value": m(o.id),
                  maxlength: o.maxLength ?? void 0,
                  "onUpdate:modelValue": (r) => p(o.id, r)
                }, null, 8, ["model-value", "maxlength", "onUpdate:modelValue"])) : o.kind === "textarea" ? (i(), D(t(cl), {
                  key: 1,
                  "model-value": m(o.id),
                  maxlength: o.maxLength ?? void 0,
                  "onUpdate:modelValue": (r) => p(o.id, r)
                }, null, 8, ["model-value", "maxlength", "onUpdate:modelValue"])) : o.kind === "number" ? (i(), D(t(tt), {
                  key: 2,
                  "model-value": P(o.id),
                  min: o.min ?? void 0,
                  max: o.max ?? void 0,
                  step: o.step ?? 1,
                  "onUpdate:modelValue": (r) => p(o.id, r === "" ? null : r)
                }, null, 8, ["model-value", "min", "max", "step", "onUpdate:modelValue"])) : o.kind === "select" ? (i(), D(t(xe), {
                  key: 3,
                  "model-value": m(o.id),
                  "onUpdate:modelValue": (r) => p(o.id, r)
                }, {
                  default: k(() => [
                    (i(!0), V(Y, null, ie(o.options ?? [], (r) => (i(), V("option", {
                      key: r.value,
                      value: r.value
                    }, $(r.label), 9, Ra))), 128))
                  ]),
                  _: 2
                }, 1032, ["model-value", "onUpdate:modelValue"])) : o.kind === "toggle" ? (i(), D(t(Wt), {
                  key: 4,
                  "model-value": !!l.value[o.id],
                  "onUpdate:modelValue": (r) => p(o.id, r)
                }, {
                  default: k(() => [
                    q($(o.label), 1)
                  ]),
                  _: 2
                }, 1032, ["model-value", "onUpdate:modelValue"])) : o.kind === "multiselect" ? (i(), V("div", Aa, [
                  (((v = o.options) == null ? void 0 : v.length) ?? 0) > 20 ? (i(), D(t(Ul), {
                    key: 0,
                    modelValue: f.value[o.id],
                    "onUpdate:modelValue": (r) => f.value[o.id] = r,
                    label: "Поиск вариантов"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : A("", !0),
                  (i(!0), V(Y, null, ie(E(o), (r) => (i(), V("div", {
                    key: r.label,
                    class: "studio-choice-group"
                  }, [
                    r.label ? (i(), V("h5", La, $(r.label), 1)) : A("", !0),
                    U(t(Yl), {
                      "model-value": c(o.id),
                      options: r.options,
                      mode: "multiple",
                      label: r.label || o.label,
                      "onUpdate:modelValue": (n) => S(o.id, n)
                    }, null, 8, ["model-value", "options", "label", "onUpdate:modelValue"])
                  ]))), 128))
                ])) : o.kind === "view-prompts" ? (i(), V("div", ja, [
                  (i(), V(Y, null, ie(y, (r) => U(t(de), {
                    key: r.id,
                    label: r.label
                  }, {
                    default: k(() => [
                      U(t(cl), {
                        "model-value": _(o.id, r.id),
                        "onUpdate:modelValue": (n) => R(o.id, r.id, String(n))
                      }, null, 8, ["model-value", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"])), 64))
                ])) : A("", !0)
              ];
            }),
            _: 2
          }, 1032, ["label", "class", "hint", "required", "error"])) : A("", !0)
        ], 64))), 128))
      ]),
      e.fields.some((o) => o.advanced) ? (i(), D(t(ft), {
        key: 0,
        open: d.value,
        "onUpdate:open": b[0] || (b[0] = (o) => d.value = o),
        controls: a
      }, {
        default: k(() => [...b[1] || (b[1] = [
          q("Дополнительные параметры", -1)
        ])]),
        _: 1
      }, 8, ["open"])) : A("", !0)
    ]));
  }
}), Oe = (e, u) => {
  const l = e.__vccOpts || e;
  for (const [d, a] of u)
    l[d] = a;
  return l;
}, Kt = /* @__PURE__ */ Oe(Ba, [["__scopeId", "data-v-b8b9f563"]]), Fa = {
  key: 0,
  class: "studio-price-summary",
  "aria-live": "polite"
}, qa = { class: "studio-price-line" }, Ta = { key: 0 }, Na = { key: 1 }, Da = {
  key: 1,
  class: "studio-price-reason",
  role: "status"
}, za = /* @__PURE__ */ Ue({
  __name: "PriceButton",
  props: {
    quote: {},
    validation: { default: null },
    balance: { default: null },
    billingUrl: { default: null },
    verb: { default: "Создать" },
    fingerprint: {},
    busy: { type: Boolean, default: !1 },
    layout: { default: "default" },
    disabledReason: { default: null },
    execute: {}
  },
  emits: ["run", "priceChanged", "refresh"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = O(!1), f = O("");
    let y = null;
    const w = G(() => a.value ? "Отправка…" : "Загрузка…"), p = G(() => {
      var I, c;
      return ((I = l.quote) == null ? void 0 : I.total) !== null && ((c = l.quote) == null ? void 0 : c.total) !== void 0 && l.balance !== null && l.quote.total > l.balance;
    }), m = G(() => {
      var I;
      return l.disabledReason ? l.disabledReason : (I = l.validation) != null && I.errors.length ? l.validation.errors[0].message : l.quote ? l.quote.total === null || l.quote.total > 0 && !l.quote.unit ? "Цена пока не опубликована" : l.quote.total > 0 && l.balance === null ? "Не удалось проверить баланс" : p.value ? `Не хватает ${Ae(l.quote.total - (l.balance ?? 0), l.quote.unit)}` : "" : "Расчёт цены…";
    });
    async function P() {
      if (a.value || l.busy || m.value)
        return;
      a.value = !0, f.value = "", y ?? (y = crypto.randomUUID());
      const I = l.fingerprint;
      d("run", y);
      try {
        const c = await l.execute(y);
        if (I !== l.fingerprint)
          return;
        y = null, c && typeof c == "object" && "priceChanged" in c && d("priceChanged", c.priceChanged);
      } catch (c) {
        I === l.fingerprint && (f.value = $e(c));
      } finally {
        a.value = !1;
      }
    }
    return re(() => l.fingerprint, () => {
      y = null, f.value = "";
    }), (I, c) => {
      var S;
      return i(), V("div", {
        class: We(["studio-price-control", { "studio-price-footer": e.layout === "footer" }])
      }, [
        e.layout === "footer" ? (i(), V("div", Fa, [
          c[1] || (c[1] = s("span", null, "Стоимость по расчёту", -1)),
          s("strong", null, $(e.quote ? t(Ae)(e.quote.total, e.quote.unit) : "Расчёт…"), 1)
        ])) : A("", !0),
        s("div", qa, [
          U(t(te), {
            "data-context": "studio-price",
            tone: "accent",
            variant: "solid",
            disabled: !!m.value,
            loading: a.value || e.busy,
            "loading-label": w.value,
            onClick: P
          }, {
            default: k(() => [
              q($(a.value || e.busy ? w.value : e.layout === "footer" ? e.verb : `${e.verb} — ${e.quote ? t(Ae)(e.quote.total, e.quote.unit) : "расчёт цены…"}`), 1)
            ]),
            _: 1
          }, 8, ["disabled", "loading", "loading-label"]),
          e.quote ? (i(), D(t(Zl), {
            key: 0,
            label: "Раскладка цены",
            "trigger-label": "i"
          }, {
            default: k(() => [
              (i(!0), V(Y, null, ie(e.quote.lines, (E, _) => (i(), V("p", { key: _ }, $(E.label) + " — " + $(t(Ae)(E.amount, e.quote.unit)), 1))), 128)),
              e.quote.usd !== null ? (i(), V("p", Ta, "≈ $" + $(e.quote.usd.toFixed(2).replace(".", ",")), 1)) : A("", !0),
              e.quote.note ? (i(), V("p", Na, $(e.quote.note), 1)) : A("", !0)
            ]),
            _: 1
          })) : A("", !0)
        ]),
        m.value && e.layout === "footer" ? (i(), V("p", Da, $(m.value), 1)) : m.value ? (i(), D(t(ce), {
          key: 2,
          tone: "warning"
        }, {
          default: k(() => [
            q($(m.value), 1)
          ]),
          _: 1
        })) : A("", !0),
        p.value && e.billingUrl ? (i(), D(t(el), {
          key: 3,
          href: e.billingUrl,
          target: "_blank",
          rel: "noopener"
        }, {
          default: k(() => [...c[2] || (c[2] = [
            q("Пополнить", -1)
          ])]),
          _: 1
        }, 8, ["href"])) : A("", !0),
        (S = e.quote) != null && S.total && e.balance === null ? (i(), D(t(te), {
          key: 4,
          variant: "ghost",
          onClick: c[0] || (c[0] = (E) => I.$emit("refresh"))
        }, {
          default: k(() => [...c[3] || (c[3] = [
            q("Обновить баланс", -1)
          ])]),
          _: 1
        })) : A("", !0),
        f.value ? (i(), D(t(ce), {
          key: 5,
          tone: "danger"
        }, {
          default: k(() => [
            q($(f.value), 1)
          ]),
          _: 1
        })) : A("", !0)
      ], 2);
    };
  }
}), ol = /* @__PURE__ */ Oe(za, [["__scopeId", "data-v-e2d43873"]]), Wa = { class: "studio-view-slots" }, Ja = ["onDrop", "onPaste"], Xa = { class: "studio-view-image" }, Ga = ["src", "alt"], Ha = { class: "studio-view-actions" }, Ka = /* @__PURE__ */ Ue({
  __name: "ViewSlots",
  props: {
    modelValue: { required: !0 },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(e) {
    const u = Il(e, "modelValue"), l = [
      { id: "front", label: "Спереди" },
      { id: "left", label: "Слева" },
      { id: "back", label: "Сзади" },
      { id: "right", label: "Справа" }
    ], d = O({}), a = O([
      { label: "Макушка", at: 15 },
      { label: "Глаза", at: 30 },
      { label: "Подбородок", at: 45 }
    ]), f = O(""), y = /* @__PURE__ */ new Map();
    let w = null;
    const p = G(() => !u.value.front || Object.values(u.value).filter(Boolean).length < 2 ? "Нужен вид спереди и хотя бы ещё один вид." : "");
    async function m(o, v) {
      if (!v)
        return;
      const r = (y.get(o) ?? 0) + 1;
      y.set(o, r);
      try {
        const { file: n, bitmap: g } = await nl(v);
        if (g.close(), y.get(o) !== r)
          return;
        u.value = { ...u.value, [o]: n }, f.value = "";
      } catch (n) {
        y.get(o) === r && (f.value = $e(n));
      }
    }
    function P(o, v) {
      var r;
      m(o, (r = v.dataTransfer) == null ? void 0 : r.files[0]);
    }
    function I(o, v) {
      var n, g;
      const r = (g = [...((n = v.clipboardData) == null ? void 0 : n.items) ?? []].find((h) => h.kind === "file")) == null ? void 0 : g.getAsFile();
      r && (v.preventDefault(), m(o, r));
    }
    function c(o) {
      y.set(o, (y.get(o) ?? 0) + 1), u.value = { ...u.value, [o]: null };
    }
    function S(o, v) {
      y.set(o, (y.get(o) ?? 0) + 1), y.set(v, (y.get(v) ?? 0) + 1), u.value = {
        ...u.value,
        [o]: u.value[v],
        [v]: u.value[o]
      };
    }
    function E(o, v) {
      const r = a.value[o];
      r && Number.isFinite(v) && (r.at = Math.max(0, Math.min(100, v)));
    }
    function _(o, v) {
      const r = v.currentTarget, n = r.parentElement.getBoundingClientRect();
      w = {
        index: o,
        top: n.top,
        height: n.height
      }, r.setPointerCapture(v.pointerId), v.preventDefault(), R(v);
    }
    function R(o) {
      w && w.height > 0 && E(w.index, Math.round((o.clientY - w.top) / w.height * 100));
    }
    function C() {
      w = null;
    }
    function b(o, v) {
      const r = a.value[o];
      if (!r)
        return;
      const n = v.shiftKey ? 5 : 1, g = {
        ArrowUp: r.at - n,
        ArrowDown: r.at + n,
        Home: 0,
        End: 100
      };
      g[v.key] !== void 0 && (v.preventDefault(), E(o, g[v.key]));
    }
    return re(u, (o) => {
      for (const v of Object.values(d.value)) v && URL.revokeObjectURL(v);
      d.value = Object.fromEntries(l.filter((v) => o[v.id]).map((v) => [v.id, URL.createObjectURL(o[v.id])]));
    }, { immediate: !0 }), Fe(() => {
      for (const o of l)
        y.set(o.id, -1);
      for (const o of Object.values(d.value)) o && URL.revokeObjectURL(o);
    }), (o, v) => (i(), V("div", Wa, [
      (i(), V(Y, null, ie(l, (r, n) => {
        var g;
        return s("div", {
          key: r.id,
          class: "studio-view-slot",
          onDragover: v[1] || (v[1] = Dt(() => {
          }, ["prevent"])),
          onDrop: Dt((h) => P(r.id, h), ["prevent"]),
          onPaste: (h) => I(r.id, h)
        }, [
          s("h4", null, $(r.label), 1),
          s("div", Xa, [
            d.value[r.id] ? (i(), V("img", {
              key: 0,
              src: d.value[r.id],
              alt: r.label
            }, null, 8, Ga)) : A("", !0),
            (i(!0), V(Y, null, ie(a.value, (h, M) => (i(), D(t(_t), {
              key: h.label,
              class: "studio-view-guide",
              "data-context": "studio-guide",
              role: "slider",
              "aria-label": h.label,
              "aria-valuenow": h.at,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              style: Qt({ top: `${h.at}%` }),
              onPointerdown: (B) => _(M, B),
              onPointermove: v[0] || (v[0] = (B) => R(B)),
              onPointerup: C,
              onPointercancel: C,
              onKeydown: (B) => b(M, B)
            }, {
              default: k(() => [
                q($(h.label), 1)
              ]),
              _: 2
            }, 1032, ["aria-label", "aria-valuenow", "style", "onPointerdown", "onKeydown"]))), 128))
          ]),
          (i(), D(t(It), {
            key: d.value[r.id] ?? r.id,
            accept: ".png,.jpg,.jpeg,.webp",
            label: ((g = u.value[r.id]) == null ? void 0 : g.name) ?? "Выбрать картинку",
            onChange: (h) => m(r.id, h[0])
          }, null, 8, ["label", "onChange"])),
          s("div", Ha, [
            U(t(te), {
              variant: "ghost",
              disabled: !u.value[r.id],
              onClick: (h) => c(r.id)
            }, {
              default: k(() => [...v[2] || (v[2] = [
                q("Очистить", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "onClick"]),
            U(t(te), {
              variant: "ghost",
              onClick: (h) => S(r.id, l[(n + 1) % l.length].id)
            }, {
              default: k(() => [...v[3] || (v[3] = [
                q("Поменять с соседним", -1)
              ])]),
              _: 1
            }, 8, ["onClick"])
          ])
        ], 40, Ja);
      }), 64)),
      p.value ? (i(), D(t(ce), {
        key: 0,
        class: "studio-view-message",
        tone: "warning"
      }, {
        default: k(() => [
          q($(p.value), 1)
        ]),
        _: 1
      })) : A("", !0),
      f.value ? (i(), D(t(ce), {
        key: 1,
        class: "studio-view-message",
        tone: "danger"
      }, {
        default: k(() => [
          q($(f.value), 1)
        ]),
        _: 1
      })) : A("", !0)
    ]));
  }
}), Qa = /* @__PURE__ */ Oe(Ka, [["__scopeId", "data-v-d98de978"]]);
function Ya(e, { threshold: u = 24, minGap: l = 0.01 } = {}) {
  const { width: d, height: a, data: f } = e;
  if (!Number.isInteger(d) || !Number.isInteger(a) || d < 1 || a < 1 || d > 65536 || a > 65536 || d * a > 64 * 1024 * 1024 || f.length !== d * a * 4 || !Number.isFinite(u) || u < 0 || !Number.isFinite(l) || l <= 0 || l > 1)
    throw new Error("Неверный размер или параметры листа изображений.");
  const y = [0, (d - 1) * 4, (a - 1) * d * 4, (d * a - 1) * 4], w = [0, 1, 2, 3].map((_) => y.reduce((R, C) => R + (f[C + _] ?? 0), 0) / 4), p = new Uint32Array(d), m = new Int32Array(d).fill(a), P = new Int32Array(d).fill(-1);
  for (let _ = 0; _ < a; _ += 1)
    for (let R = 0; R < d; R += 1) {
      const C = (_ * d + R) * 4;
      ((f[C + 3] ?? 0) <= 5 && w[3] <= 5 ? 0 : w.reduce((v, r, n) => v + Math.abs((f[C + n] ?? 0) - r), 0)) > u && (p[R] = p[R] + 1, m[R] = Math.min(m[R], _), P[R] = _);
    }
  const I = Math.max(1, Math.ceil(d * l)), c = [];
  let S = -1, E = -1;
  for (let _ = 0; _ < d; _ += 1)
    p[_] / a >= 5e-3 ? (S < 0 && (S = _), E = _) : S >= 0 && _ - E >= I && (c.push([S, E]), S = -1);
  return S >= 0 && c.push([S, E]), c.map(([_, R]) => {
    let C = a, b = -1;
    for (let g = _; g <= R; g += 1)
      C = Math.min(C, m[g]), b = Math.max(b, P[g]);
    const o = Math.max(1, Math.ceil((R - _ + 1) * 0.02)), v = Math.max(1, Math.ceil((b - C + 1) * 0.02)), r = Math.max(0, _ - o), n = Math.max(0, C - v);
    return {
      x: r,
      y: n,
      width: Math.min(d, R + o + 1) - r,
      height: Math.min(a, b + v + 1) - n
    };
  });
}
const Za = ["src"], en = { class: "studio-sheet-settings" }, tn = ["value"], ln = /* @__PURE__ */ Ue({
  __name: "SheetCutter",
  props: {
    open: { type: Boolean },
    file: {}
  },
  emits: ["close", "confirm"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Ze(null), f = O(""), y = O(24), w = O(1), p = O(!1), m = O(""), P = O([]), I = [
      { id: "front", label: "Спереди" },
      { id: "left", label: "Слева" },
      { id: "back", label: "Сзади" },
      { id: "right", label: "Справа" }
    ];
    let c = 0;
    const S = G(() => {
      const b = P.value.filter((o) => o.view);
      return b.length >= 2 && b.length <= 4 && b.some((o) => o.view === "front") && new Set(b.map((o) => o.view)).size === b.length && b.every((o) => {
        var v, r;
        return I.some((n) => n.id === o.view) && [o.x, o.y, o.width, o.height].every(Number.isFinite) && o.x >= 0 && o.y >= 0 && o.width >= 1 && o.height >= 1 && o.x + o.width <= (((v = a.value) == null ? void 0 : v.width) ?? 0) && o.y + o.height <= (((r = a.value) == null ? void 0 : r.height) ?? 0);
      });
    });
    function E() {
      var b;
      c += 1, (b = a.value) == null || b.close(), a.value = null, f.value && URL.revokeObjectURL(f.value), f.value = "", P.value = [], p.value = !1;
    }
    function _() {
      const b = a.value, o = document.createElement("canvas");
      if (b)
        try {
          o.width = b.width, o.height = b.height;
          const v = o.getContext("2d");
          if (!v)
            throw new Error("Canvas недоступен в этом браузере.");
          v.drawImage(b, 0, 0);
          const r = Ya(v.getImageData(0, 0, b.width, b.height), {
            threshold: Number(y.value),
            minGap: Number(w.value) / 100
          });
          if (o.width = 0, o.height = 0, r.length > 50)
            throw new Error("Найдено больше 50 областей. Задайте нужные виды вручную.");
          P.value = r.map((n, g) => {
            var h;
            return {
              ...n,
              id: crypto.randomUUID(),
              view: ((h = I[g]) == null ? void 0 : h.id) ?? ""
            };
          }), m.value = "";
        } catch (v) {
          m.value = $e(v);
        } finally {
          o.width = 0, o.height = 0;
        }
    }
    function R() {
      a.value && P.value.push({
        id: crypto.randomUUID(),
        x: 0,
        y: 0,
        width: a.value.width,
        height: a.value.height,
        view: ""
      });
    }
    async function C() {
      if (!S.value || !a.value || p.value)
        return;
      const b = a.value, o = c, v = P.value.filter((n) => n.view).map((n) => ({ ...n })), r = {};
      p.value = !0;
      try {
        for (const n of v) {
          const g = document.createElement("canvas");
          g.width = Math.floor(n.width), g.height = Math.floor(n.height);
          const h = g.getContext("2d");
          if (!h)
            throw new Error("Canvas недоступен в этом браузере.");
          h.drawImage(
            b,
            n.x,
            n.y,
            n.width,
            n.height,
            0,
            0,
            g.width,
            g.height
          );
          let M;
          try {
            M = await Ma(g);
          } finally {
            g.width = 0, g.height = 0;
          }
          if (o !== c || !l.open)
            return;
          r[n.view] = new File([M], `view-${n.view}.png`, { type: "image/png" });
        }
        d("confirm", r), d("close");
      } catch (n) {
        o === c && (m.value = $e(n));
      } finally {
        o === c && (p.value = !1);
      }
    }
    return re(() => [l.open, l.file], async () => {
      if (E(), !l.open || !l.file)
        return;
      const b = c;
      try {
        const o = await nl(l.file);
        if (b !== c) {
          o.bitmap.close();
          return;
        }
        a.value = o.bitmap, f.value = URL.createObjectURL(o.file), _();
      } catch (o) {
        b === c && (m.value = $e(o));
      }
    }, { immediate: !0 }), Fe(E), (b, o) => (i(), D(t(tl), {
      open: e.open,
      label: "Разрезать лист на виды",
      onClose: o[3] || (o[3] = (v) => b.$emit("close"))
    }, {
      footer: k(() => [
        U(t(te), {
          variant: "ghost",
          onClick: o[2] || (o[2] = (v) => b.$emit("close"))
        }, {
          default: k(() => [...o[9] || (o[9] = [
            q("Отмена", -1)
          ])]),
          _: 1
        }),
        U(t(te), {
          tone: "accent",
          loading: p.value,
          disabled: !a.value || !S.value,
          onClick: C
        }, {
          default: k(() => [...o[10] || (o[10] = [
            q("Подтвердить виды", -1)
          ])]),
          _: 1
        }, 8, ["loading", "disabled"])
      ]),
      default: k(() => [
        o[11] || (o[11] = s("h3", null, "Разрезать лист на виды", -1)),
        m.value ? (i(), D(t(ce), {
          key: 0,
          tone: "danger"
        }, {
          default: k(() => [
            q($(m.value), 1)
          ]),
          _: 1
        })) : A("", !0),
        f.value ? (i(), V("img", {
          key: 1,
          class: "studio-sheet-source",
          src: f.value,
          alt: "Исходный лист видов"
        }, null, 8, Za)) : A("", !0),
        s("div", en, [
          U(t(de), { label: "Порог отличия от фона" }, {
            default: k(() => [
              U(t(tt), {
                modelValue: y.value,
                "onUpdate:modelValue": o[0] || (o[0] = (v) => y.value = v),
                min: 0,
                max: 1020
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          U(t(de), { label: "Минимальный промежуток, %" }, {
            default: k(() => [
              U(t(tt), {
                modelValue: w.value,
                "onUpdate:modelValue": o[1] || (o[1] = (v) => w.value = v),
                min: 0.1,
                max: 100,
                step: 0.1
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          U(t(te), {
            disabled: !a.value || p.value,
            onClick: _
          }, {
            default: k(() => [...o[4] || (o[4] = [
              q("Найти области", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ]),
        (i(!0), V(Y, null, ie(P.value, (v, r) => (i(), V("div", {
          key: v.id,
          class: "studio-sheet-region"
        }, [
          U(t(de), {
            label: `Область ${r + 1}`
          }, {
            default: k(() => [
              U(t(xe), {
                modelValue: v.view,
                "onUpdate:modelValue": (n) => v.view = n
              }, {
                default: k(() => [
                  o[5] || (o[5] = s("option", { value: "" }, "Не использовать", -1)),
                  (i(), V(Y, null, ie(I, (n) => s("option", {
                    key: n.id,
                    value: n.id
                  }, $(n.label), 9, tn)), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 2
          }, 1032, ["label"]),
          U(t(de), { label: "X" }, {
            default: k(() => {
              var n;
              return [
                U(t(tt), {
                  modelValue: v.x,
                  "onUpdate:modelValue": (g) => v.x = g,
                  min: 0,
                  max: (((n = a.value) == null ? void 0 : n.width) ?? 1) - 1
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
              ];
            }),
            _: 2
          }, 1024),
          U(t(de), { label: "Y" }, {
            default: k(() => {
              var n;
              return [
                U(t(tt), {
                  modelValue: v.y,
                  "onUpdate:modelValue": (g) => v.y = g,
                  min: 0,
                  max: (((n = a.value) == null ? void 0 : n.height) ?? 1) - 1
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
              ];
            }),
            _: 2
          }, 1024),
          U(t(de), { label: "Ширина" }, {
            default: k(() => {
              var n;
              return [
                U(t(tt), {
                  modelValue: v.width,
                  "onUpdate:modelValue": (g) => v.width = g,
                  min: 1,
                  max: ((n = a.value) == null ? void 0 : n.width) ?? 1
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
              ];
            }),
            _: 2
          }, 1024),
          U(t(de), { label: "Высота" }, {
            default: k(() => {
              var n;
              return [
                U(t(tt), {
                  modelValue: v.height,
                  "onUpdate:modelValue": (g) => v.height = g,
                  min: 1,
                  max: ((n = a.value) == null ? void 0 : n.height) ?? 1
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
              ];
            }),
            _: 2
          }, 1024),
          U(t(te), {
            variant: "ghost",
            onClick: (n) => P.value.splice(r, 1)
          }, {
            default: k(() => [...o[6] || (o[6] = [
              q("Убрать область", -1)
            ])]),
            _: 1
          }, 8, ["onClick"])
        ]))), 128)),
        a.value && !P.value.length ? (i(), D(t(ce), { key: 2 }, {
          default: k(() => [...o[7] || (o[7] = [
            q("Области не найдены. Добавьте прямоугольники вручную.", -1)
          ])]),
          _: 1
        })) : A("", !0),
        U(t(te), {
          disabled: !a.value || P.value.length >= 50,
          variant: "ghost",
          onClick: R
        }, {
          default: k(() => [...o[8] || (o[8] = [
            q("Добавить область", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ]),
      _: 1
    }, 8, ["open"]));
  }
}), an = /* @__PURE__ */ Oe(ln, [["__scopeId", "data-v-d7a41ff4"]]), nn = { class: "studio-create-panel" }, on = { class: "studio-create-scroll" }, sn = { class: "studio-create-content" }, rn = { class: "studio-create-grid" }, un = { class: "studio-create-primary" }, dn = { class: "studio-create-card" }, cn = { class: "studio-create-hint" }, vn = { class: "studio-upload-area" }, fn = {
  key: 0,
  class: "studio-upload-ready"
}, mn = {
  key: 0,
  class: "studio-create-options"
}, pn = {
  key: 1,
  class: "studio-create-hint"
}, gn = { class: "studio-upload-area" }, bn = ["src", "alt"], yn = { class: "studio-upload-actions" }, hn = {
  key: 1,
  class: "studio-upload-ready"
}, wn = {
  key: 4,
  class: "studio-create-hint"
}, kn = {
  key: 0,
  class: "studio-create-card"
}, $n = { class: "studio-card-heading" }, xn = ["value"], In = {
  key: 2,
  class: "studio-create-hint"
}, Vn = { class: "studio-create-meta" }, Sn = { class: "studio-create-card" }, Cn = ["value"], Un = ["value"], _n = { class: "studio-create-card studio-result-plan" }, En = { class: "studio-result-steps" }, Mn = {
  key: 0,
  class: "studio-create-hint"
}, On = { class: "studio-create-note" }, Pn = { class: "studio-create-footer" }, Rn = {
  key: 1,
  class: "studio-import-action"
}, An = /* @__PURE__ */ Ue({
  __name: "CreatePanel",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["created", "tasks"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Xe(), f = Ge(), y = Pt(), w = Ze([]), p = Ze(null), m = O("text"), P = [
      { value: "text", label: "Из текста" },
      { value: "image", label: "Из картинки" },
      { value: "views", label: "По видам" },
      { value: "file", label: "Свой файл" }
    ], I = O(""), c = O(""), S = O(""), E = O(""), _ = O(!1), R = O("image-to-model"), C = O(!1), b = O({}), o = O(""), v = O(""), r = O(""), n = Oa({
      contextSignal: () => f.signal,
      upload: (Q) => a.upload(Q),
      error: r,
      isAlive: () => ve
    }), {
      primaryUpload: g,
      primaryPreview: h,
      primaryName: M,
      ownUpload: B,
      ownName: T,
      viewUploads: le,
      viewFiles: ee,
      uploading: ae,
      choosePrimary: ne,
      chooseOwnFile: fe,
      clearPrimary: ue,
      clearOwn: K
    } = n, N = Ze(null), J = O(!1), pe = O([]), Se = O(!1), ke = Ze(null);
    let ve = !0;
    const qe = G(() => m.value === "text" ? _.value ? "text-to-image" : "text-to-model" : m.value === "views" ? "views-to-model" : R.value), Te = G(() => w.value.filter((Q) => Q.operation === qe.value)), me = G(() => Te.value.find((Q) => Q.provider === E.value) ?? Te.value[0]), Le = G(() => {
      var Q;
      return (((Q = me.value) == null ? void 0 : Q.fields) ?? []).filter((L) => L.id === "prompt");
    }), Je = G(() => {
      var Q;
      return (((Q = me.value) == null ? void 0 : Q.fields) ?? []).filter((L) => L.id !== "prompt");
    }), Pe = G(() => {
      var Q;
      return (((Q = me.value) == null ? void 0 : Q.presets) ?? []).map((L) => ({
        value: L.id,
        label: L.label
      }));
    }), He = G(() => {
      var Q;
      return (Q = a.state) == null ? void 0 : Q.providers.find((L) => {
        var he;
        return L.id === ((he = me.value) == null ? void 0 : he.provider);
      });
    }), je = G(() => m.value === "views" ? le.value : m.value === "image" && g.value ? [{
      role: "primary",
      uploadId: g.value.uploadId
    }] : []), Ee = G(() => al(b.value)), F = G(() => ha(b.value, Ee.value)), x = G(() => {
      var Q;
      return C.value && m.value === "text" ? ke.value ? {
        total: ke.value.totalEstimated,
        unit: ke.value.unit,
        lines: ke.value.snapshot.rows.map((L, he) => ({ label: `Строка ${he + 1}`, amount: L.expectedPrice })),
        usd: null,
        note: "Расчёт всей сохранённой пачки."
      } : null : ((Q = p.value) == null ? void 0 : Q.quote) ?? null;
    }), se = G(() => {
      var Q;
      return (((Q = p.value) == null ? void 0 : Q.validation.errors) ?? []).filter((L) => L.field !== "prompt" || String(b.value.prompt ?? "").trim());
    }), z = G(() => ({
      text: "Опишите один объект: форму, материал и стиль. Например: настольная лампа из матового металла.",
      image: "Выберите картинку с хорошо различимым объектом. Перед запуском проверьте загруженное изображение.",
      views: "Ракурсы одного объекта помогают задать форму с разных сторон.",
      file: "Готовую модель можно бесплатно добавить, рассмотреть и сохранить в проект."
    })[m.value]), X = G(() => _.value && m.value === "text" ? {
      one: "эскиз",
      few: "эскиза",
      many: "эскизов"
    } : {
      one: "модель",
      few: "модели",
      many: "моделей"
    }), Ce = G(() => {
      if (m.value === "file")
        return "Модель из вашего файла";
      const Q = _.value && m.value === "text" ? "эскиз" : "модель";
      return C.value && m.value === "text" ? `${`${Ee.value.length} ${Yt(Ee.value.length, X.value)}`} · отдельный результат для каждой строки` : Q === "эскиз" ? "Эскиз для будущей модели" : m.value === "image" && R.value === "image-to-splat" ? "Сплат из изображения" : "Одна 3D-модель";
    }), H = G(() => C.value && m.value === "text" ? `Создать ${Ee.value.length}` : _.value && m.value === "text" ? "Создать эскиз" : "Создать модель"), Ie = G(() => a.admitted ? l.active ? me.value ? me.value.available ? m.value === "image" && !g.value ? "Загрузите картинку." : m.value === "views" && (!ee.value.front || Object.values(ee.value).filter(Boolean).length < 2) ? "Нужен вид спереди и хотя бы ещё один вид." : C.value && m.value === "text" && (!Ee.value.length || Ee.value.length > 50) ? "Укажите от 1 до 50 описаний, по одному в строке." : m.value === "text" && !String(b.value.prompt ?? "").trim() ? "Опишите объект, который хотите создать." : "" : me.value.reason ?? "Исполнитель недоступен." : "Для этого входа нет исполнителя." : "Вернитесь к форме для запуска." : f.t("libraryNotReady")), Me = G(() => {
      var Q;
      return rl({
        libraryId: a.libraryId,
        mode: m.value,
        provider: (Q = me.value) == null ? void 0 : Q.provider,
        operation: qe.value,
        values: b.value,
        uploads: je.value,
        name: I.value,
        project: c.value,
        category: S.value,
        batch: C.value
      });
    }), Ke = G(() => rl({
      form: Me.value,
      price: x.value
    }));
    function be(Q) {
      b.value = { ...b.value, ...JSON.parse(JSON.stringify(Q.values)) }, o.value = Q.id, v.value = Q.hint ?? (Q.id === "character" ? "Обычно дальше: проверка скелета (бесплатно) → скелет 25 → движения по 10." : "");
    }
    function ye(Q) {
      var he;
      const L = (he = me.value) == null ? void 0 : he.presets.find((rt) => rt.id === Q);
      L && be(L);
    }
    async function Ne() {
      if (!B.value || ae.value || J.value || !l.active)
        return;
      const Q = a.libraryId, L = f.signal;
      J.value = !0, r.value = "";
      try {
        const he = await a.createFromFile({
          uploadId: B.value.uploadId,
          ...I.value.trim() && { name: I.value.trim() },
          project: c.value || null,
          category: S.value || null
        });
        ve && !L.aborted && f.signal === L && l.active && Q === a.libraryId && d("created", he.model.id, he.version.id);
      } catch (he) {
        ve && !L.aborted && f.signal === L && Q === a.libraryId && (r.value = $e(he));
      } finally {
        !L.aborted && f.signal === L && (J.value = !1);
      }
    }
    function Re() {
      return wa({
        selected: me.value,
        values: b.value,
        name: I.value,
        project: c.value,
        category: S.value
      }, Ee.value);
    }
    const Qe = xa({
      contextSignal: () => f.signal,
      creationOffers: w,
      quoted: p,
      batchQuoted: ke,
      changedPrice: Se,
      error: r,
      offer: me,
      mode: m,
      batch: C,
      values: b,
      inputs: () => je.value,
      lines: () => Ee.value,
      batchRows: Re,
      isAlive: () => ve,
      isActive: () => l.active && a.admitted,
      libraryId: () => a.libraryId,
      loadOffers: (Q) => a.loadOffers(Q),
      quote: (Q) => a.quote(Q),
      batchQuote: (Q) => a.batchQuote(Q)
    }), { priceChanged: sl } = Qe, Lt = $a({
      contextSignal: () => f.signal,
      offer: me,
      disabledReason: Ie,
      displayQuote: x,
      batch: C,
      mode: m,
      batchQuoted: ke,
      outputUnit: X,
      values: b,
      quoted: p,
      inputs: je,
      name: I,
      project: c,
      category: S,
      providerId: E,
      selectedPreset: o,
      presetHint: v,
      formFingerprint: () => Me.value,
      isAlive: () => ve,
      isActive: () => l.active,
      run: (Q, L, he) => a.run(Q, L, he),
      batchRun: (Q, L, he) => a.batchRun(Q, L, he),
      onTasks: () => d("tasks"),
      onCreated: (Q, L) => d("created", Q, L)
    }), { execute: il } = Lt;
    re(
      () => {
        var Q, L;
        return `${(Q = me.value) == null ? void 0 : Q.provider}:${(L = me.value) == null ? void 0 : L.operation}`;
      },
      Lt.rememberDraft,
      { immediate: !0 }
    ), re(
      () => [l.active, a.admitted, a.libraryId, je.value],
      Qe.refreshOffers,
      { immediate: !0 }
    ), re(
      [Me, () => l.active, () => a.admitted, me],
      Qe.refreshQuote,
      { immediate: !0 }
    ), re(ee, n.uploadViews);
    let jt = a.libraryId;
    re(
      () => {
        var Q;
        return [a.libraryId, (Q = a.state) == null ? void 0 : Q.library.ok, a.admitted];
      },
      ([Q, L, he]) => {
        L && he && Q && Q !== jt && (jt = Q, n.resetForLibrary());
      }
    ), re(() => f.signal, () => {
      J.value = !1, n.rebindContext(), Qe.dispose(), Qe.refreshQuote(), Qe.refreshOffers(), Bt();
    }, { flush: "sync" }), re(m, () => {
      r.value = "";
    });
    async function Bt() {
      const Q = f.signal;
      try {
        const L = await y.list();
        ve && !Q.aborted && f.signal === Q && (pe.value = L.filter((he) => !he.archivedAt));
      } catch {
        ve && !Q.aborted && f.signal === Q && (r.value = "Не удалось получить список проектов.");
      }
    }
    return Ut(Bt), Fe(() => {
      ve = !1, n.dispose(), Qe.dispose();
    }), (Q, L) => {
      var he, rt, Ft, qt;
      return i(), V("div", nn, [
        s("div", on, [
          s("div", sn, [
            L[34] || (L[34] = s("header", { class: "studio-create-heading" }, [
              s("h3", null, "Создать модель"),
              s("p", null, "От идеи до файла в проекте. Выберите, с чего начать.")
            ], -1)),
            r.value ? (i(), D(t(ce), {
              key: 0,
              tone: "danger"
            }, {
              default: k(() => [
                q($(r.value), 1)
              ]),
              _: 1
            })) : A("", !0),
            s("div", rn, [
              s("div", un, [
                s("section", dn, [
                  L[28] || (L[28] = s("h4", null, "Источник модели", -1)),
                  U(t(Jt), {
                    modelValue: m.value,
                    "onUpdate:modelValue": L[0] || (L[0] = (oe) => m.value = oe),
                    options: P,
                    disabled: J.value,
                    label: "Источник модели",
                    "data-ui-studio-choice": ""
                  }, null, 8, ["modelValue", "disabled"]),
                  m.value !== "file" && Le.value.length ? (i(), D(Kt, {
                    key: 0,
                    modelValue: b.value,
                    "onUpdate:modelValue": L[1] || (L[1] = (oe) => b.value = oe),
                    fields: Le.value,
                    errors: se.value
                  }, null, 8, ["modelValue", "fields", "errors"])) : A("", !0),
                  s("p", cn, $(z.value), 1),
                  m.value === "file" ? (i(), V(Y, { key: 1 }, [
                    s("div", vn, [
                      L[18] || (L[18] = s("svg", {
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "1.5",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "aria-hidden": "true"
                      }, [
                        s("path", { d: "M12 16V3m-5 5 5-5 5 5 M4 15v5h16v-5" })
                      ], -1)),
                      L[19] || (L[19] = s("strong", null, "Добавьте готовую 3D-модель", -1)),
                      L[20] || (L[20] = s("p", null, "GLB, FBX, OBJ, STL или splat · до 150 МиБ", -1)),
                      U(t(It), {
                        accept: ".glb,.fbx,.obj,.stl,.splat,.gltf",
                        label: "Выбрать модель",
                        busy: t(ae) || J.value,
                        "show-summary": !1,
                        "show-reset": !1,
                        onChange: L[2] || (L[2] = (oe) => t(fe)(oe[0]))
                      }, null, 8, ["busy"]),
                      t(B) ? (i(), V("span", fn, $(t(T)) + " · готов к добавлению", 1)) : A("", !0),
                      t(B) ? (i(), D(t(te), {
                        key: 1,
                        variant: "ghost",
                        disabled: J.value,
                        onClick: t(K)
                      }, {
                        default: k(() => [...L[17] || (L[17] = [
                          q(" Убрать файл ", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled", "onClick"])) : A("", !0)
                    ]),
                    L[21] || (L[21] = s("p", { class: "studio-create-hint" }, "Для .gltf сохраните самостоятельный .glb без внешних ресурсов.", -1))
                  ], 64)) : (i(), V(Y, { key: 2 }, [
                    m.value === "text" ? (i(), V("div", mn, [
                      U(t(Wt), {
                        modelValue: _.value,
                        "onUpdate:modelValue": L[3] || (L[3] = (oe) => _.value = oe)
                      }, {
                        default: k(() => [...L[22] || (L[22] = [
                          q("Сначала эскиз", -1)
                        ])]),
                        _: 1
                      }, 8, ["modelValue"]),
                      U(t(Wt), {
                        modelValue: C.value,
                        "onUpdate:modelValue": L[4] || (L[4] = (oe) => C.value = oe),
                        "data-context": "studio-batch-toggle"
                      }, {
                        default: k(() => [
                          q($(_.value ? "Несколько эскизов" : "Несколько моделей"), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ])) : A("", !0),
                    m.value === "text" && _.value ? (i(), V("p", pn, " Сейчас создаётся только картинка. Проверьте её и запустите модель отдельным шагом. ")) : A("", !0),
                    m.value === "image" ? (i(), V(Y, { key: 2 }, [
                      s("div", gn, [
                        t(h) ? (i(), V("img", {
                          key: 0,
                          src: t(h),
                          alt: t(M),
                          class: "studio-source-preview"
                        }, null, 8, bn)) : A("", !0),
                        L[24] || (L[24] = s("strong", null, "Изображение будущей модели", -1)),
                        L[25] || (L[25] = s("p", null, "PNG, JPEG или WebP · до 20 МиБ", -1)),
                        s("div", yn, [
                          U(t(It), {
                            accept: ".png,.jpg,.jpeg,.webp",
                            busy: t(ae),
                            "show-summary": !1,
                            "show-reset": !1,
                            label: t(g) ? "Заменить картинку" : "Выбрать картинку",
                            onChange: L[5] || (L[5] = (oe) => t(ne)(oe[0]))
                          }, null, 8, ["busy", "label"]),
                          t(g) ? (i(), D(t(te), {
                            key: 0,
                            variant: "ghost",
                            onClick: t(ue)
                          }, {
                            default: k(() => [...L[23] || (L[23] = [
                              q("Убрать", -1)
                            ])]),
                            _: 1
                          }, 8, ["onClick"])) : A("", !0)
                        ]),
                        t(g) ? (i(), V("span", hn, $(t(M)), 1)) : A("", !0)
                      ]),
                      U(t(de), { label: "Результат картинки" }, {
                        default: k(() => [
                          U(t(xe), {
                            modelValue: R.value,
                            "onUpdate:modelValue": L[6] || (L[6] = (oe) => R.value = oe),
                            "aria-label": "Результат картинки"
                          }, {
                            default: k(() => [...L[26] || (L[26] = [
                              s("option", { value: "image-to-model" }, "Модель", -1),
                              s("option", { value: "image-to-splat" }, "Сплат · объёмное фото", -1)
                            ])]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ], 64)) : A("", !0),
                    m.value === "views" ? (i(), V(Y, { key: 3 }, [
                      L[27] || (L[27] = s("p", { class: "studio-create-hint" }, "Загрузите вид спереди и ещё 1–3 ракурса того же объекта.", -1)),
                      U(Qa, {
                        modelValue: t(ee),
                        "onUpdate:modelValue": L[7] || (L[7] = (oe) => pt(ee) ? ee.value = oe : null)
                      }, null, 8, ["modelValue"]),
                      U(t(It), {
                        accept: ".png,.jpg,.jpeg,.webp",
                        label: "Разрезать лист видов",
                        onChange: L[8] || (L[8] = (oe) => N.value = oe[0] ?? null)
                      }),
                      U(an, {
                        open: !!N.value,
                        file: N.value,
                        onClose: L[9] || (L[9] = (oe) => N.value = null),
                        onConfirm: L[10] || (L[10] = (oe) => ee.value = { ...t(ee), ...oe })
                      }, null, 8, ["open", "file"])
                    ], 64)) : A("", !0),
                    C.value && m.value === "text" ? (i(), V("p", wn, " Одно описание на строку · до 50 " + $(_.value ? "эскизов" : "моделей") + ". Перед запуском появится общая стоимость пачки. ", 1)) : A("", !0)
                  ], 64))
                ]),
                m.value !== "file" && me.value ? (i(), V("section", kn, [
                  s("div", $n, [
                    L[29] || (L[29] = s("h4", null, "Параметры генерации", -1)),
                    s("span", null, $(me.value.providerName), 1)
                  ]),
                  Te.value.length > 1 ? (i(), D(t(de), {
                    key: 0,
                    label: "Исполнитель"
                  }, {
                    default: k(() => [
                      U(t(xe), {
                        modelValue: E.value,
                        "onUpdate:modelValue": L[11] || (L[11] = (oe) => E.value = oe)
                      }, {
                        default: k(() => [
                          (i(!0), V(Y, null, ie(Te.value, (oe) => (i(), V("option", {
                            key: oe.provider,
                            value: oe.provider
                          }, $(oe.providerName) + " — " + $(t(Ae)(oe.quote.total, oe.quote.unit)), 9, xn))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : A("", !0),
                  Pe.value.length ? (i(), D(t(de), {
                    key: 1,
                    label: "Готовые наборы"
                  }, {
                    default: k(() => [
                      U(t(Jt), {
                        "model-value": o.value,
                        options: Pe.value,
                        label: "Готовые наборы",
                        "data-ui-studio-choice": "",
                        "onUpdate:modelValue": ye
                      }, null, 8, ["model-value", "options"])
                    ]),
                    _: 1
                  })) : A("", !0),
                  v.value ? (i(), V("p", In, $(v.value), 1)) : A("", !0),
                  U(Kt, {
                    modelValue: b.value,
                    "onUpdate:modelValue": L[12] || (L[12] = (oe) => b.value = oe),
                    fields: Je.value,
                    errors: se.value
                  }, null, 8, ["modelValue", "fields", "errors"])
                ])) : A("", !0)
              ]),
              s("aside", Vn, [
                s("section", Sn, [
                  L[32] || (L[32] = s("h4", null, "В библиотеке", -1)),
                  U(t(de), {
                    label: "Имя",
                    hint: "Необязательно. Можно переименовать позже."
                  }, {
                    default: k(() => [
                      U(t(st), {
                        modelValue: I.value,
                        "onUpdate:modelValue": L[13] || (L[13] = (oe) => I.value = oe),
                        disabled: J.value,
                        maxlength: "200",
                        placeholder: "Например, настольная лампа"
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  U(t(de), {
                    label: "Проект",
                    hint: "Для группировки. Папку сохранения выберете после генерации."
                  }, {
                    default: k(() => [
                      U(t(xe), {
                        modelValue: c.value,
                        "onUpdate:modelValue": L[14] || (L[14] = (oe) => c.value = oe),
                        disabled: J.value
                      }, {
                        default: k(() => [
                          L[30] || (L[30] = s("option", { value: "" }, "Без проекта", -1)),
                          (i(!0), V(Y, null, ie(pe.value, (oe) => (i(), V("option", {
                            key: oe.id,
                            value: oe.id
                          }, $(oe.title), 9, Cn))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  U(t(de), { label: "Категория" }, {
                    default: k(() => [
                      U(t(xe), {
                        modelValue: S.value,
                        "onUpdate:modelValue": L[15] || (L[15] = (oe) => S.value = oe),
                        disabled: J.value
                      }, {
                        default: k(() => [
                          L[31] || (L[31] = s("option", { value: "" }, "Не выбрана", -1)),
                          (i(!0), V(Y, null, ie(t(Sl), (oe) => (i(), V("option", {
                            key: oe.id,
                            value: oe.id
                          }, $(oe.label), 9, Un))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                s("details", _n, [
                  s("summary", null, $(m.value === "file" ? "После добавления" : "Что получится"), 1),
                  s("strong", null, $(Ce.value), 1),
                  s("ol", En, [
                    s("li", null, $(m.value === "file" ? "Откройте файл в просмотрщике" : "Дождитесь результата во вкладке «Задачи»"), 1),
                    s("li", null, $(_.value && m.value === "text" ? "Проверьте эскиз и создайте по нему модель" : "Оцените модель, при необходимости создайте новую версию"), 1),
                    L[33] || (L[33] = s("li", null, "Сохраните готовый файл в проект", -1))
                  ]),
                  m.value === "text" && _.value ? (i(), V("p", Mn, " В текущую стоимость входит только эскиз. ")) : A("", !0)
                ]),
                s("div", On, [
                  s("strong", null, $(m.value === "file" ? "Бесплатный импорт" : "Результат останется в библиотеке"), 1),
                  s("p", null, $(m.value === "file" ? "Добавьте файл, чтобы просматривать его и сохранять версии." : "Можно переключать вкладки: черновик сохранится, пока открыто это окно."), 1)
                ])
              ])
            ])
          ])
        ]),
        s("footer", Pn, [
          Se.value ? (i(), D(t(ce), {
            key: 0,
            tone: "warning"
          }, {
            default: k(() => [...L[35] || (L[35] = [
              q("Цена изменилась — проверьте и нажмите снова.", -1)
            ])]),
            _: 1
          })) : A("", !0),
          m.value === "file" ? (i(), V("div", Rn, [
            L[37] || (L[37] = s("span", null, "Импорт в библиотеку · бесплатно", -1)),
            U(t(te), {
              tone: "accent",
              variant: "solid",
              loading: J.value,
              disabled: !t(B) || t(ae),
              onClick: Ne
            }, {
              default: k(() => [...L[36] || (L[36] = [
                q(" Добавить бесплатно ", -1)
              ])]),
              _: 1
            }, 8, ["loading", "disabled"])
          ])) : (i(), D(ol, {
            key: 2,
            quote: x.value,
            layout: "footer",
            validation: C.value && m.value === "text" ? F.value : (he = p.value) == null ? void 0 : he.validation,
            balance: ((Ft = (rt = He.value) == null ? void 0 : rt.balance) == null ? void 0 : Ft.available) ?? null,
            "billing-url": (qt = He.value) == null ? void 0 : qt.billingUrl,
            verb: H.value,
            fingerprint: Ke.value,
            "disabled-reason": Ie.value,
            busy: t(ae),
            execute: t(il),
            onPriceChanged: t(sl),
            onRefresh: L[16] || (L[16] = (oe) => t(a).loadState())
          }, null, 8, ["quote", "validation", "balance", "billing-url", "verb", "fingerprint", "disabled-reason", "busy", "execute", "onPriceChanged"]))
        ])
      ]);
    };
  }
}), Ln = /* @__PURE__ */ Oe(An, [["__scopeId", "data-v-d0c05ac2"]]), jn = {
  key: 0,
  class: "tiles"
}, Bn = { class: "preview" }, Fn = { class: "copy" }, qn = {
  key: 1,
  class: "create"
}, Tn = { class: "panel-header" }, Nn = { class: "navigation" }, Dn = { class: "create-body" }, zn = { class: "create-scroll" }, Wn = { class: "create-content" }, Jn = { class: "create-heading" }, Xn = { class: "create-grid" }, Gn = {
  class: "primary",
  "data-loading-region": "primary"
}, Hn = { class: "create-card" }, Kn = {
  class: "meta",
  "data-loading-region": "meta"
}, Qn = { class: "create-card" }, Yn = { class: "create-card" }, Zn = {
  class: "create-footer",
  "data-loading-region": "footer"
}, eo = { class: "footer-actions" }, to = /* @__PURE__ */ Ue({
  inheritAttrs: !1,
  __name: "Studio3dLoading",
  props: {
    label: { default: void 0 },
    description: { default: void 0 },
    failed: { type: Boolean, default: !1 },
    area: { default: "library" }
  },
  setup(e) {
    return (u, l) => (i(), D(t(ll), {
      class: We({ "create-loading": e.area === "create" }),
      label: e.label,
      failed: e.failed
    }, {
      default: k(() => [
        e.area === "library" ? (i(), V("div", jn, [
          (i(), V(Y, null, ie(6, (d) => s("div", {
            key: d,
            class: "tile",
            "data-loading-region": "tile"
          }, [
            s("div", Bn, [
              U(t(Ve), {
                shape: "block",
                height: "100%"
              })
            ]),
            s("div", Fn, [
              U(t(Ve), { width: "65%" }),
              U(t(Ve), { width: "40%" })
            ])
          ])), 64))
        ])) : (i(), V("div", qn, [
          s("div", Tn, [
            U(t(Ve), {
              width: "20%",
              height: "20px"
            })
          ]),
          s("div", Nn, [
            U(t(Ve), {
              width: "300px",
              height: "32px"
            })
          ]),
          s("div", Dn, [
            s("div", zn, [
              s("div", Wn, [
                s("div", Jn, [
                  U(t(Ve), {
                    width: "28%",
                    height: "24px"
                  }),
                  U(t(Ve), { width: "60%" })
                ]),
                s("div", Xn, [
                  s("div", Gn, [
                    s("div", Hn, [
                      U(t(Ve), {
                        width: "30%",
                        height: "16px"
                      }),
                      U(t(Ve), {
                        shape: "block",
                        height: "32px"
                      }),
                      U(t(Ve), {
                        shape: "block",
                        height: "72px"
                      }),
                      U(t(Ve), { width: "60%" })
                    ])
                  ]),
                  s("div", Kn, [
                    s("div", Qn, [
                      U(t(Ve), {
                        width: "55%",
                        height: "16px"
                      }),
                      (i(), V(Y, null, ie(3, (d) => s("div", {
                        key: d,
                        class: "meta-field"
                      }, [
                        U(t(Ve), {
                          width: "40%",
                          height: "18px"
                        }),
                        U(t(Ve), {
                          shape: "block",
                          height: "32px"
                        }),
                        U(t(Ve), { width: "85%" })
                      ])), 64))
                    ]),
                    s("div", Yn, [
                      U(t(Ve), {
                        width: "65%",
                        height: "18px"
                      })
                    ])
                  ])
                ])
              ])
            ]),
            s("div", Zn, [
              s("div", eo, [
                U(t(Ve), {
                  width: "220px",
                  height: "20px"
                }),
                U(t(Ve), {
                  shape: "block",
                  width: "160px",
                  height: "32px"
                })
              ]),
              U(t(Ve), {
                width: "50%",
                height: "20px"
              })
            ])
          ])
        ]))
      ]),
      _: 1
    }, 8, ["class", "label", "failed"]));
  }
}), lo = /* @__PURE__ */ Oe(to, [["__scopeId", "data-v-cb366d93"]]), ao = { class: "studio-library" }, no = { class: "studio-library-heading" }, oo = { class: "studio-library-search" }, so = {
  key: 0,
  class: "studio-library-count"
}, io = {
  id: "studio-library-filters",
  class: "studio-filters"
}, ro = ["value"], uo = ["value"], co = ["value"], vo = {
  key: 4,
  class: "studio-library-empty"
}, fo = {
  key: 6,
  class: "studio-library-count"
}, mo = { class: "studio-model-grid" }, po = { class: "studio-model-preview" }, go = ["src", "alt"], bo = {
  key: 1,
  class: "studio-preview-empty"
}, yo = { class: "studio-model-category" }, ho = { class: "studio-model-caption" }, wo = {
  key: 0,
  class: "studio-model-working"
}, ko = { key: 1 }, $o = ["datetime"], xo = /* @__PURE__ */ Ue({
  __name: "LibraryPanel",
  emits: ["open", "create"],
  setup(e) {
    const u = Xe(), l = Pt(), d = O([]), a = O(""), f = O(!1), y = G(() => Object.values(u.filters).filter(Boolean).length), w = G(() => Object.entries(u.filters).filter(([, I]) => I).map(([I, c]) => {
      var S, E;
      return I === "project" ? ((S = d.value.find((_) => _.id === c)) == null ? void 0 : S.title) || c : Vt[c] || ot(c, (E = u.state) == null ? void 0 : E.providers);
    }).join(" · ")), p = G(() => !!(u.query || Object.values(u.filters).some(Boolean)));
    let m = !0;
    function P(I, c) {
      const S = typeof c == "string" ? c : "", E = { ...u.filters };
      S ? E[I] = S : delete E[I], u.filters = E, u.loadModels();
    }
    return Ut(async () => {
      try {
        const I = await l.list();
        m && (d.value = I.filter((c) => !c.archivedAt));
      } catch (I) {
        m && (a.value = `Не удалось загрузить проекты: ${$e(I)}`);
      }
    }), Fe(() => {
      m = !1;
    }), (I, c) => (i(), V("section", ao, [
      s("header", no, [
        c[11] || (c[11] = s("div", null, [
          s("h3", null, "Модели"),
          s("p", null, "Ваша библиотека и все версии в одном месте.")
        ], -1)),
        U(t(te), {
          tone: "accent",
          variant: "solid",
          onClick: c[0] || (c[0] = (S) => I.$emit("create"))
        }, {
          default: k(() => [...c[10] || (c[10] = [
            q("Создать модель", -1)
          ])]),
          _: 1
        })
      ]),
      s("div", oo, [
        U(t(Ul), {
          "model-value": t(u).query,
          placeholder: "Поиск моделей",
          "aria-label": "Поиск моделей",
          "onUpdate:modelValue": c[1] || (c[1] = (S) => t(u).search(S))
        }, null, 8, ["model-value"]),
        U(t(te), {
          "aria-expanded": f.value,
          "aria-controls": "studio-library-filters",
          onClick: c[2] || (c[2] = (S) => f.value = !f.value)
        }, {
          default: k(() => [
            q("Фильтры" + $(y.value ? ` · ${y.value}` : ""), 1)
          ]),
          _: 1
        }, 8, ["aria-expanded"])
      ]),
      y.value && !f.value ? (i(), V("p", so, $(w.value), 1)) : A("", !0),
      De(s("div", io, [
        U(t(de), { label: "Проект" }, {
          default: k(() => [
            U(t(xe), {
              "model-value": t(u).filters.project || "",
              "onUpdate:modelValue": c[3] || (c[3] = (S) => P("project", S))
            }, {
              default: k(() => [
                c[12] || (c[12] = s("option", { value: "" }, "Все", -1)),
                (i(!0), V(Y, null, ie(d.value, (S) => (i(), V("option", {
                  key: S.id,
                  value: S.id
                }, $(S.title), 9, ro))), 128))
              ]),
              _: 1
            }, 8, ["model-value"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Категория" }, {
          default: k(() => [
            U(t(xe), {
              "model-value": t(u).filters.category || "",
              "onUpdate:modelValue": c[4] || (c[4] = (S) => P("category", S))
            }, {
              default: k(() => [
                c[13] || (c[13] = s("option", { value: "" }, "Все", -1)),
                (i(!0), V(Y, null, ie(t(Sl), (S) => (i(), V("option", {
                  key: S.id,
                  value: S.id
                }, $(S.label), 9, uo))), 128))
              ]),
              _: 1
            }, 8, ["model-value"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Происхождение" }, {
          default: k(() => [
            U(t(xe), {
              "data-context": "studio-filter-origin",
              "model-value": t(u).filters.origin || "",
              "onUpdate:modelValue": c[5] || (c[5] = (S) => P("origin", S))
            }, {
              default: k(() => [...c[14] || (c[14] = [
                s("option", { value: "" }, "Все", -1),
                s("option", { value: "section" }, "Раздел", -1),
                s("option", { value: "agent" }, "Агент", -1),
                s("option", { value: "file" }, "Файл", -1),
                s("option", { value: "import" }, "Импорт", -1)
              ])]),
              _: 1
            }, 8, ["model-value"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Исполнитель" }, {
          default: k(() => [
            U(t(xe), {
              "model-value": t(u).filters.provider || "",
              "onUpdate:modelValue": c[6] || (c[6] = (S) => P("provider", S))
            }, {
              default: k(() => {
                var S;
                return [
                  c[15] || (c[15] = s("option", { value: "" }, "Все", -1)),
                  (i(!0), V(Y, null, ie(((S = t(u).state) == null ? void 0 : S.providers) || [], (E) => (i(), V("option", {
                    key: E.id,
                    value: E.id
                  }, $(E.name), 9, co))), 128))
                ];
              }),
              _: 1
            }, 8, ["model-value"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Содержимое" }, {
          default: k(() => [
            U(t(xe), {
              "model-value": t(u).filters.has || "",
              "onUpdate:modelValue": c[7] || (c[7] = (S) => P("has", S))
            }, {
              default: k(() => [...c[16] || (c[16] = [
                s("option", { value: "" }, "Всё", -1),
                s("option", { value: "rig" }, "Со скелетом", -1),
                s("option", { value: "animation" }, "С движениями", -1),
                s("option", { value: "parts" }, "С частями", -1)
              ])]),
              _: 1
            }, 8, ["model-value"])
          ]),
          _: 1
        })
      ], 512), [
        [nt, f.value]
      ]),
      a.value ? (i(), D(t(ce), {
        key: 1,
        tone: "warning"
      }, {
        default: k(() => [
          q($(a.value), 1)
        ]),
        _: 1
      })) : A("", !0),
      t(u).broken.length ? (i(), D(t(ce), {
        key: 2,
        tone: "warning"
      }, {
        default: k(() => [
          q(" Повреждённые записи: " + $(t(u).broken.length), 1)
        ]),
        _: 1
      })) : A("", !0),
      t(u).busy && !t(u).models.length ? (i(), D(lo, {
        key: 3,
        label: "Загрузка моделей…",
        area: "library",
        failed: !!a.value
      }, null, 8, ["failed"])) : t(u).models.length ? t(u).busy ? (i(), D(t(ll), {
        key: 5,
        label: "Загрузка моделей…",
        variant: "inline"
      })) : (i(), V("p", fo, "Найдено: " + $(t(u).total), 1)) : (i(), V("div", vo, [
        c[18] || (c[18] = s("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.2",
          "stroke-linejoin": "round",
          "aria-hidden": "true"
        }, [
          s("path", { d: "M12 2l9 5v10l-9 5-9-5V7z M12 22V12 M21 7l-9 5-9-5" })
        ], -1)),
        s("strong", null, $(p.value ? "Модели не найдены" : "Здесь будут ваши модели"), 1),
        s("p", null, $(p.value ? "Измените поиск или фильтры." : "Создайте первую модель или добавьте готовый файл."), 1),
        p.value ? A("", !0) : (i(), D(t(te), {
          key: 0,
          onClick: c[8] || (c[8] = (S) => I.$emit("create"))
        }, {
          default: k(() => [...c[17] || (c[17] = [
            q("Создать модель", -1)
          ])]),
          _: 1
        }))
      ])),
      s("div", mo, [
        (i(!0), V(Y, null, ie(t(u).models, (S) => (i(), D(t(_t), {
          key: S.id,
          "data-context": "studio-model-card",
          onClick: (E) => I.$emit("open", S.id)
        }, {
          default: k(() => [
            s("div", po, [
              S.preview ? (i(), V("img", {
                key: 0,
                src: S.preview,
                alt: S.name,
                loading: "lazy"
              }, null, 8, go)) : (i(), V("span", bo, [...c[19] || (c[19] = [
                s("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": ".8",
                  "stroke-linejoin": "round",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "M12 2l9 5v10l-9 5-9-5V7z M12 22V12 M21 7l-9 5-9-5" })
                ], -1),
                s("span", null, "Нет превью", -1)
              ])])),
              s("span", yo, $(t(Vt)[S.category || ""] || "Модель"), 1)
            ]),
            s("div", ho, [
              s("strong", null, $(S.name), 1),
              S.active ? (i(), V("span", wo, "В работе: " + $(S.active), 1)) : A("", !0),
              s("span", null, $(S.versions) + " " + $(t(Yt)(
                S.versions,
                { one: "версия", few: "версии", many: "версий" }
              )), 1),
              s("span", null, $([
                S.has.rig && "скелет",
                S.has.animation && "движения",
                S.has.parts && "части",
                S.origin === "agent" && "агент"
              ].filter(Boolean).join(" · ")), 1),
              S.spent !== null ? (i(), V("span", ko, "потрачено " + $(S.spent), 1)) : (i(!0), V(Y, { key: 2 }, ie(S.spending, (E) => {
                var _;
                return i(), V("span", {
                  key: E.provider
                }, [
                  q($(t(ot)(E.provider, (_ = t(u).state) == null ? void 0 : _.providers)) + ": списано " + $(t(Ae)(E.actual, E.unit)) + " ", 1),
                  E.unknownCount ? (i(), V(Y, { key: 0 }, [
                    q(" · неизвестно " + $(E.unknownCount), 1)
                  ], 64)) : A("", !0)
                ]);
              }), 128)),
              s("time", {
                datetime: S.updatedAt
              }, $(new Date(S.updatedAt).toLocaleDateString("ru-RU")), 9, $o)
            ])
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      t(u).models.length < t(u).total ? (i(), D(t(te), {
        key: 7,
        loading: t(u).busy > 0,
        onClick: c[9] || (c[9] = (S) => t(u).loadModels(!0))
      }, {
        default: k(() => [...c[20] || (c[20] = [
          q("Показать ещё", -1)
        ])]),
        _: 1
      }, 8, ["loading"])) : A("", !0)
    ]));
  }
}), Io = /* @__PURE__ */ Oe(xo, [["__scopeId", "data-v-b4dcc220"]]), Vo = {
  class: "studio-version-tree",
  "aria-label": "Версии модели"
}, So = { class: "studio-version-preview" }, Co = ["src"], Uo = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.2",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, _o = { class: "studio-version-copy" }, Eo = { class: "studio-version-name" }, Mo = { class: "studio-version-meta" }, Oo = { class: "studio-version-number" }, Po = ["data-status"], Ro = {
  key: 0,
  class: "studio-version-main"
}, Ao = /* @__PURE__ */ Ue({
  __name: "VersionTree",
  props: {
    versions: {},
    selected: {},
    main: {}
  },
  emits: ["select"],
  setup(e) {
    const u = e, l = O(/* @__PURE__ */ new Set()), d = G(() => new Set(u.versions.map((y) => y.parent).filter(Boolean))), a = G(() => {
      const y = /* @__PURE__ */ new Set(), w = [], p = new Set(u.versions.map((I) => I.id)), m = [...u.versions].sort((I, c) => I.seq - c.seq), P = (I, c) => {
        if (!y.has(I.id) && (y.add(I.id), w.push({ version: I, depth: c }), !l.value.has(I.id)))
          for (const S of m.filter((E) => E.parent === I.id))
            P(S, c + 1);
      };
      for (const I of m.filter((c) => !c.parent || !p.has(c.parent)))
        P(I, 0);
      if (!l.value.size)
        for (const I of m)
          P(I, 0);
      return w;
    });
    function f(y) {
      const w = new Set(l.value);
      w.has(y) ? w.delete(y) : w.add(y), l.value = w;
    }
    return (y, w) => (i(), V("section", Vo, [
      (i(!0), V(Y, null, ie(a.value, (p) => (i(), V("div", {
        key: p.version.id,
        class: "studio-tree-item"
      }, [
        d.value.has(p.version.id) ? (i(), D(t(at), {
          key: 0,
          role: "embedded",
          label: `${l.value.has(p.version.id) ? "Развернуть" : "Свернуть"} ${p.version.label}`,
          onClick: (m) => f(p.version.id)
        }, {
          default: k(() => [
            q($(l.value.has(p.version.id) ? "›" : "⌄"), 1)
          ]),
          _: 2
        }, 1032, ["label", "onClick"])) : A("", !0),
        U(t(_t), {
          "data-context": "studio-version-row",
          pressed: e.selected === p.version.id,
          style: Qt({ paddingLeft: `${p.depth * 18}px` }),
          onClick: (m) => y.$emit("select", p.version.id)
        }, {
          default: k(() => [
            s("span", So, [
              p.version.preview ? (i(), V("img", {
                key: 0,
                src: p.version.preview,
                alt: "",
                loading: "lazy"
              }, null, 8, Co)) : (i(), V("svg", Uo, [...w[0] || (w[0] = [
                s("path", { d: "M12 2l9 5v10l-9 5-9-5V7z M12 22V12 M21 7l-9 5-9-5" }, null, -1)
              ])]))
            ]),
            s("span", _o, [
              s("span", Eo, $(e.main === p.version.id ? "★ " : "") + $(p.version.label), 1),
              s("span", Mo, [
                s("span", Oo, "v" + $(String(p.version.seq).padStart(2, "0")), 1),
                s("span", {
                  class: "studio-version-status",
                  "data-status": p.version.status
                }, $(t(vt)[p.version.status]), 9, Po)
              ]),
              t($t).includes(p.version.status) && p.version.status !== "unknown" ? (i(), D(t(Et), {
                key: 0,
                value: p.version.progress,
                label: `Прогресс ${p.version.label}`
              }, null, 8, ["value", "label"])) : A("", !0)
            ]),
            e.main === p.version.id ? (i(), V("span", Ro, "Основная")) : A("", !0)
          ]),
          _: 2
        }, 1032, ["pressed", "style", "onClick"])
      ]))), 128))
    ]));
  }
}), Lo = /* @__PURE__ */ Oe(Ao, [["__scopeId", "data-v-49c8cec1"]]);
function jo(e, u) {
  const l = u.files.find((d) => d.id === u.mainFileId);
  if (!l)
    throw new Error("У версии нет локального основного файла. Сначала скачайте её.");
  return `Модель «${e.model.name}», версия «${u.label}».
Файл: ${e.modelDirectory}/${u.id}/${l.name}
${Cl(u.stats)}.
` + (e.model.project ? `Проект: ${e.model.project}.
` : "") + `Результат положи в ${e.modelDirectory}/incoming/ — GrigDesk предложит добавить его версией.`;
}
async function Bo(e, u, l) {
  const d = jo(e, u);
  await l.askAgent({
    workdir: { kind: "path", path: e.modelDirectory },
    title: `3D · ${e.model.name}`,
    draft: d
  });
}
const Fo = { class: "studio-next" }, qo = { class: "studio-next-label" }, To = { class: "studio-next-price" }, No = {
  key: 0,
  class: "studio-next-hint"
}, Do = ["id"], zo = { class: "studio-next-hint" }, Wo = { key: 0 }, Jo = { key: 0 }, Xo = /* @__PURE__ */ Ue({
  __name: "NextSteps",
  props: {
    modelId: {},
    versionId: {},
    openOperation: { default: "" },
    heading: { default: "Доработать модель" }
  },
  emits: ["created"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Xe(), f = Ge(), y = O(""), w = O({}), p = O(!1), m = `studio-step-${bt()}`;
    let P = "", I = !0;
    const c = (g) => `${g.provider}:${g.operation}`, S = G(() => a.offers.find((g) => c(g) === y.value)), E = G(() => [.../* @__PURE__ */ new Set([
      ...ul.map((h) => h.id),
      ...a.offers.map((h) => h.group)
    ])].map((h) => {
      var M;
      return {
        id: h,
        label: ((M = ul.find((B) => B.id === h)) == null ? void 0 : M.label) || "Другие действия",
        offers: a.offers.filter((B) => B.group === h)
      };
    }).filter((h) => h.offers.length)), _ = G(() => {
      var g;
      return (g = a.state) == null ? void 0 : g.providers.find((h) => {
        var M;
        return h.id === ((M = S.value) == null ? void 0 : M.provider);
      });
    }), R = G(() => {
      var g, h;
      return ((h = (g = _.value) == null ? void 0 : g.balance) == null ? void 0 : h.available) ?? null;
    }), C = G(() => {
      var g;
      return ((g = a.quoted) == null ? void 0 : g.quote) || null;
    }), b = G(() => {
      var g;
      return ((g = a.quoted) == null ? void 0 : g.validation) || null;
    }), o = G(() => JSON.stringify([
      a.libraryId,
      l.modelId,
      l.versionId,
      y.value,
      w.value
    ]));
    function v(g) {
      y.value = c(g), w.value = Object.fromEntries(g.fields.map((h) => [h.id, h.default ?? null])), p.value = !1;
    }
    re(() => f.signal, () => {
      a.quoted = null, p.value = !1;
    }, { flush: "sync" }), re(() => [l.modelId, l.versionId, a.libraryId], () => {
      y.value = "", P = "", a.quoted = null, a.loadOffers({ modelId: l.modelId, versionId: l.versionId });
    }, { immediate: !0 }), re(o, () => {
      p.value = !1;
      const g = S.value;
      g ? a.quote({
        modelId: l.modelId,
        versionId: l.versionId,
        provider: g.provider,
        operation: g.operation,
        values: $l(w.value)
      }) : a.quoted = null;
    }), re(() => [l.openOperation, a.offers], () => {
      l.openOperation || (P = "");
      const g = a.offers.find((h) => h.operation === l.openOperation && h.available);
      g && P !== l.openOperation && (v(g), P = l.openOperation);
    }, { immediate: !0 }), Fe(() => {
      I = !1;
    });
    async function r(g) {
      var ae, ne;
      const h = S.value, M = (ae = C.value) == null ? void 0 : ae.total;
      if (!h || M === null || M === void 0 || !b.value)
        return { cancelled: !0 };
      const B = o.value, T = f.signal, le = a.quoted.libraryId, ee = await a.run(le, {
        modelId: l.modelId,
        versionId: l.versionId,
        provider: h.provider,
        operation: h.operation,
        values: JSON.parse(JSON.stringify(b.value.values)),
        expectedPrice: M
      }, g);
      return I && !T.aborted && f.signal === T && B === o.value && "model" in ee && ee.model && d("created", ee.model.id, ((ne = ee.versions[0]) == null ? void 0 : ne.id) ?? l.versionId), ee;
    }
    function n(g) {
      a.quoted && (a.quoted.quote = g), p.value = !0;
    }
    return (g, h) => (i(), V("section", Fo, [
      s("h3", null, $(e.heading), 1),
      (i(!0), V(Y, null, ie(E.value, (M) => (i(), V("section", {
        key: M.id,
        class: "studio-next-group"
      }, [
        s("h4", null, $(M.label), 1),
        (i(!0), V(Y, null, ie(M.offers, (B) => {
          var T, le;
          return i(), V("div", {
            key: c(B),
            class: "studio-next-offer"
          }, [
            U(t(ft), {
              open: y.value === c(B),
              controls: `${m}-${c(B)}`,
              disabled: !B.available,
              "data-context": "studio-next-operation",
              onClick: (ee) => y.value === c(B) ? y.value = "" : v(B)
            }, {
              default: k(() => [
                s("span", qo, $(B.label), 1),
                s("span", To, $(t(Ae)(B.quote.total, B.quote.unit)), 1)
              ]),
              _: 2
            }, 1032, ["open", "controls", "disabled", "onClick"]),
            B.available ? A("", !0) : (i(), V("p", No, $(B.reason), 1)),
            y.value === c(B) && B.available ? (i(), V("div", {
              key: 1,
              id: `${m}-${c(B)}`,
              class: "studio-next-form"
            }, [
              s("p", zo, $(B.providerName) + " · исходная версия сохранится в дереве.", 1),
              U(Kt, {
                modelValue: w.value,
                "onUpdate:modelValue": h[0] || (h[0] = (ee) => w.value = ee),
                fields: B.fields,
                errors: (T = b.value) == null ? void 0 : T.errors
              }, null, 8, ["modelValue", "fields", "errors"]),
              B.note ? (i(), V("p", Wo, $(B.note), 1)) : A("", !0),
              U(ol, {
                quote: C.value,
                validation: b.value,
                balance: R.value,
                "billing-url": (le = _.value) == null ? void 0 : le.billingUrl,
                verb: B.label,
                fingerprint: o.value,
                "disabled-reason": t(a).admitted ? "" : t(f).t("libraryNotReady"),
                execute: r,
                onPriceChanged: n,
                onRefresh: t(a).loadState
              }, null, 8, ["quote", "validation", "balance", "billing-url", "verb", "fingerprint", "disabled-reason", "onRefresh"]),
              p.value ? (i(), D(t(ce), {
                key: 1,
                tone: "warning"
              }, {
                default: k(() => [...h[1] || (h[1] = [
                  q("Цена изменилась. Подтвердите новую цену.", -1)
                ])]),
                _: 1
              })) : A("", !0)
            ], 8, Do)) : A("", !0)
          ]);
        }), 128))
      ]))), 128)),
      E.value.length ? A("", !0) : (i(), V("p", Jo, "Для этой версии пока нет следующих шагов."))
    ]));
  }
}), Go = /* @__PURE__ */ Oe(Xo, [["__scopeId", "data-v-794ffb99"]]), Ho = { class: "studio-save-fields" }, Ko = { class: "studio-save-hint" }, Qo = ["value"], Yo = ["value"], Zo = ["value"], es = ["value"], ts = {
  key: 2,
  class: "studio-save-destination"
}, ls = /* @__PURE__ */ Ue({
  __name: "SaveDialog",
  props: {
    open: { type: Boolean },
    model: {},
    version: {},
    folders: {}
  },
  emits: ["close", "saved", "export"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Xe(), f = Ge(), y = Pt(), w = O([]), p = O(!0), m = O(l.model.project || ""), P = O(""), I = O(""), c = O(""), S = O(""), E = O(!1), _ = O("");
    let R = !0;
    const C = G(() => l.version.files.find((g) => g.id === l.version.mainFileId)), b = G(() => {
      var g, h;
      return ((h = (g = C.value) == null ? void 0 : g.name.split(".").at(-1)) == null ? void 0 : h.toLowerCase()) || "glb";
    }), o = G(() => {
      var g;
      return ((g = w.value.find((h) => h.id === m.value)) == null ? void 0 : g.repos) || [];
    }), v = G(() => JSON.stringify([
      a.libraryId,
      l.model.id,
      l.version.id,
      m.value,
      P.value,
      I.value,
      c.value,
      S.value,
      l.open
    ]));
    re(() => [l.open, l.version.id], () => {
      l.open && (c.value = `${dl(l.model.name)}_${dl(l.version.label)}.${b.value}`, S.value = b.value, _.value = "");
    }, { immediate: !0 }), re(() => [m.value, w.value], () => {
      var h;
      const g = w.value.find((M) => M.id === m.value);
      P.value = (g == null ? void 0 : g.defaultRepoKey) || ((h = g == null ? void 0 : g.repos[0]) == null ? void 0 : h.key) || "";
    }), re(() => [m.value, P.value, l.folders], () => {
      var g, h;
      I.value = ((h = (g = l.folders) == null ? void 0 : g[m.value]) == null ? void 0 : h[P.value]) || "";
    }, { immediate: !0 });
    async function r() {
      const g = _e({ contextSignal: () => f.signal });
      p.value = !0;
      try {
        const h = await y.list();
        R && g() && (w.value = h.filter((M) => !M.archivedAt));
      } catch (h) {
        R && g() && (_.value = `Не удалось загрузить проекты: ${$e(h)}`);
      } finally {
        R && g() && (p.value = !1);
      }
    }
    Ut(r), re(() => f.signal, () => {
      E.value = !1, _.value = "", r();
    }, { flush: "sync" }), Fe(() => {
      R = !1;
    });
    async function n() {
      var le;
      if (E.value || !C.value || S.value !== b.value)
        return;
      const g = v.value, h = _e({ contextSignal: () => f.signal }), M = l.model.id, B = l.version.id, T = {
        projectId: m.value,
        repoKey: P.value,
        folder: I.value,
        fileName: c.value
      };
      E.value = !0, _.value = "";
      try {
        for (let ee = 0; ee < 8; ee += 1) {
          if (!R || !h() || v.value !== g)
            return;
          try {
            const ae = await a.save(M, B, T);
            R && h() && v.value === g && (d("saved", ae.path), d("close"));
            return;
          } catch (ae) {
            const ne = ae;
            if (ne.status !== 409 || !["exists", "changed"].includes(ne.code || "") || !/^[a-f0-9]{64}$/i.test(((le = ne.body) == null ? void 0 : le.sha256) || ""))
              throw ae;
            if (!R || !h() || v.value !== g)
              return;
            const fe = ne.code === "changed" ? "Файл изменился после подтверждения. " : "";
            if (!await et(`${fe}Заменить ${I.value}/${c.value}?
SHA-256: ${ne.body.sha256}`) || !R || !h() || v.value !== g)
              return;
            T.overwrite = !0, T.expectedSha256 = ne.body.sha256;
          }
        }
        throw new Error("Файл продолжает меняться. Повторите сохранение после завершения чужой записи.");
      } catch (ee) {
        R && h() && v.value === g && (_.value = $e(ee));
      } finally {
        R && h() && (E.value = !1);
      }
    }
    return (g, h) => (i(), D(t(tl), {
      open: e.open,
      title: "Сохранить в проект",
      busy: E.value,
      onClose: h[7] || (h[7] = (M) => g.$emit("close"))
    }, {
      footer: k(() => [
        U(t(te), {
          variant: "ghost",
          disabled: E.value,
          onClick: h[6] || (h[6] = (M) => g.$emit("close"))
        }, {
          default: k(() => [...h[12] || (h[12] = [
            q("Отмена", -1)
          ])]),
          _: 1
        }, 8, ["disabled"]),
        U(t(te), {
          loading: E.value,
          disabled: !m.value || !P.value || !c.value || S.value !== b.value,
          onClick: n
        }, {
          default: k(() => [...h[13] || (h[13] = [
            q("Сохранить", -1)
          ])]),
          _: 1
        }, 8, ["loading", "disabled"])
      ]),
      default: k(() => [
        s("div", Ho, [
          s("p", Ko, $(e.model.name) + " · " + $(e.version.label) + ". Готовый файл копируется бесплатно.", 1),
          !p.value && !w.value.length && !_.value ? (i(), D(t(ce), { key: 0 }, {
            default: k(() => [...h[8] || (h[8] = [
              q(" Сначала добавьте проект с репозиторием в разделе «Проекты». Модель останется в библиотеке. ", -1)
            ])]),
            _: 1
          })) : A("", !0),
          U(t(de), { label: "Проект" }, {
            default: k(() => [
              U(t(xe), {
                modelValue: m.value,
                "onUpdate:modelValue": h[0] || (h[0] = (M) => m.value = M),
                disabled: E.value
              }, {
                default: k(() => [
                  h[9] || (h[9] = s("option", { value: "" }, "Выберите проект", -1)),
                  (i(!0), V(Y, null, ie(w.value, (M) => (i(), V("option", {
                    key: M.id,
                    value: M.id
                  }, $(M.title), 9, Qo))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          U(t(de), { label: "Репозиторий" }, {
            default: k(() => [
              U(t(xe), {
                modelValue: P.value,
                "onUpdate:modelValue": h[1] || (h[1] = (M) => P.value = M),
                disabled: E.value
              }, {
                default: k(() => [
                  (i(!0), V(Y, null, ie(o.value, (M) => (i(), V("option", {
                    key: M.key,
                    value: M.key
                  }, $(M.key) + " · " + $(M.dir), 9, Yo))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          U(t(de), {
            label: "Папка",
            hint: "Относительно репозитория"
          }, {
            default: k(() => [
              U(t(st), {
                modelValue: I.value,
                "onUpdate:modelValue": h[2] || (h[2] = (M) => I.value = M),
                "data-context": "studio-save-folder",
                disabled: E.value
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          U(t(de), { label: "Имя файла" }, {
            default: k(() => [
              U(t(st), {
                modelValue: c.value,
                "onUpdate:modelValue": h[3] || (h[3] = (M) => c.value = M),
                disabled: E.value
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          U(t(de), { label: "Формат" }, {
            default: k(() => [
              U(t(xe), {
                modelValue: S.value,
                "onUpdate:modelValue": h[4] || (h[4] = (M) => S.value = M),
                disabled: E.value
              }, {
                default: k(() => [
                  s("option", { value: b.value }, $(b.value.toUpperCase()) + " · бесплатно", 9, Zo),
                  (i(!0), V(Y, null, ie(["glb", "fbx", "obj", "stl"].filter((M) => M !== b.value), (M) => (i(), V("option", {
                    key: M,
                    value: M
                  }, $(M.toUpperCase()), 9, es))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          S.value !== b.value ? (i(), D(t(ce), { key: 1 }, {
            default: k(() => [
              h[11] || (h[11] = q(" Другой формат подготовьте шагом «Экспорт». Стоимость будет показана перед запуском. ", -1)),
              U(t(te), {
                variant: "ghost",
                onClick: h[5] || (h[5] = (M) => g.$emit("export"))
              }, {
                default: k(() => [...h[10] || (h[10] = [
                  q("Открыть «Экспорт»", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })) : A("", !0),
          m.value && P.value ? (i(), V("div", ts, [
            s("span", null, "Файл появится в репозитории " + $(P.value), 1),
            s("strong", null, $([I.value, c.value].filter(Boolean).join("/")), 1)
          ])) : A("", !0),
          _.value ? (i(), D(t(ce), {
            key: 3,
            tone: "danger"
          }, {
            default: k(() => [
              q($(_.value), 1)
            ]),
            _: 1
          })) : A("", !0)
        ])
      ]),
      _: 1
    }, 8, ["open", "busy"]));
  }
}), as = /* @__PURE__ */ Oe(ls, [["__scopeId", "data-v-844d7ff6"]]), ns = ["value"], os = /* @__PURE__ */ Ue({
  __name: "ModelEditDialog",
  props: {
    open: { type: Boolean },
    model: {}
  },
  emits: ["close"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Xe(), f = Ge(), y = Pt(), w = O(""), p = O(""), m = O(""), P = O([]), I = O(!1), c = O(""), S = G(() => `${a.libraryId}:${l.model.id}:${l.open}`);
    let E = !0;
    re(() => f.signal, () => {
      I.value = !1, c.value = "";
    }, { flush: "sync" }), Fe(() => {
      E = !1;
    }), re(S, async () => {
      if (w.value = l.model.name, p.value = l.model.category ?? "", m.value = l.model.project ?? "", c.value = "", I.value = !1, !l.open)
        return;
      const R = S.value, C = _e({ contextSignal: () => f.signal });
      try {
        const b = await y.list();
        E && C() && R === S.value && (P.value = b.filter((o) => !o.archivedAt));
      } catch {
        E && C() && R === S.value && (c.value = "Не удалось загрузить список проектов.");
      }
    }, { immediate: !0 });
    async function _() {
      if (I.value || !w.value.trim())
        return;
      const R = S.value, C = _e({ contextSignal: () => f.signal });
      I.value = !0, c.value = "";
      try {
        await a.patchModel(l.model.id, {
          name: w.value.trim(),
          category: p.value || null,
          project: m.value || null
        }), E && C() && R === S.value && d("close");
      } catch (b) {
        E && C() && R === S.value && (c.value = $e(b));
      } finally {
        E && C() && R === S.value && (I.value = !1);
      }
    }
    return (R, C) => (i(), D(t(tl), {
      open: e.open,
      title: "Переименовать модель",
      busy: I.value,
      onClose: C[4] || (C[4] = (b) => R.$emit("close"))
    }, {
      footer: k(() => [
        U(t(te), {
          variant: "ghost",
          disabled: I.value,
          onClick: C[3] || (C[3] = (b) => R.$emit("close"))
        }, {
          default: k(() => [...C[7] || (C[7] = [
            q("Отмена", -1)
          ])]),
          _: 1
        }, 8, ["disabled"]),
        U(t(te), {
          disabled: !w.value.trim() || I.value,
          loading: I.value,
          "data-context": "studio-model-save",
          onClick: _
        }, {
          default: k(() => [...C[8] || (C[8] = [
            q("Сохранить", -1)
          ])]),
          _: 1
        }, 8, ["disabled", "loading"])
      ]),
      default: k(() => [
        U(t(de), { label: "Имя" }, {
          default: k(() => [
            U(t(st), {
              modelValue: w.value,
              "onUpdate:modelValue": C[0] || (C[0] = (b) => w.value = b),
              maxlength: 200,
              disabled: I.value,
              "data-context": "studio-model-name"
            }, null, 8, ["modelValue", "disabled"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Категория" }, {
          default: k(() => [
            U(t(xe), {
              modelValue: p.value,
              "onUpdate:modelValue": C[1] || (C[1] = (b) => p.value = b),
              disabled: I.value,
              "data-context": "studio-model-category"
            }, {
              default: k(() => [...C[5] || (C[5] = [
                s("option", { value: "" }, "Без категории", -1),
                s("option", { value: "character" }, "Персонаж", -1),
                s("option", { value: "prop" }, "Предмет", -1),
                s("option", { value: "part" }, "Часть", -1),
                s("option", { value: "scene" }, "Сцена", -1)
              ])]),
              _: 1
            }, 8, ["modelValue", "disabled"])
          ]),
          _: 1
        }),
        U(t(de), { label: "Проект" }, {
          default: k(() => [
            U(t(xe), {
              modelValue: m.value,
              "onUpdate:modelValue": C[2] || (C[2] = (b) => m.value = b),
              disabled: I.value,
              "data-context": "studio-model-project"
            }, {
              default: k(() => [
                C[6] || (C[6] = s("option", { value: "" }, "Без проекта", -1)),
                (i(!0), V(Y, null, ie(P.value, (b) => (i(), V("option", {
                  key: b.id,
                  value: b.id
                }, $(b.title), 9, ns))), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "disabled"])
          ]),
          _: 1
        }),
        c.value ? (i(), D(t(ce), {
          key: 0,
          tone: "danger"
        }, {
          default: k(() => [
            q($(c.value), 1)
          ]),
          _: 1
        })) : A("", !0)
      ]),
      _: 1
    }, 8, ["open", "busy"]));
  }
});
async function ss() {
  return (await import("./engine-DV5rkOfA.js")).createEngine;
}
const is = ["aria-label"], rs = {
  class: "studio-view-tools",
  "aria-label": "Инструменты просмотра"
}, us = { class: "studio-view-actions" }, ds = { class: "studio-view-structure" }, cs = { key: 1 }, vs = { key: 4 }, fs = { class: "studio-canvas-pane" }, ms = {
  key: 0,
  class: "studio-canvas-label"
}, ps = {
  key: 0,
  class: "studio-canvas-pane"
}, gs = {
  key: 6,
  class: "studio-animation"
}, bs = { class: "studio-animation-clip" }, ys = ["value"], hs = {
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, ws = ["d"], ks = { class: "studio-animation-speed" }, $s = { class: "studio-view-status" }, xs = { class: "studio-view-stats" }, Is = { class: "studio-view-format" }, Vs = { key: 0 }, Ss = { key: 1 }, Cs = { key: 2 }, Us = /* @__PURE__ */ Ue({
  __name: "ModelViewer",
  props: {
    ownApiPrefix: {},
    src: {},
    ext: {},
    name: { default: "" },
    compareSrc: { default: "" },
    compareExt: { default: "" },
    autoSnapshot: { type: Boolean, default: !1 }
  },
  emits: ["snapshot", "loaded", "error"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = O(null), f = O(null), y = O(null), w = Ze(null), p = O(!1), m = O(""), P = O(""), I = O(""), c = O(!1), S = `studio-view-options-${bt()}`, E = O(!1), _ = [
      { value: "texture", label: "Текстуры" },
      { value: "clay", label: "Глина" },
      { value: "wire", label: "Сетка" }
    ], R = O({ loaded: 0, total: null }), C = O("texture"), b = O(!1), o = O(!1), v = O("dark"), r = O("studio"), n = O(""), g = O(!1), h = O(0), M = O("1"), B = G(() => {
      var z, X;
      return ((X = (z = w.value) == null ? void 0 : z.clips.find((Ce) => Ce.name === n.value)) == null ? void 0 : X.duration) || 0;
    });
    let T = [], le = "", ee = [], ae = 0, ne = !0, fe = !0, ue = null, K = null;
    const N = (z) => T.forEach((X) => {
      X && z(X);
    }), J = () => N((z) => z.setMode(C.value)), pe = () => N((z) => z.showBones(b.value)), Se = () => N((z) => z.showParts(o.value)), ke = () => N((z) => z.setBackground(v.value)), ve = () => N((z) => z.setLight(r.value)), qe = () => N((z) => z.setSpeed(Number(M.value))), Te = () => N((z) => z.fitView()), me = () => N((z) => z.setVisible(fe && !document.hidden));
    async function Le() {
      var Ce;
      const z = ++ae, X = l.ownApiPrefix;
      ee.forEach((H) => H()), ee = [], p.value = !0, m.value = "", P.value = "", w.value = null, n.value = "", g.value = !1, h.value = 0, R.value = { loaded: 0, total: null };
      try {
        await xl();
        const H = await ss();
        if (!ne || z !== ae || !f.value)
          return;
        le !== X && (N((ye) => ye.dispose()), T = [], le = X);
        const Ie = {
          ownApiPrefix: X,
          onError: (ye) => {
            ne && Pe(ye);
          },
          onProgress: (ye, Ne) => {
            ne && (R.value = { loaded: ye, total: Ne });
          }
        };
        T[0] || (T[0] = H(f.value, Ie)), l.compareSrc && y.value && !T[1] && (T[1] = H(y.value, {
          ...Ie,
          onError: (ye) => {
            ne && Je(ye);
          }
        })), !l.compareSrc && T[1] && (T[1].dispose(), T[1] = null);
        let Me = null;
        ee.push(T[0].onCameraChange((ye) => {
          var Ne;
          Me = ye, (Ne = T[1]) == null || Ne.syncCamera(ye);
        })), T[1] && ee.push(T[1].onCameraChange((ye) => {
          var Ne;
          return (Ne = T[0]) == null ? void 0 : Ne.syncCamera(ye);
        })), ee.push(T[0].onTimeChange((ye) => {
          ne && z === ae && (h.value = ye);
        })), N((ye) => ye.resize()), me();
        const Ke = (Ce = T[1]) == null ? void 0 : Ce.load(l.compareSrc, l.compareExt || l.ext).catch((ye) => {
          ne && z === ae && Je($e(ye));
        }), [be] = await Promise.all([T[0].load(l.src, l.ext), Ke]);
        if (!ne || z !== ae)
          return;
        w.value = be, Me && T[1] && T[1].syncCamera(Me), J(), pe(), Se(), ke(), ve(), qe(), p.value = !1, d("loaded", be), l.autoSnapshot && await F();
      } catch (H) {
        ne && z === ae && (Pe($e(H)), N((Ie) => Ie.dispose()), T = []);
      } finally {
        ne && z === ae && (p.value = !1);
      }
    }
    function Je(z) {
      var X;
      P.value = z, (X = T[1]) == null || X.dispose(), T[1] = null;
    }
    function Pe(z) {
      m.value = z, p.value = !1, d("error", z);
    }
    function He() {
      g.value = !!n.value, N((z) => z.playClip(n.value || null));
    }
    function je() {
      g.value = !g.value, N((z) => z.playClip(g.value ? n.value : null));
    }
    function Ee(z) {
      h.value = z, N((X) => X.setTime(z));
    }
    async function F() {
      const z = ae, X = l.src, Ce = T[0];
      if (!(!Ce || !w.value || p.value))
        try {
          const H = await Ce.snapshot();
          ne && z === ae && l.src === X && d("snapshot", H);
        } catch (H) {
          ne && z === ae && Pe($e(H));
        }
    }
    async function x() {
      var z;
      I.value = "";
      try {
        document.fullscreenElement === a.value ? await document.exitFullscreen() : await ((z = a.value) == null ? void 0 : z.requestFullscreen());
      } catch (X) {
        I.value = `Полноэкранный режим недоступен: ${$e(X)}`;
      }
    }
    function se() {
      E.value = document.fullscreenElement === a.value;
    }
    return re(() => [l.ownApiPrefix, l.src, l.ext, l.compareSrc, l.compareExt], () => {
      Le();
    }, { flush: "post" }), Ut(() => {
      ue = new ResizeObserver(() => N((z) => z.resize())), a.value && ue.observe(a.value), f.value && ue.observe(f.value), typeof IntersectionObserver < "u" && (K = new IntersectionObserver((z) => {
        var X;
        fe = !!((X = z[0]) != null && X.isIntersecting), me();
      }), a.value && K.observe(a.value)), document.addEventListener("visibilitychange", me), document.addEventListener("fullscreenchange", se), Le();
    }), Fe(() => {
      ne = !1, ae += 1, ee.forEach((z) => z()), ee = [], ue == null || ue.disconnect(), K == null || K.disconnect(), document.removeEventListener("visibilitychange", me), document.removeEventListener("fullscreenchange", se), N((z) => z.dispose()), T = [], document.fullscreenElement === a.value && document.exitFullscreen().catch(() => {
      });
    }), (z, X) => {
      var Ce, H, Ie, Me, Ke;
      return i(), V("section", {
        ref_key: "host",
        ref: a,
        class: "studio-viewer",
        "aria-label": e.name || "Просмотр модели"
      }, [
        s("div", rs, [
          U(t(Jt), {
            modelValue: C.value,
            "onUpdate:modelValue": [
              X[0] || (X[0] = (be) => C.value = be),
              J
            ],
            "data-context": "studio-view-mode",
            label: "Отображение модели",
            options: _
          }, null, 8, ["modelValue"]),
          s("div", us, [
            De((i(), D(t(at), {
              label: "Настройки вида",
              "data-context": "studio-view-tool",
              pressed: c.value,
              "aria-expanded": c.value,
              "aria-controls": S,
              onClick: X[1] || (X[1] = (be) => c.value = !c.value)
            }, {
              default: k(() => [...X[8] || (X[8] = [
                s("svg", {
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "M4 7h8m4 0h4M4 17h2m4 0h10" }),
                  s("circle", {
                    cx: "14",
                    cy: "7",
                    r: "2"
                  }),
                  s("circle", {
                    cx: "8",
                    cy: "17",
                    r: "2"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["pressed", "aria-expanded"])), [
              [t(dt), "Фон, освещение и структура"]
            ]),
            De((i(), D(t(at), {
              label: "Вписать модель",
              "data-context": "studio-view-tool",
              disabled: !w.value || p.value,
              onClick: Te
            }, {
              default: k(() => [...X[9] || (X[9] = [
                s("svg", {
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" }),
                  s("rect", {
                    x: "8",
                    y: "8",
                    width: "8",
                    height: "8",
                    rx: "1"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["disabled"])), [
              [t(dt), "Вписать модель в окно"]
            ]),
            De((i(), D(t(at), {
              label: "Снимок",
              "data-context": "studio-view-tool",
              disabled: p.value || !w.value || !!m.value,
              onClick: F
            }, {
              default: k(() => [...X[10] || (X[10] = [
                s("svg", {
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "M8 6l2-2h4l2 2h4v14H4V6z" }),
                  s("circle", {
                    cx: "12",
                    cy: "13",
                    r: "4"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["disabled"])), [
              [t(dt), "Сохранить текущий ракурс как превью"]
            ]),
            De((i(), D(t(at), {
              label: E.value ? "Выйти из полного экрана" : "Во весь экран",
              "data-context": "studio-view-tool",
              pressed: E.value,
              onClick: x
            }, {
              default: k(() => [...X[11] || (X[11] = [
                s("svg", {
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  s("path", { d: "M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" })
                ], -1)
              ])]),
              _: 1
            }, 8, ["label", "pressed"])), [
              [t(dt), E.value ? "Выйти из полного экрана" : "Во весь экран"]
            ])
          ])
        ]),
        De(s("div", {
          id: S,
          class: "studio-view-options"
        }, [
          U(t(de), { label: "Фон" }, {
            default: k(() => [
              U(t(xe), {
                modelValue: v.value,
                "onUpdate:modelValue": [
                  X[2] || (X[2] = (be) => v.value = be),
                  ke
                ],
                "aria-label": "Фон"
              }, {
                default: k(() => [...X[12] || (X[12] = [
                  s("option", { value: "dark" }, "Тёмный", -1),
                  s("option", { value: "light" }, "Светлый", -1),
                  s("option", { value: "checker" }, "Клетка", -1)
                ])]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          U(t(de), { label: "Освещение" }, {
            default: k(() => [
              U(t(xe), {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  X[3] || (X[3] = (be) => r.value = be),
                  ve
                ],
                "aria-label": "Свет"
              }, {
                default: k(() => [...X[13] || (X[13] = [
                  s("option", { value: "studio" }, "Студийное", -1),
                  s("option", { value: "flat" }, "Ровное", -1)
                ])]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          s("div", ds, [
            U(t(vl), {
              modelValue: b.value,
              "onUpdate:modelValue": [
                X[4] || (X[4] = (be) => b.value = be),
                pe
              ],
              "data-context": "studio-bones"
            }, {
              default: k(() => [...X[14] || (X[14] = [
                q(" Кости ", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            U(t(vl), {
              modelValue: o.value,
              "onUpdate:modelValue": [
                X[5] || (X[5] = (be) => o.value = be),
                Se
              ]
            }, {
              default: k(() => [...X[15] || (X[15] = [
                q("Разделить части цветом", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ], 512), [
          [nt, c.value]
        ]),
        p.value ? (i(), D(t(Et), {
          key: 0,
          value: R.value.total ? R.value.loaded / R.value.total * 100 : 0,
          indeterminate: !R.value.total,
          label: "Загрузка модели"
        }, null, 8, ["value", "indeterminate"])) : A("", !0),
        p.value ? (i(), V("p", cs, "Загрузка и разбор модели…")) : A("", !0),
        m.value ? (i(), D(t(ce), {
          key: 2,
          tone: "danger"
        }, {
          default: k(() => [
            q("Не удалось показать модель: " + $(m.value) + ". ", 1),
            U(t(el), {
              href: e.src,
              download: ""
            }, {
              default: k(() => [...X[16] || (X[16] = [
                q("Скачать файл", -1)
              ])]),
              _: 1
            }, 8, ["href"])
          ]),
          _: 1
        })) : A("", !0),
        P.value ? (i(), D(t(ce), {
          key: 3,
          tone: "warning"
        }, {
          default: k(() => [
            q(" Не удалось показать сравнение: " + $(P.value) + ".", 1)
          ]),
          _: 1
        })) : A("", !0),
        (Ce = w.value) != null && Ce.splat ? (i(), V("p", vs, "Ограниченный предпросмотр splat облаком точек; гауссианы не отрисовываются.")) : A("", !0),
        I.value ? (i(), D(t(ce), {
          key: 5,
          tone: "warning"
        }, {
          default: k(() => [
            q($(I.value), 1)
          ]),
          _: 1
        })) : A("", !0),
        s("div", {
          class: We(["studio-canvases", { "studio-compare": e.compareSrc && !P.value }])
        }, [
          s("div", fs, [
            e.compareSrc && !P.value ? (i(), V("span", ms, "Текущая версия")) : A("", !0),
            s("canvas", {
              ref_key: "primary",
              ref: f,
              "aria-label": "Модель"
            }, null, 512)
          ]),
          e.compareSrc && !P.value ? (i(), V("div", ps, [
            X[17] || (X[17] = s("span", { class: "studio-canvas-label" }, "Сравнение", -1)),
            s("canvas", {
              ref_key: "secondary",
              ref: y,
              "aria-label": "Сравниваемая модель"
            }, null, 512)
          ])) : A("", !0)
        ], 2),
        (H = w.value) != null && H.clips.length ? (i(), V("div", gs, [
          s("div", bs, [
            U(t(xe), {
              modelValue: n.value,
              "onUpdate:modelValue": [
                X[6] || (X[6] = (be) => n.value = be),
                He
              ],
              "data-context": "studio-clip",
              "aria-label": "Движение"
            }, {
              default: k(() => [
                X[18] || (X[18] = s("option", { value: "" }, "Без движения", -1)),
                (i(!0), V(Y, null, ie(w.value.clips, (be) => (i(), V("option", {
                  key: be.name,
                  value: be.name
                }, $(be.name), 9, ys))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          De((i(), D(t(at), {
            label: g.value ? "Пауза" : "Пуск",
            "data-context": "studio-view-tool",
            disabled: !n.value,
            onClick: je
          }, {
            default: k(() => [
              (i(), V("svg", hs, [
                s("path", {
                  d: g.value ? "M8 5v14M16 5v14" : "M7 4l14 8-14 8z"
                }, null, 8, ws)
              ]))
            ]),
            _: 1
          }, 8, ["label", "disabled"])), [
            [t(dt), g.value ? "Пауза" : "Пуск"]
          ]),
          U(t(ea), {
            "model-value": h.value,
            min: 0,
            max: B.value,
            step: 0.01,
            disabled: !n.value,
            class: "studio-animation-time",
            "aria-label": "Время движения",
            "onUpdate:modelValue": Ee
          }, null, 8, ["model-value", "max", "disabled"]),
          s("span", null, $(h.value.toFixed(1)) + " / " + $(B.value.toFixed(1)) + " с", 1),
          s("div", ks, [
            U(t(xe), {
              modelValue: M.value,
              "onUpdate:modelValue": [
                X[7] || (X[7] = (be) => M.value = be),
                qe
              ],
              "data-context": "studio-speed",
              "aria-label": "Скорость движения"
            }, {
              default: k(() => [...X[19] || (X[19] = [
                s("option", { value: "0.5" }, "0,5×", -1),
                s("option", { value: "1" }, "1×", -1),
                s("option", { value: "1.5" }, "1,5×", -1),
                s("option", { value: "2" }, "2×", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ])) : A("", !0),
        s("footer", $s, [
          s("div", xs, [
            s("span", Is, $(e.ext.toUpperCase()), 1),
            typeof ((Ie = w.value) == null ? void 0 : Ie.stats.triangles) == "number" ? (i(), V("span", Vs, $(w.value.stats.triangles.toLocaleString("ru-RU")) + " треуг. ", 1)) : A("", !0),
            (Me = w.value) != null && Me.stats.bones ? (i(), V("span", Ss, "Кости: " + $(w.value.stats.bones), 1)) : A("", !0),
            (Ke = w.value) != null && Ke.clips.length ? (i(), V("span", Cs, "Движения: " + $(w.value.clips.length), 1)) : A("", !0)
          ]),
          X[20] || (X[20] = s("span", { class: "studio-view-help" }, "Вращение — перетаскивание · Масштаб — прокрутка", -1))
        ])
      ], 8, is);
    };
  }
}), _s = /* @__PURE__ */ Oe(Us, [["__scopeId", "data-v-4d8ca8af"]]), Es = { class: "studio-model-heading" }, Ms = { class: "studio-model-title" }, Os = { class: "studio-model-breadcrumb" }, Ps = { class: "studio-model-version" }, Rs = ["data-status"], As = { key: 3 }, Ls = {
  key: 3,
  class: "studio-gallery"
}, js = ["src", "alt"], Bs = { key: 5 }, Fs = { class: "studio-model-result" }, qs = {
  key: 0,
  class: "studio-model-hint"
}, Ts = { class: "studio-model-properties" }, Ns = { key: 0 }, Ds = { class: "studio-model-section" }, zs = ["id"], Ws = ["value"], Js = { class: "studio-model-section" }, Xs = ["id"], Gs = {
  key: 0,
  class: "studio-version-params"
}, Hs = { class: "studio-model-section" }, Ks = ["id"], Qs = { key: 1 }, Ys = /* @__PURE__ */ Ue({
  __name: "ModelPage",
  props: {
    section: { default: "viewer" },
    compareVersionId: { default: "" },
    showSaveShortcut: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !0 }
  },
  emits: ["created", "tasks", "save", "compare"],
  setup(e, { expose: u, emit: l }) {
    const d = e, a = Xe(), f = Ge(), y = () => Vl(f.api, zt(f.pluginId)), w = O(""), p = O(!1), m = O(!1), P = O(!1), I = O(""), c = O(""), S = O(!1), E = O(!1), _ = O(!1), R = O(""), C = `studio-model-${bt()}`, b = O(null), o = O(null);
    let v = !0;
    const r = G(() => a.detail), n = G(() => {
      var F;
      return (F = r.value) == null ? void 0 : F.versions.find((x) => x.id === a.selectedVersion);
    }), g = G(() => {
      var F;
      return (F = n.value) == null ? void 0 : F.files.find((x) => {
        var se;
        return x.id === ((se = n.value) == null ? void 0 : se.mainFileId);
      });
    }), h = G(() => {
      var F;
      return ((F = g.value) == null ? void 0 : F.name.split(".").at(-1)) || "glb";
    }), M = G(() => {
      var F;
      return ["image", "views"].includes(((F = n.value) == null ? void 0 : F.kind) ?? "");
    }), B = G(() => {
      var F, x;
      return I.value || (((F = n.value) == null ? void 0 : F.kind) === "image" ? "image-to-model" : ((x = n.value) == null ? void 0 : x.kind) === "views" ? "views-to-model" : "");
    }), T = G(() => {
      var F;
      return ((F = n.value) == null ? void 0 : F.status) === "ready" ? M.value ? "Исходник готов" : g.value ? "Готово к использованию" : "Файлы не загружены" : n.value && $t.includes(n.value.status) && n.value.status !== "unknown" ? "Работа продолжается" : "Заказ требует внимания";
    }), le = G(() => {
      var F;
      return ((F = n.value) == null ? void 0 : F.status) !== "ready" ? "Статус и расходы доступны в «Задачах». Переключение вкладок не прерывает работу." : M.value ? "Проверьте изображение. Следующим шагом можно создать по нему объёмную модель." : g.value ? "Сохраните эту версию в проект или доработайте её отдельным шагом." : "История сохранена. Попробуйте «Скачать снова» в управлении файлами, если у версии есть облачный заказ.";
    }), ee = G(() => {
      var F;
      return ((F = n.value) == null ? void 0 : F.files.filter((x) => /\.(png|jpe?g|webp)$/i.test(x.name))) || [];
    }), ae = G(() => {
      var F;
      return ((F = r.value) == null ? void 0 : F.versions.filter((x) => {
        var se;
        return x.id !== ((se = n.value) == null ? void 0 : se.id) && x.mainFileId && !["image", "views"].includes(x.kind);
      })) || [];
    }), ne = G(() => {
      const F = ae.value.find((x) => x.id === d.compareVersionId);
      return F == null ? void 0 : F.files.find((x) => x.id === F.mainFileId);
    }), fe = G(() => {
      var F;
      return (F = a.state) == null ? void 0 : F.providers.find((x) => {
        var se;
        return x.id === ((se = n.value) == null ? void 0 : se.provider);
      });
    }), ue = G(() => {
      var F, x;
      return ((x = (F = fe.value) == null ? void 0 : F.balance) == null ? void 0 : x.available) ?? null;
    }), K = G(() => {
      var F;
      return ((F = n.value) == null ? void 0 : F.status) === "waiting" && !!n.value.intentId && !!n.value.childId;
    }), N = O(0), J = G(() => {
      var F, x;
      return [
        N.value,
        a.libraryId,
        (F = r.value) == null ? void 0 : F.model.id,
        (x = n.value) == null ? void 0 : x.id
      ].join(":");
    }), pe = G(() => {
      var F, x;
      return ((F = n.value) == null ? void 0 : F.etaSeconds) === null ? "" : `≈ ${Math.max(1, Math.ceil((((x = n.value) == null ? void 0 : x.etaSeconds) || 0) / 60))} мин`;
    });
    re(() => f.signal, () => {
      N.value += 1, p.value = !1;
    }, { flush: "sync" }), re(() => a.admitted, (F) => {
      F || (b.value = null, o.value = null);
    }), re(J, () => {
      P.value = !1, m.value = !1, R.value = "", I.value = "", w.value = "", b.value = null, o.value = null, c.value = "";
    }), re(() => d.compareVersionId, (F) => {
      F && (S.value = !0);
    }), Fe(() => {
      v = !1;
    });
    function Se() {
      m.value = !1, I.value = "export";
    }
    function ke() {
      I.value = "", m.value = !0;
    }
    u({ openSave: ke });
    async function ve(F) {
      if (p.value)
        return;
      const x = J.value;
      p.value = !0, w.value = "";
      try {
        await F();
      } catch (se) {
        v && J.value === x && (w.value = se.code === "has_children" ? "Сначала удалите версии, сделанные из этой." : $e(se));
      } finally {
        v && J.value === x && (p.value = !1);
      }
    }
    async function qe() {
      var se;
      const F = (se = r.value) == null ? void 0 : se.model, x = J.value;
      F && await ve(async () => {
        await et(`Удалить модель «${F.name}» и все её версии?`) && v && x === J.value && await a.deleteModel(F.id);
      });
    }
    async function Te(F) {
      var z, X;
      const x = (z = r.value) == null ? void 0 : z.model.id, se = (X = n.value) == null ? void 0 : X.id;
      x && await ve(() => a.addFromFile(x, { incoming: F, parentVersionId: se }));
    }
    async function me() {
      var z;
      const F = (z = r.value) == null ? void 0 : z.model.id, x = n.value, se = J.value;
      !F || !x || !await et(`Удалить версию «${x.label}»?`) || v && J.value === se && await ve(() => a.deleteVersion(F, x.id));
    }
    async function Le() {
      const F = r.value, x = n.value, se = J.value;
      if (!F || !x)
        return;
      const z = F.model.mainVersion === x.id;
      await et(`Облегчить ${z ? "основную " : ""}версию «${x.label}»? Локальные файлы будут удалены, история сохранится.`) && v && J.value === se && await ve(() => a.lighten(F.model.id, x.id, z));
    }
    async function Je() {
      const F = n.value, x = J.value;
      if (!(F != null && F.intentId) || !F.childId)
        return;
      const se = F.intentId, z = F.childId;
      await et(`Отменить заказ «${F.label}»? Он ещё не отправлен, оплаты не было.`) && v && J.value === x && await ve(() => a.closeUnknownChild(se, z));
    }
    async function Pe() {
      const F = r.value, x = n.value, se = J.value;
      !F || !x || v && se === J.value && await ve(() => Bo(F, x, f));
    }
    async function He() {
      const F = n.value, x = r.value, se = J.value;
      !(F != null && F.provider) || !F.operation || !x || await ve(async () => {
        const z = await y().quote({
          libraryId: a.libraryId,
          modelId: x.model.id,
          versionId: F.id,
          provider: F.provider,
          operation: F.operation,
          values: F.params
        });
        v && J.value === se && (b.value = z.quote, o.value = z.validation);
      });
    }
    async function je(F) {
      var x;
      return !n.value || !r.value || ((x = b.value) == null ? void 0 : x.total) === null || !b.value ? { cancelled: !0 } : a.retry(
        r.value.libraryId,
        r.value.model.id,
        n.value.id,
        b.value.total,
        F
      );
    }
    const Ee = G(() => {
      const F = n.value, x = r.value, se = J.value;
      return async (z) => {
        !F || !x || !v || se !== J.value || await ve(async () => {
          await y().preview(x.model.id, F.id, x.libraryId, z), v && se === J.value && await a.openModel(x.model.id, F.id);
        });
      };
    });
    return (F, x) => {
      var se, z, X, Ce;
      return r.value && n.value ? (i(), V("section", {
        key: 0,
        class: We(["studio-model-page", { "is-inspector": e.section === "details" }])
      }, [
        e.section === "viewer" ? (i(), V(Y, { key: 0 }, [
          s("header", Es, [
            s("div", Ms, [
              s("span", Os, "Модели / " + $(n.value.label), 1),
              s("h2", null, $(r.value.model.name), 1)
            ]),
            s("div", Ps, [
              s("span", null, "v" + $(String(n.value.seq).padStart(2, "0")), 1),
              s("span", {
                class: "studio-model-status",
                "data-status": n.value.status
              }, $(t(vt)[n.value.status]), 9, Rs)
            ]),
            n.value.status === "ready" && g.value ? (i(), V("div", {
              key: 0,
              class: We(["studio-model-shortcuts", { "is-forced": e.showSaveShortcut }])
            }, [
              U(t(te), {
                tone: "accent",
                variant: "solid",
                onClick: x[0] || (x[0] = (H) => F.$emit("save"))
              }, {
                default: k(() => [...x[19] || (x[19] = [
                  q("Сохранить в проект", -1)
                ])]),
                _: 1
              })
            ], 2)) : A("", !0)
          ]),
          (i(!0), V(Y, null, ie(r.value.incoming, (H) => (i(), D(t(ce), { key: H }, {
            default: k(() => [
              q(" Агент положил " + $(H) + " — добавить версией? ", 1),
              U(t(te), {
                variant: "ghost",
                disabled: p.value,
                onClick: (Ie) => Te(H)
              }, {
                default: k(() => [...x[20] || (x[20] = [
                  q("Добавить версией", -1)
                ])]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ]),
            _: 2
          }, 1024))), 128)),
          t($t).includes(n.value.status) && n.value.status !== "unknown" ? (i(), V(Y, { key: 0 }, [
            U(t(Et), {
              value: n.value.progress,
              label: `Прогресс ${n.value.label}`
            }, null, 8, ["value", "label"]),
            s("p", null, $(t(vt)[n.value.status]) + " · " + $(pe.value) + " " + $(n.value.waitReason), 1),
            x[22] || (x[22] = s("p", { class: "studio-model-hint" }, "Можно продолжать работу в других вкладках. Результат останется в библиотеке.", -1)),
            n.value.waitReason === t(St) ? (i(), D(t(te), {
              key: 0,
              onClick: x[1] || (x[1] = (H) => F.$emit("tasks"))
            }, {
              default: k(() => [...x[21] || (x[21] = [
                q(" Разобрать заказ", -1)
              ])]),
              _: 1
            })) : A("", !0)
          ], 64)) : n.value.status === "unknown" ? (i(), D(t(ce), {
            key: 1,
            tone: "warning"
          }, {
            default: k(() => [
              x[24] || (x[24] = q(" Исход отправки неизвестен. Повторная оплата заблокирована. ", -1)),
              U(t(te), {
                onClick: x[2] || (x[2] = (H) => F.$emit("tasks"))
              }, {
                default: k(() => [...x[23] || (x[23] = [
                  q("Разобрать заказ", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })) : n.value.status === "failed" || n.value.status === "unresolved" ? (i(), V(Y, { key: 2 }, [
            U(t(ce), { tone: "danger" }, {
              default: k(() => {
                var H;
                return [
                  q($(((H = n.value.error) == null ? void 0 : H.message) || t(vt)[n.value.status]) + " · " + $(t(xt)(n.value.cost)), 1)
                ];
              }),
              _: 1
            }),
            n.value.task && n.value.status !== "unresolved" ? (i(), D(t(te), {
              key: 0,
              disabled: p.value,
              onClick: x[3] || (x[3] = (H) => ve(() => t(a).redownload(r.value.model.id, n.value.id)))
            }, {
              default: k(() => [...x[25] || (x[25] = [
                q("Скачать снова", -1)
              ])]),
              _: 1
            }, 8, ["disabled"])) : A("", !0),
            n.value.retryAvailable && !b.value ? (i(), D(t(te), {
              key: 1,
              disabled: p.value,
              onClick: He
            }, {
              default: k(() => [...x[26] || (x[26] = [
                q("Узнать цену повторного заказа", -1)
              ])]),
              _: 1
            }, 8, ["disabled"])) : A("", !0),
            b.value ? (i(), D(ol, {
              key: 2,
              quote: b.value,
              validation: o.value,
              balance: ue.value,
              "billing-url": (se = fe.value) == null ? void 0 : se.billingUrl,
              verb: "Повторить заказ",
              fingerprint: `${r.value.libraryId}:${n.value.id}:retry`,
              "disabled-reason": t(a).admitted ? "" : t(f).t("libraryNotReady"),
              execute: je,
              onPriceChanged: x[4] || (x[4] = (H) => b.value = H)
            }, null, 8, ["quote", "validation", "balance", "billing-url", "fingerprint", "disabled-reason"])) : A("", !0),
            n.value.retryReason ? (i(), V("p", As, $(n.value.retryReason), 1)) : A("", !0)
          ], 64)) : n.value.kind === "image" || n.value.kind === "views" ? (i(), V("div", Ls, [
            (i(!0), V(Y, null, ie(ee.value, (H) => (i(), V("figure", {
              key: H.id
            }, [
              s("img", {
                src: H.url,
                alt: t(Vt)[H.role]
              }, null, 8, js),
              s("figcaption", null, $(t(Vt)[H.role] || "Картинка"), 1)
            ]))), 128))
          ])) : g.value ? (i(), V(Y, { key: 4 }, [
            e.active ? zl(F.$slots, "viewer", {
              src: g.value.url,
              ext: h.value,
              modelName: r.value.model.name,
              compareSrc: (z = ne.value) == null ? void 0 : z.url,
              compareExt: (X = ne.value) == null ? void 0 : X.name.split(".").at(-1),
              autoSnapshot: !n.value.preview,
              snapshot: Ee.value
            }, () => {
              var H, Ie;
              return [
                (i(), D(_s, {
                  key: `${r.value.libraryId}:${n.value.id}`,
                  src: g.value.url,
                  ext: h.value,
                  name: r.value.model.name,
                  "own-api-prefix": t(zt)(t(f).pluginId),
                  "compare-src": (H = ne.value) == null ? void 0 : H.url,
                  "compare-ext": (Ie = ne.value) == null ? void 0 : Ie.name.split(".").at(-1),
                  "auto-snapshot": !n.value.preview,
                  onSnapshot: Ee.value
                }, null, 8, ["src", "ext", "name", "own-api-prefix", "compare-src", "compare-ext", "auto-snapshot", "onSnapshot"]))
              ];
            }, !0, 0) : A("", !0)
          ], 64)) : (i(), V("p", Bs, [
            x[28] || (x[28] = q("Локальный файл отсутствует. ", -1)),
            n.value.task ? (i(), D(t(te), {
              key: 0,
              disabled: p.value,
              onClick: x[5] || (x[5] = (H) => ve(() => t(a).redownload(r.value.model.id, n.value.id)))
            }, {
              default: k(() => [...x[27] || (x[27] = [
                q("Скачать снова", -1)
              ])]),
              _: 1
            }, 8, ["disabled"])) : A("", !0)
          ])),
          n.value.stats && n.value.stats.triangles > 1e5 ? (i(), D(t(ce), {
            key: 6,
            tone: "warning"
          }, {
            default: k(() => [
              q(" Для игры много — " + $(n.value.stats.triangles.toLocaleString("ru-RU")) + " треугольников. ", 1)
            ]),
            _: 1
          })) : A("", !0)
        ], 64)) : (i(), V(Y, { key: 1 }, [
          s("section", Fs, [
            s("h3", null, $(T.value), 1),
            M.value || n.value.status !== "ready" || !g.value ? (i(), V("p", qs, $(le.value), 1)) : A("", !0),
            s("dl", Ts, [
              s("div", null, [
                x[29] || (x[29] = s("dt", null, "Версия", -1)),
                s("dd", null, "v" + $(String(n.value.seq).padStart(2, "0")) + " · " + $(n.value.label), 1)
              ]),
              g.value ? (i(), V("div", Ns, [
                x[30] || (x[30] = s("dt", null, "Формат", -1)),
                s("dd", null, $(h.value.toUpperCase()), 1)
              ])) : A("", !0),
              s("div", null, [
                x[31] || (x[31] = s("dt", null, "Расходы", -1)),
                s("dd", null, $(t(xt)(n.value.cost)), 1)
              ])
            ]),
            n.value.status === "ready" && g.value ? (i(), V(Y, { key: 1 }, [
              U(t(te), {
                tone: M.value ? "neutral" : "accent",
                variant: "solid",
                disabled: p.value,
                onClick: ke
              }, {
                leading: k(() => [...x[32] || (x[32] = [
                  s("svg", {
                    class: "studio-save-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.6",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "aria-hidden": "true"
                  }, [
                    s("path", { d: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" })
                  ], -1)
                ])]),
                default: k(() => [
                  x[33] || (x[33] = q(" Сохранить в проект ", -1))
                ]),
                _: 1
              }, 8, ["tone", "disabled"]),
              x[34] || (x[34] = s("span", { class: "studio-save-hint" }, "Копирование в проект бесплатно", -1))
            ], 64)) : t($t).includes(n.value.status) || n.value.status === "unresolved" ? (i(), D(t(te), {
              key: 2,
              onClick: x[6] || (x[6] = (H) => F.$emit("tasks"))
            }, {
              default: k(() => [
                q($(n.value.status === "unknown" || n.value.status === "unresolved" ? "Разобрать заказ" : "Открыть очередь"), 1)
              ]),
              _: 1
            })) : A("", !0),
            R.value ? (i(), D(t(ce), { key: 3 }, {
              default: k(() => [
                q("Сохранено: " + $(R.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ]),
          n.value.status === "ready" ? (i(), D(Go, {
            key: 0,
            "model-id": r.value.model.id,
            "version-id": n.value.id,
            "open-operation": B.value,
            heading: M.value ? "Создать 3D-модель" : "Доработать модель",
            onCreated: x[7] || (x[7] = (H, Ie) => F.$emit("created", H, Ie))
          }, null, 8, ["model-id", "version-id", "open-operation", "heading"])) : A("", !0),
          U(t(te), {
            variant: "ghost",
            disabled: !g.value || p.value,
            onClick: Pe
          }, {
            default: k(() => [...x[35] || (x[35] = [
              q("Спросить агента", -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          s("div", Ds, [
            U(t(ft), {
              open: S.value,
              "onUpdate:open": x[8] || (x[8] = (H) => S.value = H),
              controls: `${C}-compare`,
              "data-context": "studio-inspector-section"
            }, {
              default: k(() => [...x[36] || (x[36] = [
                q(" Сравнение и основная версия ", -1)
              ])]),
              _: 1
            }, 8, ["open", "controls"]),
            De(s("div", {
              id: `${C}-compare`,
              class: "studio-model-fields"
            }, [
              U(t(de), { label: "Сравнить с версией" }, {
                default: k(() => [
                  U(t(xe), {
                    modelValue: c.value,
                    "onUpdate:modelValue": x[9] || (x[9] = (H) => c.value = H)
                  }, {
                    default: k(() => [
                      x[37] || (x[37] = s("option", { value: "" }, "Без сравнения", -1)),
                      (i(!0), V(Y, null, ie(ae.value, (H) => (i(), V("option", {
                        key: H.id,
                        value: H.id
                      }, $(H.label), 9, Ws))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              U(t(te), {
                disabled: !c.value && !e.compareVersionId,
                onClick: x[10] || (x[10] = (H) => F.$emit("compare", e.compareVersionId ? "" : c.value))
              }, {
                default: k(() => [
                  q($(e.compareVersionId ? "Убрать сравнение" : "Сравнить"), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              U(t(te), {
                disabled: p.value || r.value.model.mainVersion === n.value.id,
                onClick: x[11] || (x[11] = (H) => ve(() => t(a).patchModel(r.value.model.id, { mainVersion: n.value.id })))
              }, {
                default: k(() => [...x[38] || (x[38] = [
                  q(" Сделать основной ", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ], 8, zs), [
              [nt, S.value]
            ])
          ]),
          s("div", Js, [
            U(t(ft), {
              open: E.value,
              "onUpdate:open": x[12] || (x[12] = (H) => E.value = H),
              controls: `${C}-info`,
              "data-context": "studio-inspector-section"
            }, {
              default: k(() => [...x[39] || (x[39] = [
                q(" Параметры и расходы ", -1)
              ])]),
              _: 1
            }, 8, ["open", "controls"]),
            De(s("div", {
              id: `${C}-info`,
              class: "studio-model-fields"
            }, [
              s("p", null, $(t(ot)(n.value.provider, (Ce = t(a).state) == null ? void 0 : Ce.providers)) + " · " + $(n.value.task ? t(Zt)(n.value.task.type) : "без облачного заказа"), 1),
              s("p", null, $(t(xt)(n.value.cost)), 1),
              s("p", null, $(t(Cl)(n.value.stats)), 1),
              Object.keys(n.value.params).length ? (i(), V("ul", Gs, [
                (i(!0), V(Y, null, ie(t(Kl)(n.value.params), (H, Ie) => (i(), V("li", { key: Ie }, $(H.name) + ": " + $(H.value), 1))), 128))
              ])) : A("", !0),
              (i(!0), V(Y, null, ie(n.value.savedTo, (H) => (i(), V("p", {
                key: H.path
              }, "Сохранена: " + $(H.path), 1))), 128))
            ], 8, Xs), [
              [nt, E.value]
            ])
          ]),
          s("div", Hs, [
            U(t(ft), {
              open: _.value,
              "onUpdate:open": x[13] || (x[13] = (H) => _.value = H),
              controls: `${C}-manage`,
              "data-context": "studio-inspector-section"
            }, {
              default: k(() => [...x[40] || (x[40] = [
                q(" Управление моделью и файлами ", -1)
              ])]),
              _: 1
            }, 8, ["open", "controls"]),
            De(s("div", {
              id: `${C}-manage`,
              class: "studio-model-fields"
            }, [
              U(t(te), {
                disabled: p.value,
                onClick: x[14] || (x[14] = (H) => P.value = !0)
              }, {
                default: k(() => [...x[41] || (x[41] = [
                  q("Переименовать", -1)
                ])]),
                _: 1
              }, 8, ["disabled"]),
              K.value ? (i(), D(t(te), {
                key: 0,
                disabled: p.value,
                onClick: Je
              }, {
                default: k(() => [...x[42] || (x[42] = [
                  q("Отменить", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])) : A("", !0),
              n.value.task ? (i(), D(t(te), {
                key: 1,
                disabled: p.value,
                onClick: x[15] || (x[15] = (H) => ve(() => t(a).redownload(r.value.model.id, n.value.id)))
              }, {
                default: k(() => [...x[43] || (x[43] = [
                  q("Скачать снова", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])) : A("", !0),
              U(t(te), {
                disabled: p.value || !n.value.files.length,
                onClick: Le
              }, {
                default: k(() => [...x[44] || (x[44] = [
                  q("Облегчить", -1)
                ])]),
                _: 1
              }, 8, ["disabled"]),
              x[47] || (x[47] = s("p", { class: "studio-model-hint" }, "«Облегчить» удаляет локальные файлы версии, сохраняя историю.", -1)),
              U(t(te), {
                tone: "danger",
                variant: "ghost",
                disabled: p.value,
                onClick: me
              }, {
                default: k(() => [...x[45] || (x[45] = [
                  q("Удалить версию", -1)
                ])]),
                _: 1
              }, 8, ["disabled"]),
              U(t(te), {
                tone: "danger",
                variant: "ghost",
                disabled: p.value,
                onClick: qe
              }, {
                default: k(() => [...x[46] || (x[46] = [
                  q("Удалить модель", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ], 8, Ks), [
              [nt, _.value]
            ])
          ]),
          U(os, {
            open: P.value,
            model: r.value.model,
            onClose: x[16] || (x[16] = (H) => P.value = !1)
          }, null, 8, ["open", "model"]),
          U(as, {
            open: m.value,
            model: r.value.model,
            version: n.value,
            folders: r.value.saveFolders,
            onClose: x[17] || (x[17] = (H) => m.value = !1),
            onSaved: x[18] || (x[18] = (H) => R.value = H),
            onExport: Se
          }, null, 8, ["open", "model", "version", "folders"])
        ], 64)),
        n.value.rigCheck ? (i(), D(t(ce), {
          key: 2,
          "data-context": "studio-rig-check",
          tone: n.value.rigCheck.status === "failed" ? "danger" : "neutral"
        }, {
          default: k(() => [
            q($(t(Ql)(n.value.rigCheck)), 1)
          ]),
          _: 1
        }, 8, ["tone"])) : A("", !0),
        w.value ? (i(), D(t(ce), {
          key: 3,
          tone: "danger"
        }, {
          default: k(() => [
            q($(w.value), 1)
          ]),
          _: 1
        })) : A("", !0)
      ], 2)) : (i(), V("p", Qs, "Выберите версию модели."));
    };
  }
}), bl = /* @__PURE__ */ Oe(Ys, [["__scopeId", "data-v-28ec89a3"]]), Zs = { class: "studio-unknown-order" }, ei = ["value"], ti = /* @__PURE__ */ Ue({
  __name: "UnknownOrder",
  props: {
    row: {}
  },
  setup(e) {
    const u = e, l = Xe(), d = Ge(), a = O(!1), f = O(!1), y = O(""), w = O(""), p = O(null);
    let m = 0, P = !0;
    const I = G(() => `${l.libraryId}:${u.row.intentId}:${u.row.childId}`), c = G(() => {
      var C;
      return (C = p.value) == null ? void 0 : C.children.find((b) => b.childId === u.row.childId);
    });
    re([I, () => d.signal], () => {
      m += 1, a.value = !1, f.value = !1, y.value = "", p.value = null, w.value = "";
    }), Fe(() => {
      P = !1, m += 1;
    });
    async function S() {
      const C = ++m, b = _e({ contextSignal: () => d.signal }), o = l.libraryId;
      a.value = !0, f.value = !0, w.value = "";
      try {
        const v = await l.loadJob(u.row.intentId);
        P && b() && C === m && o === l.libraryId && v.libraryId === o && (p.value = v);
      } catch (v) {
        P && b() && C === m && (w.value = $e(v));
      } finally {
        P && b() && C === m && (f.value = !1);
      }
    }
    async function E(C) {
      if (!c.value || f.value)
        return;
      const b = I.value, o = _e({ contextSignal: () => d.signal }), v = u.row.intentId, r = u.row.childId, n = y.value.trim();
      f.value = !0, w.value = "";
      try {
        const g = C ? "Оставить заказ неразобранным? Это освобождает локальный резерв, но не отменяет заказ у поставщика и не подтверждает возврат. Списание останется неизвестным." : `Связать выбранный облачный заказ с «${u.row.label}»? Новый оплачиваемый заказ не создаётся.`;
        if (!await et(g) || !P || !o() || b !== I.value)
          return;
        C ? await l.closeUnknownChild(v, r) : await l.reconcileChild(v, r, n), P && o() && b === I.value && (a.value = !1);
      } catch (g) {
        P && o() && b === I.value && (w.value = $e(g));
      } finally {
        P && o() && b === I.value && (f.value = !1);
      }
    }
    const _ = () => E(!1), R = () => E(!0);
    return (C, b) => {
      var o;
      return i(), V("div", Zs, [
        a.value ? (i(), V(Y, { key: 1 }, [
          b[6] || (b[6] = s("p", null, "Заказ мог быть принят и оплачен. Связывание номера заказа только проверяет и продолжает этот заказ.", -1)),
          (o = c.value) != null && o.candidates.length ? (i(), D(t(de), {
            key: 0,
            label: "Возможный заказ"
          }, {
            default: k(() => [
              U(t(xe), {
                modelValue: y.value,
                "onUpdate:modelValue": b[0] || (b[0] = (v) => y.value = v),
                "data-context": "studio-candidate",
                disabled: f.value
              }, {
                default: k(() => [
                  b[3] || (b[3] = s("option", { value: "" }, "Выберите после проверки", -1)),
                  (i(!0), V(Y, null, ie(c.value.candidates, (v) => (i(), V("option", {
                    key: v.taskId,
                    value: v.taskId
                  }, $(t(Zt)(v.type)) + " · " + $(v.createdAt || "дата неизвестна"), 9, ei))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          })) : A("", !0),
          U(t(de), {
            label: "Номер заказа",
            hint: "Можно указать вручную; сервер проверит аккаунт и тип заказа"
          }, {
            default: k(() => [
              U(t(st), {
                modelValue: y.value,
                "onUpdate:modelValue": b[1] || (b[1] = (v) => y.value = v),
                maxlength: 200,
                disabled: f.value
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          U(t(te), {
            disabled: !c.value || !y.value.trim() || f.value,
            onClick: _
          }, {
            default: k(() => [...b[4] || (b[4] = [
              q("Связать заказ", -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          e.row.status === "unknown" || e.row.waitReason === t(St) ? (i(), D(t(te), {
            key: 1,
            variant: "ghost",
            disabled: f.value || !c.value,
            onClick: R
          }, {
            default: k(() => [...b[5] || (b[5] = [
              q("Оставить неразобранным", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])) : A("", !0),
          w.value ? (i(), D(t(ce), {
            key: 2,
            tone: "danger"
          }, {
            default: k(() => [
              q($(w.value), 1)
            ]),
            _: 1
          })) : A("", !0)
        ], 64)) : (i(), D(t(te), {
          key: 0,
          variant: "ghost",
          onClick: S
        }, {
          default: k(() => [...b[2] || (b[2] = [
            q("Разобрать заказ", -1)
          ])]),
          _: 1
        }))
      ]);
    };
  }
}), li = /* @__PURE__ */ Oe(ti, [["__scopeId", "data-v-60a1bb2e"]]), ai = { class: "studio-tasks" }, ni = { class: "studio-tasks-heading" }, oi = { class: "studio-task-actions" }, si = {
  key: 0,
  class: "studio-task-history",
  role: "status"
}, ii = ["data-group"], ri = { key: 0 }, ui = {
  key: 1,
  class: "studio-task-empty"
}, di = { class: "studio-task-title" }, ci = ["data-status"], vi = { key: 1 }, fi = { class: "studio-task-footer" }, mi = { class: "studio-task-actions" }, pi = { key: 3 }, gi = { class: "studio-task-summary" }, bi = { class: "studio-task-group" }, yi = {
  key: 0,
  class: "studio-task-empty"
}, hi = { class: "studio-task-group" }, wi = {
  key: 0,
  class: "studio-task-empty"
}, ki = { key: 0 }, $i = /* @__PURE__ */ Ue({
  __name: "TasksPanel",
  emits: ["open"],
  setup(e, { emit: u }) {
    const l = u, d = Xe(), a = Ge(), f = O(!1), y = O(""), w = O("");
    let p = !0;
    const m = (o) => ["unknown", "unresolved", "failed"].includes(o.status) || o.waitReason === St, P = G(() => {
      var o, v;
      return [...((o = d.tasks) == null ? void 0 : o.active) ?? [], ...((v = d.tasks) == null ? void 0 : v.recent) ?? []].filter(m);
    }), I = G(() => {
      var o;
      return (((o = d.tasks) == null ? void 0 : o.active) ?? []).filter((v) => !m(v));
    }), c = G(() => {
      var o;
      return ((o = d.tasks) == null ? void 0 : o.recent.filter((v) => v.status === "ready").length) ?? 0;
    }), S = G(() => {
      var o;
      return [
        ...P.value.length ? [{
          id: "attention",
          label: "Требуют внимания",
          rows: P.value
        }] : [],
        {
          id: "active",
          label: "В работе",
          rows: I.value
        },
        {
          id: "recent",
          label: "Завершены · 24 часа",
          rows: (((o = d.tasks) == null ? void 0 : o.recent) || []).filter((v) => !m(v))
        }
      ];
    });
    re(() => [d.libraryId, a.signal], () => {
      w.value = "", y.value = "", f.value = !1;
    }), Fe(() => {
      p = !1;
    });
    async function E(o) {
      if (f.value)
        return;
      const v = d.libraryId, r = _e({ contextSignal: () => a.signal });
      f.value = !0, w.value = "";
      try {
        await o(v);
      } catch (n) {
        p && r() && v === d.libraryId && (w.value = $e(n));
      } finally {
        p && r() && v === d.libraryId && (f.value = !1);
      }
    }
    const _ = () => E(async () => {
      await d.loadTasks(!0);
    });
    async function R() {
      const o = _e({ contextSignal: () => a.signal });
      await E(async (v) => {
        const r = await d.scan();
        p && o() && v === d.libraryId && r.libraryId === v && (y.value = `Найдено ${r.found}, добавлено ${r.imported}, пропущено ${r.skipped}` + (r.partial ? ` · неполно: ${r.reasons.join(", ")}` : ""));
      });
    }
    async function C(o) {
      const v = _e({ contextSignal: () => a.signal }), r = d.libraryId;
      await et(`Отменить заказ «${o.label}»? Он ещё не отправлен, оплаты не было.`) && (!p || !v() || r !== d.libraryId || await E(async () => {
        await d.closeUnknownChild(o.intentId, o.childId);
      }));
    }
    async function b(o, v) {
      const r = _e({ contextSignal: () => a.signal });
      await E(async (n) => {
        const g = await d.importExternal(o, v);
        p && r() && n === d.libraryId && g.libraryId === n && l("open", g.modelId);
      });
    }
    return (o, v) => (i(), V("section", ai, [
      s("header", ni, [
        v[2] || (v[2] = s("div", null, [
          s("h3", null, "Задачи"),
          s("p", null, "Ход генерации, история заказов и расходы.")
        ], -1)),
        s("div", oi, [
          U(t(te), {
            loading: f.value,
            onClick: _
          }, {
            default: k(() => [...v[0] || (v[0] = [
              q("Обновить", -1)
            ])]),
            _: 1
          }, 8, ["loading"]),
          U(t(te), {
            variant: "ghost",
            disabled: f.value,
            onClick: R
          }, {
            default: k(() => [...v[1] || (v[1] = [
              q("Найти прошлые заказы на диске", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      y.value ? (i(), D(t(ce), { key: 0 }, {
        default: k(() => [
          q($(y.value), 1)
        ]),
        _: 1
      })) : A("", !0),
      w.value ? (i(), D(t(ce), {
        key: 1,
        tone: "danger"
      }, {
        default: k(() => [
          q($(w.value), 1)
        ]),
        _: 1
      })) : A("", !0),
      t(d).tasks ? (i(), V(Y, { key: 2 }, [
        t(d).tasks.historyPartial || t(d).tasks.week.partial ? (i(), V("p", si, " История неполная · только известные заказы. " + $(t(d).tasks.historyError), 1)) : A("", !0),
        (i(!0), V(Y, null, ie(S.value, (r) => (i(), V("section", {
          key: r.id,
          class: "studio-task-group",
          "data-group": r.id
        }, [
          s("h4", null, [
            q($(r.label) + " ", 1),
            s("span", null, $(r.rows.length), 1)
          ]),
          r.id === "attention" ? (i(), V("p", ri, "Проверьте причину и доступные действия у каждого заказа.")) : A("", !0),
          r.rows.length ? A("", !0) : (i(), V("p", ui, $(r.id === "active" ? "Сейчас нет задач в работе." : "За последние сутки завершённых задач нет."), 1)),
          (i(!0), V(Y, null, ie(r.rows, (n) => {
            var g;
            return i(), V("article", {
              key: `${n.intentId}:${n.childId}`,
              class: "studio-task-row"
            }, [
              s("div", di, [
                s("strong", null, $(n.modelName || "Модель удалена") + " · " + $(n.label), 1),
                s("span", {
                  class: "studio-task-status",
                  "data-status": n.status
                }, $(t(ot)(n.provider, (g = t(d).state) == null ? void 0 : g.providers)) + " · " + $(t(vt)[n.status]), 9, ci)
              ]),
              r.id === "active" ? (i(), D(t(Et), {
                key: 0,
                value: n.progress,
                label: `Прогресс ${n.label}`
              }, null, 8, ["value", "label"])) : A("", !0),
              r.id === "active" && n.etaSeconds !== null || n.waitReason ? (i(), V("p", vi, $(r.id === "active" && n.etaSeconds !== null ? `≈ ${Math.max(1, Math.ceil(n.etaSeconds / 60))} мин` : "") + " " + $(n.waitReason), 1)) : A("", !0),
              s("p", null, $(t(xt)({
                estimated: n.estimated,
                actual: n.actual,
                unit: n.unit,
                state: n.paymentState,
                free: n.paymentState === "free"
              })), 1),
              n.error ? (i(), D(t(ce), {
                key: 2,
                tone: "danger"
              }, {
                default: k(() => [
                  q($(n.error.message), 1)
                ]),
                _: 2
              }, 1024)) : A("", !0),
              s("div", fi, [
                s("div", mi, [
                  n.modelId ? (i(), D(t(te), {
                    key: 0,
                    tone: n.status === "ready" ? "accent" : "neutral",
                    onClick: (h) => o.$emit("open", n.modelId, n.versionId || void 0)
                  }, {
                    default: k(() => [
                      q($(n.status === "ready" ? "Посмотреть результат" : "Открыть модель"), 1)
                    ]),
                    _: 2
                  }, 1032, ["tone", "onClick"])) : A("", !0),
                  n.status === "waiting" ? (i(), D(t(te), {
                    key: 1,
                    variant: "ghost",
                    disabled: f.value,
                    onClick: (h) => C(n)
                  }, {
                    default: k(() => [...v[3] || (v[3] = [
                      q("Отменить", -1)
                    ])]),
                    _: 1
                  }, 8, ["disabled", "onClick"])) : A("", !0)
                ]),
                ["unknown", "unresolved"].includes(n.status) || n.waitReason === t(St) ? (i(), D(li, {
                  key: 0,
                  row: n
                }, null, 8, ["row"])) : A("", !0)
              ]),
              n.retryReason ? (i(), V("p", pi, $(n.retryReason), 1)) : A("", !0)
            ]);
          }), 128))
        ], 8, ii))), 128)),
        s("dl", gi, [
          s("div", {
            class: We({ "studio-task-attention": P.value.length })
          }, [
            v[4] || (v[4] = s("dt", null, "Требуют внимания", -1)),
            s("dd", null, $(P.value.length), 1)
          ], 2),
          s("div", null, [
            v[5] || (v[5] = s("dt", null, "В работе", -1)),
            s("dd", null, $(I.value.length), 1)
          ]),
          s("div", null, [
            v[6] || (v[6] = s("dt", null, "Готовы за 24 часа", -1)),
            s("dd", null, $(c.value), 1)
          ])
        ]),
        s("section", bi, [
          s("h4", null, [
            v[7] || (v[7] = q("Сделано вне раздела ", -1)),
            s("span", null, $(t(d).tasks.external.length), 1)
          ]),
          t(d).tasks.external.length ? A("", !0) : (i(), V("p", yi, "Нет новых наблюдений.")),
          (i(!0), V(Y, null, ie(t(d).tasks.external, (r) => {
            var n;
            return i(), V("article", {
              key: `${r.provider}:${r.taskId}`,
              class: "studio-task-row"
            }, [
              s("strong", null, $(r.label) + " · " + $(t(Zt)(r.type)), 1),
              s("p", null, $(t(ot)(r.provider, (n = t(d).state) == null ? void 0 : n.providers)) + " · " + $(r.credits === null ? "Сумма неизвестна" : `Списано ${r.credits}`) + " · " + $(r.createdAt ? new Date(r.createdAt).toLocaleString("ru-RU") : "Дата неизвестна"), 1),
              U(t(te), {
                disabled: f.value,
                onClick: (g) => b(r.provider, r.taskId)
              }, {
                default: k(() => [...v[8] || (v[8] = [
                  q("Забрать в библиотеку", -1)
                ])]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ]);
          }), 128))
        ]),
        s("section", hi, [
          v[9] || (v[9] = s("h4", null, "За 7 дней по известным заказам", -1)),
          t(d).tasks.week.groups.length ? A("", !0) : (i(), V("p", wi, "Подтверждённых расходов пока нет.")),
          (i(!0), V(Y, null, ie(t(d).tasks.week.groups, (r) => {
            var n, g;
            return i(), V("div", {
              key: `${r.provider}:${(n = r.unit) == null ? void 0 : n.many}`
            }, [
              s("p", null, $(t(ot)(r.provider, (g = t(d).state) == null ? void 0 : g.providers)) + " " + $(t(Ae)(r.actual, r.unit)) + " — в разделе " + $(r.sectionActual) + ", вне раздела " + $(r.externalActual), 1),
              s("p", null, "Оценки заказов: " + $(t(Ae)(r.estimated, r.unit)) + " · резерв заказов раздела: " + $(t(Ae)(r.reserved, r.unit)) + " · возврат подтверждён: " + $(t(Ae)(r.refunded, r.unit)), 1),
              r.unknownCount ? (i(), V("p", ki, "Списание неизвестно: " + $(r.unknownCount) + " заказов, оценка " + $(t(Ae)(r.unknownEstimated, r.unit)), 1)) : A("", !0)
            ]);
          }), 128))
        ])
      ], 64)) : A("", !0)
    ]));
  }
}), xi = /* @__PURE__ */ Oe($i, [["__scopeId", "data-v-80f2517b"]]), Ii = {
  key: 0,
  class: "studio-resources"
}, Vi = { class: "studio-resource-label" }, Si = { class: "studio-resource-note" }, Ci = { class: "studio-resource-note" }, Ui = {
  class: "studio-navigation",
  "aria-label": "Разделы 3D"
}, _i = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ei = ["d"], Mi = {
  key: 0,
  class: "studio-badge"
}, Oi = ["aria-labelledby"], Pi = ["data-pane"], Ri = ["id"], Ai = { class: "studio-tree-heading" }, Li = { class: "studio-tree-title" }, ji = { key: 0 }, Bi = ["id"], Fi = ["id"], qi = {
  key: 1,
  class: "studio-page-scroll"
}, Ti = /* @__PURE__ */ Ue({
  __name: "Studio3dPanel",
  props: {
    active: { type: Boolean, default: !0 },
    compact: { type: Boolean, default: !1 },
    presentation: { default: "page" },
    intents: { default: () => [] }
  },
  emits: ["consume-intent", "context"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Xe(), f = Ge(), y = `studio-panel-${bt()}`, w = O(null), p = O("create"), m = O(""), P = O("viewer"), I = O(""), c = O(""), S = O(0), E = O(a.libraryId);
    re(
      () => {
        var K;
        return [a.libraryId, (K = a.state) == null ? void 0 : K.library.ok, a.admitted];
      },
      ([K, N, J]) => {
        N && J && K && (E.value = K);
      }
    );
    const _ = [
      {
        id: "create",
        label: "Создать",
        icon: "M12 4v16 M4 12h16"
      },
      {
        id: "models",
        label: "Модели",
        icon: "M12 2l9 5v10l-9 5-9-5V7z M12 22V12 M21 7l-9 5-9-5"
      },
      {
        id: "tasks",
        label: "Задачи",
        icon: "M4 5h16v14H4z M8 9h8 M8 13h5"
      }
    ], R = /* @__PURE__ */ new Set(), C = G(() => l.presentation === "page" || !l.compact);
    function b(K, N = "") {
      p.value = "models", m.value = K, P.value = "viewer", c.value = N, S.value += 1;
    }
    re([() => l.active, p, m, S, () => {
      var K;
      return (K = a.state) == null ? void 0 : K.library.ok;
    }], () => {
      var N;
      const K = l.active && p.value === "models" ? m.value : "";
      a.setViewingModel(K), K && ((N = a.state) != null && N.library.ok) && (a.openModel(K, c.value || a.selectedVersion), c.value = "");
    }, { immediate: !0 }), re(m, () => {
      I.value = "";
    });
    function o(K) {
      P.value = "viewer", m.value && (c.value = K, S.value += 1);
    }
    function v(K) {
      _.some((N) => N.id === K) && (p.value = K);
    }
    function r() {
      m.value = "";
    }
    function n(K, N) {
      b(K, N || "");
    }
    function g() {
      const K = new Set(l.intents.map((N) => N.id));
      for (const N of R)
        K.has(N) || R.delete(N);
      for (const N of l.intents)
        R.has(N.id) || (R.add(N.id), N.type === "open" && (N.params.tab && ["create", "models", "tasks"].includes(N.params.tab) && (p.value = N.params.tab), N.params.model && b(N.params.model, N.params.version || "")), d("consume-intent", N.id));
    }
    re(() => l.intents, g, { deep: !0, immediate: !0 }), re([p, m, () => l.active], () => {
      d("context", l.active ? {
        tab: p.value,
        model: p.value === "models" ? m.value : ""
      } : null);
    }, { immediate: !0 });
    function h(K) {
      f.openSettings({ pageId: "agents.providers", entityId: K });
    }
    function M(K) {
      return K === null ? "неизвестно" : `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(K / 1024 ** 3)} ГБ`;
    }
    function B() {
      try {
        const K = localStorage.getItem("grigdesk-studio3d-nav-width");
        return K ? Math.max(240, Math.min(420, Number(K) || 260)) : 260;
      } catch {
        return 260;
      }
    }
    const T = O(B());
    let le = null;
    function ee(K) {
      le = {
        x: K.clientX,
        width: T.value,
        id: K.pointerId
      }, K.currentTarget.setPointerCapture(K.pointerId), K.preventDefault();
    }
    function ae(K) {
      le && (T.value = Math.max(240, Math.min(420, le.width + K.clientX - le.x)));
    }
    function ne() {
      le = null;
      try {
        localStorage.setItem("grigdesk-studio3d-nav-width", String(T.value));
      } catch {
      }
    }
    function fe(K) {
      const N = K.shiftKey ? 30 : 10, pe = {
        ArrowLeft: T.value - N,
        ArrowRight: T.value + N,
        Home: 240,
        End: 420
      }[K.key];
      pe !== void 0 && (K.preventDefault(), T.value = Math.max(240, Math.min(420, pe)), ne());
    }
    function ue() {
      T.value = 260;
      try {
        localStorage.removeItem("grigdesk-studio3d-nav-width");
      } catch {
      }
    }
    return Fe(() => {
      a.setViewingModel("");
    }), (K, N) => (i(), V("section", {
      class: We(["studio-panel", {
        "is-active": e.active,
        "is-compact": !C.value,
        "is-dock": e.presentation === "dock",
        "is-model": p.value === "models" && !!m.value,
        "is-page": e.presentation === "page"
      }])
    }, [
      U(t(ta), {
        class: "studio-header",
        "data-ui-host-actions": e.presentation === "dock" ? "" : void 0
      }, {
        title: k(() => [...N[7] || (N[7] = [
          s("h2", null, "3D", -1)
        ])]),
        _: 1
      }, 8, ["data-ui-host-actions"]),
      t(a).state ? (i(), V("div", Ii, [
        (i(!0), V(Y, null, ie(t(a).state.providers.filter((J) => !J.local), (J) => (i(), V("div", {
          key: J.id,
          class: "studio-resource"
        }, [
          s("span", Vi, $(J.name), 1),
          J.available && J.balance ? (i(), V(Y, { key: 0 }, [
            s("strong", null, $(t(Ae)(J.balance.available, J.unit)), 1),
            s("span", Si, $(J.balance.reserved) + " в резерве", 1)
          ], 64)) : J.available ? (i(), V(Y, { key: 1 }, [
            q("баланс неизвестен")
          ], 64)) : (i(), D(t(el), {
            key: 2,
            href: "#/settings",
            onClick: Dt((pe) => h(J.id), ["prevent"])
          }, {
            default: k(() => [...N[8] || (N[8] = [
              q("нужен ключ", -1)
            ])]),
            _: 1
          }, 8, ["onClick"]))
        ]))), 128)),
        s("div", {
          class: We(["studio-resource", { "studio-disk-warning": t(a).state.library.lowDisk }])
        }, [
          N[9] || (N[9] = s("span", { class: "studio-resource-label" }, "Библиотека", -1)),
          s("strong", null, $(M(t(a).state.library.bytes)), 1),
          s("span", Ci, "свободно " + $(M(t(a).state.library.freeBytes)), 1)
        ], 2)
      ])) : A("", !0),
      s("nav", Ui, [
        U(t(fl), {
          "model-value": p.value,
          label: "Разделы 3D",
          "data-ui-studio-tabs": "",
          "onUpdate:modelValue": v
        }, {
          default: k(() => [
            (i(), V(Y, null, ie(_, (J) => U(t(wt), {
              id: `${y}-${J.id}`,
              key: J.id,
              value: J.id,
              controls: y,
              "aria-label": J.id === "tasks" && t(a).active ? `Задачи · ${t(a).active}` : J.label
            }, {
              default: k(() => [
                (i(), V("svg", _i, [
                  s("path", {
                    d: J.icon
                  }, null, 8, Ei)
                ])),
                q(" " + $(J.label) + " ", 1),
                J.id === "tasks" && t(a).active ? (i(), V("span", Mi, $(t(a).active), 1)) : A("", !0)
              ]),
              _: 2
            }, 1032, ["id", "value", "aria-label"])), 64))
          ]),
          _: 1
        }, 8, ["model-value"])
      ]),
      t(a).error ? (i(), D(t(ce), {
        key: 1,
        tone: "danger"
      }, {
        default: k(() => [
          q($(t(a).error), 1)
        ]),
        _: 1
      })) : A("", !0),
      t(a).state && !t(a).state.library.ok ? (i(), D(t(ce), {
        key: 2,
        tone: "warning"
      }, {
        default: k(() => [
          q($(t(a).state.library.error), 1)
        ]),
        _: 1
      })) : A("", !0),
      s("div", {
        id: y,
        class: "studio-content",
        role: "tabpanel",
        "aria-labelledby": `${y}-${p.value}`
      }, [
        De((i(), D(Ln, {
          key: E.value,
          active: e.active && p.value === "create",
          onCreated: n,
          onTasks: N[0] || (N[0] = (J) => v("tasks"))
        }, null, 8, ["active"])), [
          [nt, p.value === "create"]
        ]),
        p.value === "models" && m.value ? (i(), V("div", {
          key: 0,
          class: We(["studio-layout", { "studio-compact-column": !C.value }]),
          "data-pane": P.value,
          style: Qt({ "--studio-nav-width": `${T.value}px` })
        }, [
          U(t(fl), {
            modelValue: P.value,
            "onUpdate:modelValue": N[1] || (N[1] = (J) => P.value = J),
            class: "studio-model-panes",
            "data-ui-workspace-tabs": "",
            size: "compact",
            label: "Работа с моделью"
          }, {
            default: k(() => [
              U(t(wt), {
                value: "viewer",
                controls: `${y}-viewer`
              }, {
                default: k(() => [...N[10] || (N[10] = [
                  q("Модель", -1)
                ])]),
                _: 1
              }, 8, ["controls"]),
              U(t(wt), {
                value: "versions",
                controls: `${y}-versions`
              }, {
                default: k(() => [...N[11] || (N[11] = [
                  q("Версии", -1)
                ])]),
                _: 1
              }, 8, ["controls"]),
              U(t(wt), {
                value: "details",
                controls: `${y}-details`
              }, {
                default: k(() => [...N[12] || (N[12] = [
                  q("Сведения", -1)
                ])]),
                _: 1
              }, 8, ["controls"])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          s("aside", {
            id: `${y}-versions`,
            class: "studio-navigator"
          }, [
            s("div", Ai, [
              U(t(te), {
                variant: "ghost",
                onClick: r
              }, {
                default: k(() => [...N[13] || (N[13] = [
                  q("← Все модели", -1)
                ])]),
                _: 1
              }),
              s("div", Li, [
                N[14] || (N[14] = s("h3", null, "Версии модели", -1)),
                t(a).detail ? (i(), V("span", ji, $(t(a).detail.versions.length), 1)) : A("", !0)
              ])
            ]),
            t(a).detail ? (i(), D(Lo, {
              key: 0,
              versions: t(a).detail.versions,
              selected: t(a).selectedVersion,
              main: t(a).detail.model.mainVersion,
              onSelect: o
            }, null, 8, ["versions", "selected", "main"])) : A("", !0),
            C.value ? (i(), D(t(_t), {
              key: 1,
              class: "studio-separator",
              "data-context": "studio-separator",
              role: "separator",
              tabindex: "0",
              "aria-orientation": "vertical",
              "aria-label": "Ширина навигатора 3D",
              "aria-valuenow": T.value,
              "aria-valuemin": 240,
              "aria-valuemax": 420,
              onPointerdown: ee,
              onPointermove: ae,
              onPointerup: ne,
              onPointercancel: ne,
              onKeydown: fe,
              onDblclick: ue
            }, null, 8, ["aria-valuenow"])) : A("", !0)
          ], 8, Ri),
          s("main", {
            id: `${y}-viewer`,
            class: "studio-main"
          }, [
            U(bl, {
              active: e.active,
              "show-save-shortcut": !C.value,
              "compare-version-id": I.value,
              onSave: N[2] || (N[2] = (J) => {
                var pe;
                return (pe = w.value) == null ? void 0 : pe.openSave();
              }),
              onCreated: n,
              onTasks: N[3] || (N[3] = (J) => v("tasks"))
            }, null, 8, ["active", "show-save-shortcut", "compare-version-id"])
          ], 8, Bi),
          s("aside", {
            id: `${y}-details`,
            class: "studio-side"
          }, [
            U(bl, {
              ref_key: "detailPage",
              ref: w,
              section: "details",
              "compare-version-id": I.value,
              onCompare: N[4] || (N[4] = (J) => I.value = J),
              onCreated: n,
              onTasks: N[5] || (N[5] = (J) => v("tasks"))
            }, null, 8, ["compare-version-id"])
          ], 8, Fi)
        ], 14, Pi)) : p.value !== "create" ? (i(), V("main", qi, [
          p.value === "models" ? (i(), D(Io, {
            key: 0,
            onOpen: n,
            onCreate: N[6] || (N[6] = (J) => v("create"))
          })) : (i(), D(xi, {
            key: 1,
            onOpen: n
          }))
        ])) : A("", !0)
      ], 8, Oi)
    ], 2));
  }
}), Ni = /* @__PURE__ */ Oe(Ti, [["__scopeId", "data-v-ab399c47"]]), Ki = /* @__PURE__ */ Ue({
  __name: "PanelRoot",
  props: {
    context: {},
    active: { type: Boolean, default: !0 },
    compact: { type: Boolean, default: !1 },
    presentation: { default: "page" },
    intents: { default: () => [] }
  },
  emits: ["consume-intent"],
  setup(e, { emit: u }) {
    const l = e, d = u, a = Ze(null), f = O(!0), y = O("");
    let w = 0, p = !0;
    Wl(Rl, a);
    async function m(P) {
      const I = ++w;
      f.value = !0, y.value = "";
      try {
        const c = await Pl(P);
        if (!p || I !== w || P.signal.aborted)
          return;
        a.value = c;
      } catch (c) {
        p && I === w && !P.signal.aborted && (y.value = c instanceof Error ? c.message : String(c));
      } finally {
        p && I === w && (f.value = !1);
      }
    }
    return re(() => l.context, (P) => {
      m(P);
    }, { immediate: !0 }), Fe(() => {
      p = !1, w += 1;
    }), (P, I) => (i(), V(Y, null, [
      a.value ? (i(), D(Ni, {
        key: a.value.owner,
        active: e.active && !f.value && !y.value,
        compact: e.compact,
        presentation: e.presentation,
        intents: e.intents,
        onConsumeIntent: I[0] || (I[0] = (c) => d("consume-intent", c))
      }, null, 8, ["active", "compact", "presentation", "intents"])) : f.value ? (i(), D(t(ll), {
        key: 1,
        label: e.context.t("loading")
      }, null, 8, ["label"])) : A("", !0),
      y.value ? (i(), D(t(ce), {
        key: 2,
        tone: "danger"
      }, {
        default: k(() => [
          q($(y.value) + " ", 1),
          U(t(te), {
            variant: "ghost",
            onClick: I[1] || (I[1] = (c) => m(e.context))
          }, {
            default: k(() => [
              q($(e.context.t("retry")), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : A("", !0)
    ], 64));
  }
});
async function Qi(e) {
  const u = await Pl(e);
  return () => u.dispose();
}
export {
  Ct as V,
  Ki as _,
  Ia as a,
  Xi as c,
  Va as f,
  Gi as m,
  Hi as p,
  Qi as s
};
