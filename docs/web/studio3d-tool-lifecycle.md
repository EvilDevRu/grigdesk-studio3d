# Панель 3D и состояние инструмента

Studio3D — внешний плагин с единственным id `studio3d`. Панель регистрируется манифестом
в generic ToolHost; `/ext/studio3d`, рейка, док и раскрытие используют один экземпляр.
`/3d` перенаправляет с query. Пропущенный пакет требует установки в общих настройках,
выключенный — явного включения. Старый встроенный UI и второй plugin id не поставляются.

PanelRoot получает PluginModuleContext, active/compact/presentation и generic intents.
Он предоставляет реактивную session ссылку; новый context того же owner перепривязывает
store/события и сохраняет локальный черновик. Другой owner получает чистую сессию.
Private Pinia создаётся явно на context, singleton Pinia окна не используется.
Optional backgroundReady и notifications.setViewing проверяются как функции до auth
и создания Pinia. Auth error отображается с retry; поздний auth после abort не создаёт UI.
Смена context передаётся реактивным parent, без перемонтирования child того же owner.
Background pendingService имеет отдельное время жизни и работает без UI acquire.

Вкладка, модель, версия и сравнение принадлежат панели; адрес чата не меняется. Intent
params подтверждается consume-intent после обработки. Ctrl+Shift+7 — заводской hotkey;
пользовательский, выключенный и конфликтующий combo обрабатывает общая механика host.

Compact располагает дерево, страницу и подробности одной колонкой. Развёрнутая модель
использует три адаптивные колонки; форма, библиотека и задачи — полную ширину без пустых
боков. Разворачивание не перемонтирует форму/модель. active=false размонтирует viewer
и снимает context.notifications viewing тему; общая труба и фон продолжают работать.

RigCheck имеет собственный результат: ожидание, разрешённый тип тела, отказ или ошибка.
Проверка без новой версии сохраняет выбор. Отказ второго холста сохраняет первый и снимок.
ModelEditDialog меняет имя/категорию/проект. Удаление модели подтверждается общим диалогом
и привязано к captured library marker; stale ответ не продолжает действие в новой библиотеке.

UI controls/dialogs импортируются через @grigdesk/ui. Локальные переводы идут через
context.t; строковые данные сервера не интерпретируются как переводимые ключи.
Terminal ready/failed производит только общий server notification bridge; его seen
ограничен 500 ключами текущего owner. Ошибка связи имеет понятное сообщение и retry.

Проверки: все перенесённые mounted/logic suites и generic host integration page/dock/899.
Их фактическое завершение и packaged приёмка отмечаются отдельно в [оглавлении](../README.md).

Private UI context signal закрывает поздние callbacks форм, сохранения, импорта и
разбора неизвестного заказа при rebind A→B с тем же libraryId. Он не меняет durable
запрос и не отзывает background service. Fresh projects B не ждут зависший transport A.
Полный источник20suites и lifecycle probes проверен153/153; источник assertions сохранён
в development/scripts/web-port-map.json. Реальная packaged приёмка отмечается отдельно.
