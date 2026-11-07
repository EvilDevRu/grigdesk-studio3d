# Документация Studio3D

Studio3D — самостоятельный плагин GrigDesk с единственным id `studio3d`.
Он содержит создание моделей, библиотеку, задания, импорт, просмотр и экспорт.
Ключи и общие адаптеры поставщиков остаются в ядре.

Исходники, SDK, тесты и инструменты находятся в `development/`. Устанавливаемый
payload создаётся отдельным чистым export; рабочее дерево не является Git-релизом.
Наличие статьи или успешная изолированная fixture не подтверждает запуск установленного
комплекта ядра/окна, живой WebGL или реальную платную операцию.

Публичные адреса выпуска: `/ext/studio3d` и `/api/ext/studio3d`. Старый `/3d` сохраняется
только как redirect с query. Старый `/api/studio3d` удалён без прокси платных запросов.

## Руководство

- [Создание и библиотека 3D](guide/studio3d.md)

## Библиотека и сервер

- [Ядро обработки 3D и владение GLB worker](plugins/studio3d-core.md)
- [Файловые границы 3D](plugins/studio3d-file-boundaries.md) — закрепление родителя до mkdir/flock/marker и
  no-follow создание корня.
- [Импорт и история 3D](plugins/studio3d-importer.md)
- [Долговечный журнал заказов 3D](plugins/studio3d-intents.md)
- [Границы выполнения заказов 3D](plugins/studio3d-job-boundaries.md)
- [Выполнение заказов 3D](plugins/studio3d-jobs.md)
- [Библиотека 3D](plugins/studio3d-library.md)
- [Исполнители раздела 3D](plugins/studio3d-providers.md)
- [Восстановление и пределы раздела 3D](plugins/studio3d-recovery-and-limits.md)
- [Поиск и расходы моделей 3D](plugins/studio3d-search.md)
- [API, жизненный цикл и серверные уведомления 3D](plugins/studio3d-server.md)
- [Раздел «3D»](plugins/studio3d-user-contract.md)

## Клиент и просмотр

- [Границы клиента 3D](web/studio3d-client-boundaries.md)
- [Модули формы создания 3D](web/studio3d-creation-form.md)
- [Раскладка студии 3D](web/studio3d-layout.md)
- [Библиотека и действия модели](web/studio3d-models.md)
- [Задачи 3D и неизвестные исходы](web/studio3d-tasks.md)
- [Панель 3D и состояние инструмента](web/studio3d-tool-lifecycle.md)
- [Пользовательские сценарии 3D](web/studio3d-user-journeys.md)
- [Владение ресурсами просмотрщика 3D](web/studio3d-viewer-modules.md)
- [Просмотр моделей 3D](web/studio3d-viewer.md)
- [Клиент, намерения и подписка 3D](web/studio3d-window.md)
- [Рабочая область модели 3D](web/studio3d-workspace.md)

## Исходники и доказательства

Сервер и библиотека находятся в `development/src/server/` и `development/src/lib/studio3d/`;
общие DTO — `development/src/shared/studio3d/`; клиент — `development/src/web/`.
Тесты находятся в `development/tests/`, настоящий watchdog —
`development/scripts/run-node-tests-safe.sh`. Карта source SHA и происхождение
вендоринга хранятся в development, см. [описание репозитория](../README.md).

Программные fixtures используют временные каталоги и fake provider. Они не подтверждают
установленный packaged выпуск, живой WebGL или реальный платный заказ.

Клиентский шаг11 проверен отдельно:17store/context cases, включая разные owner, и
3mixed core integration для terminal/reload500 и UI adapters A→B. Ошибка библиотеки
закрывает платные controls и отзывает цену, сохраняя подтверждённые список/выбор/черновик.
Все20исходных UI suites (13logic+7mounted) и новые probes прошли общим профилем153/153
без пропусков. Сохранность601исходногоassert подтверждена AST/явной mixed картой;
13общих проверок остаются в ядре. Source/test boundary85files/288edges прошёл.
Граф payload и чистый export проверяются отдельно от установки в живой комплект ядра/окна.
## Разработка

- [Сборка готовых ресурсов и проверки графа](build.md) — payload, PNG-иконка и ресурсы README.

- [Разработка, watchdog, SDK и чистый release export](development.md) — проверки и публикация v0.1.0.
- [Применение и ручной откат ядра](migration.md)

Проверки документации и типов также принадлежат плагину: `tests/docs.test.mjs`
сверяет собственные ограничения импорта с кодом, а `tests/types/` сохраняет pending
контракт. Worker проверяется после перемещения payload и при read-only коде с отдельной
writable библиотекой; установка готового выпуска проверяется отдельно.

Встроенный UI удалён в той же миграции. Source integration восьми сценариев настоящего
ToolHost прошла без искусственной сортировки каталога, с единственной пользовательской
карточкой `studio3d`; подробности и границы — в [контракте окна](web/studio3d-window.md).
Результат source fixture не означает принятия установленного packaged выпуска.
