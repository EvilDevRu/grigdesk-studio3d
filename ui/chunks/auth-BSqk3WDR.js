async function w(r) {
  var s, e;
  r.signal.throwIfAborted();
  const a = await r.api.get("/api/auth/state", { signal: r.signal, retry: !1 });
  if (r.signal.throwIfAborted(), !a || typeof a != "object" || Array.isArray(a))
    throw new Error(((s = r.t) == null ? void 0 : s.call(
      r,
      "authInvalidResponse",
      void 0,
      "Не удалось подтвердить вход для раздела 3D. Повторите подключение."
    )) ?? "Не удалось подтвердить вход для раздела 3D. Повторите подключение.");
  const i = a;
  if (i.authenticated !== !0 || typeof i.clientScope != "string" || !i.clientScope)
    throw new Error(((e = r.t) == null ? void 0 : e.call(
      r,
      "authMissingOwner",
      void 0,
      "Не удалось подтвердить владельца раздела 3D. Повторите подключение."
    )) ?? "Не удалось подтвердить владельца раздела 3D. Повторите подключение.");
  return i.clientScope;
}
export {
  w as r
};
