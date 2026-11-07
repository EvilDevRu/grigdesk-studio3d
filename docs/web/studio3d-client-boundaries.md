# Границы клиента 3D

Клиентский код принадлежит `development/src/web/`. Типы намерения находятся в
`features/studio3d/pendingIntentTypes.ts`, durable adapter — в `pendingIntents.ts`.
Run хранит полный запрос; retry требует modelId/versionId и ожидаемую цену; batch —
полный серверный snapshot с snapshotHash. Формат owner/key/libraryId/request/fingerprint/at,
база IndexedDB `grigdesk-studio3d-intents` version 1 и objectStore `intents` сохраняются.
Запись разрешает POST только после transaction complete; volatile fallback оплаты нет.

`pendingService.ts` один на точный auth clientScope в ESM generation. Его жизнью
владеет `background.ts`, а UI только подписывается и вызывает submit. Панель и фон
импортируют один shared chunk; закрытие UI не отзывает сервис и не запускает второй recovery.
Контроллер сохраняет coalescing, UUID, канонический fingerprint и TTL десять минут.
Повтор сначала читает server job; только 404 разрешает прежний снимок до TTL включительно.
Чужие owner и libraryId не отправляются и не переназначаются новой библиотеке.

Единственный источник state/libraryId/library.ok — pendingService. UI loadState делегирует
refreshLibrary. Service различает owner/serviceEpoch, libraryEpoch и requestSeq; поздний
ответ A после B или A→B→A не открывает admission. Watch settings.libraryDir с flush:sync
закрывает допуск и отзывает старые библиотечные чтения до нового подтверждённого state.
Ошибка чтения оставляет намерения и платные действия закрытыми до явного retry.
Каждый отозванный libraryEpoch немедленно отменяет UI чтения, таймеры, upload и цену.
Последние подтверждённые список, detail и selection сохраняются при временном ok=false
или ошибке state; очищаются только после подтверждения другого доступного marker.
Форма сохраняет черновик, а платные controls закрыты до admitted=true.

Submit требует отдельный expectedLibraryId, захваченный UI из подтверждённой формы/цены.
После refresh несовпадение даёт stale_library до UUID, storage mutation и POST. Сохранённые
libraryId/request/fingerprint неизменяемы. HTTP 409 stale_library оставляет запись побайтно,
закрывает admission и перечитывает state; автоматического заказа с другим marker нет.
Перед каждой storage mutation после await проверяются owner/serviceEpoch/libraryEpoch.
Другие доказанные 4xx сохраняют прежнюю семантику только в текущей библиотечной эпохе.
Price_changed возвращает новый расчёт и требует нового решения человека.

`session.ts` создаёт приватную Pinia на PluginModuleContext, useStore(pinia) вызывается явно.
Auth проверяется через context.api, clientScope не заменяется и не нормализуется; перед
UI effects требуется context.backgroundReady(). PanelRoot предоставляет реактивную session
и перепривязывает события/чтения при новом context, сохраняя локальный черновик того же owner.
UI cleanup останавливает свой store и private Pinia, но не background pendingService.

API получает context.api и собственный prefix `/api/ext/studio3d`; shared ApiError распознаётся
структурно по name/status/data. События идут через context.events, без собственного SSE.
Готовые/ошибочные исходы производит серверный notification bridge; store не создаёт второй
terminal канал. context.notifications.setViewing подавляет только видимую тему модели.

Матрица проверки: все 13 logic и 7 mounted suites, context lifecycle, cold background/IDB,
settings A→B без reload, stale barriers и настоящий server idempotency fixture. Состояние
реализации и пределы доказательств описаны в [оглавлении](../README.md).

Проверено на шаге11: `tests/web/studio3d-store.test.mjs` (12 cases) и
`web-context-lifecycle.component.test.mjs` (5 cases) проходят настоящим watchdog.
Rebind использует native parent с shallowRef context; сохраняет тот же input и черновик,
создаёт другую private Pinia и отсеивает late A. Реальный IDB adapter работает поверх
закреплённого fake-indexeddb6.2.7. Смешанные terminal/500/reload assertions перенесены
в core `tests/web/studio3d-notifications-migration.test.js` (3 cases), где проходят
настоящие projection → core.emit → SSE → bridge и UI run/retry/batch после settings A→B.
Остальные перенесённые suites и packaged граф проверяются следующими воротами.

Шаг12: все20исходных suites вместе с новыми probes проходят153/153, skip0.
601исходный assert сохранён по полному AST/явным semantic адресам;13общих assertions
проверяют transport, host admission и terminal bridge в ядре. Private UI signal
проверяется после диалога/quote/upload/API await, но не входит в durable fingerprint.
Новый context перечитывает проекты независимо от зависшего A и завершает свой loader.
Boundary guard `development/scripts/check-web-boundary.mjs` проверяет фактические
продуктовые и тестовые imports; bundle graph и packaged приёмка остаются отдельными.
