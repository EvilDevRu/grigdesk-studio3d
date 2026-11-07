import { watch as h } from "vue";
import { r as E } from "./chunks/auth-BSqk3WDR.js";
import { c as v, a as w, p } from "./chunks/pending-service-DT5JtEfa.js";
async function P(e) {
  let r, n = !1, c = () => {
  }, u = () => {
  }, d = null, y = -1;
  const l = "studio3d-pending-state", s = () => {
    n || (n = !0, c(), u(), r && p(r.owner) === r && e.alerts.dismiss(l), r == null || r.close(), e.signal.removeEventListener("abort", s));
  };
  e.signal.addEventListener("abort", s, { once: !0 }), c = h(() => e.settings.value.libraryDir, () => {
    !r || n || (r.invalidateLibrary(), r.refreshLibrary().then(() => r == null ? void 0 : r.recoverPending()).catch((t) => r == null ? void 0 : r.reportError(t)));
  }, { flush: "sync" });
  try {
    const t = await E(e);
    e.signal.throwIfAborted(), r = v({
      owner: t,
      api: w(e.api, `/api/ext/${encodeURIComponent(e.pluginId)}`),
      signal: e.signal,
      onDropped(i, a) {
        e.alerts.show({
          id: `studio-expired-${i.key}`,
          title: e.t("pendingDroppedTitle", void 0, "Заказ не отправлен"),
          body: a,
          tone: "danger",
          sticky: !0
        });
      }
    });
    const o = r;
    return u = r.subscribe((i) => {
      var f;
      if (n || e.signal.aborted || p(t) !== o)
        return;
      const a = i.error ?? (!i.libraryOk && ((f = i.state) == null ? void 0 : f.library.error));
      if (!a) {
        d = null, e.alerts.dismiss(l);
        return;
      }
      d === a && y === i.libraryEpoch || (d = a, y = i.libraryEpoch, e.alerts.show({
        id: l,
        title: e.t("pendingStateErrorTitle", void 0, "Не удалось обновить библиотеку 3D"),
        body: e.t(
          "pendingStateErrorBody",
          void 0,
          "Проверьте подключение и повторите. Сохранённые намерения не изменены."
        ),
        detail: a instanceof Error ? a.message : typeof a == "string" ? a : void 0,
        tone: "danger",
        sticky: !0,
        openPanel: !1,
        actions: [{
          id: "retry",
          label: e.t("retry", void 0, "Повторить"),
          /**
          * Повтор принадлежит снимку ошибки того же service/library epoch.
          * Устаревшая кнопка не читает state и не запускает durable восстановление.
          */
          async run() {
            const g = o.librarySnapshot();
            if (!(n || e.signal.aborted || p(t) !== o || g.serviceEpoch !== i.serviceEpoch || g.libraryEpoch !== i.libraryEpoch))
              try {
                await o.refreshLibrary(), await o.recoverPending();
              } catch (b) {
                o.reportError(b);
              }
          }
        }]
      }));
    }), await r.refreshLibrary(), e.signal.throwIfAborted(), r.recoverPending().catch((i) => r == null ? void 0 : r.reportError(i)), s;
  } catch (t) {
    throw s(), t;
  }
}
export {
  P as start
};
