# Клиент, намерения и подписка 3D

Плагин открывается по `/ext/studio3d` в единственном generic ToolHost: рейка, обычный и
развёрнутый док, широкая и узкая полная страница используют один экземпляр панели.
Старый `/3d` — redirect с сохранением query; до принятого enabled/compatible каталога
параметры не поглощаются. Missing, disabled, incompatible, loading и ошибка имеют
общие состояния host и переход в настройки без автоматической установки или включения.

Generic intent содержит `params.tab/model/version`. После обработки Root пробрасывает
consume-intent наружу; выбранные вкладка/модель/версия принадлежат панели. Compact даёт
одну прокручиваемую колонку. active=false размонтирует viewer и снимает viewing тему.
Заводская клавиша Ctrl+Shift+7 может быть изменена или отключена на устройстве.

UI start проверяет authenticated/clientScope и ждёт общий backgroundReady. Фоновый entry
работает без открытия панели, использует ту же auth API и IndexedDB прежнего профиля.
Срок автоматического повторного отправления browser pending — 10 минут; UUID и тело сохраняются.
Он восстанавливает pending даже на странице чата; закрытие панели не прекращает recovery.
Принятые сервером заказы продолжаются независимо от browser pending и черновика.

События context.events используют единую SSE оболочки. Progress правит DTO без HTTP,
changed объединяется за 300 мс. Server notification/snapshot восстанавливает пропущенные
ready/failed, persistent dedup текущего owner ограничен последними 500 ключами. Смена
owner/generation отзывает старый канал. Тост открывает `/ext/studio3d?model=…&version=…`;
активная видимая модель подавляет только свою тему. UI store terminal тосты не создаёт.

Поиск и цена ждут 300 мс. Search/offers/quote/detail имеют раздельные controllers и
поколения. Изменение формы сразу очищает цену, поздний ответ не разрешает новую оплату.
Service единолично владеет library state; settings.libraryDir синхронно отзывает admission,
а libraryEpoch/requestSeq защищают A→B→A. Временная недоступность отзывает цену и
платные действия, сохраняя последний подтверждённый список, выбор и черновик; только
успешно подтверждённая другая библиотека сбрасывает её проекции. Правила durable UUID, TTL и stale_library —
в [границах клиента](studio3d-client-boundaries.md).

Ширина навигатора хранится в прежнем ключе устройства `grigdesk-studio3d-nav-width`,
240–420 px, по умолчанию 260 px. Separator использует pointer capture, стрелки/Shift,
Home/End и сброс двойным щелчком. Поиск и геометрия не меняют server prefs.

Форма хранит черновик пока живёт контекст того же owner и библиотека. Семь типов поля,
visibleWhen, группы движений, поиск и advanced errors сохранены. Неизвестная цена/баланс
платного шага блокируют запуск; действительная нулевая цена допустима. Batch до 50 строк
подтверждает общую сумму и один server snapshot. Правка/скрытие/закрытие во время диалога
даёт ноль POST. Price_changed и stale_library требуют отдельного нового нажатия.

PNG/JPEG/WebP проверяются по bytes и bitmap decode до 20 МиБ/64 Мп. Swap сохраняет File
и upload identity. Общие линии видов поддерживают pointer/keyboard. Лист режется локально:
порог фона 24, пустота <0,5%, gap 1%, поля 2%; назначение прямоугольников подтверждает
человек. Bitmap/URL/canvas освобождаются. Собственный файл добавляется бесплатно;
GLTF с соседями предлагается сохранить в самостоятельный GLB.

API `/api/ext/studio3d` использует общий auth transport, закрытые DTO и явные ошибки/retry.
Source/fixture проверки не подтверждают установленный packaged выпуск; статус переноса —
в [оглавлении](../README.md).

## Проверка после удаления встроенного UI

В ядре удалены прежние Studio3dView, Studio3dPanel, store, viewer, loading и статическая
запись инструмента. Идентификатор `studio3d` теперь принадлежит только пользовательскому
пакету. `/3d` сохраняет query и hash при redirect; старого API и платного прокси нет.
Настройки старого `tools.studio3d` открывают карточку `plugins.installed` с entity `studio3d`.

Исходная integration fixture `studio3d-full-tool-host.component.test.js` проверяет
настоящие ToolHost, PluginView, PluginModulePanel и default PanelRoot пакета через общий
HTTP/IDB/bootstrap. Восемь cases покрывают страницу 1280/899 px, док 900 px, hide/show с черновиком,
выбор модели/версии, default/custom/off клавишу 899/900 px и отсутствие пакета 899/900 px.
Каталог не сортируется искусственно: пользовательская карточка `studio3d` одна,
встроенной записи нет. При missing import/start UI и background равны нулю; query
сохраняется до ready. Это source fixture с fake provider, без живого WebGL и платных
операций. Приёмка установленного packaged выпуска проводится отдельно.
