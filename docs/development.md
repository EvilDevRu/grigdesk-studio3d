# Разработка и выпуск Studio3D

Исходники, SDK, зависимости и тесты находятся в `development/`. Устанавливаемый
пакет создаётся отдельным export: тег рабочего дерева с `development/` для установки
не подходит. Сервер и UI используют единственный id `studio3d`.

Репозиторий выпусков — `https://github.com/EvilDevRu/grigdesk-studio3d`.
Выпуск `0.1.0` использует тег `v0.1.0`; в ветке `main` и под тегом находится
готовый payload с `plugin.json` в корне. Архив выпуска и inventory с SHA-256
содержат те же файлы. Рабочие исходники и инструменты разработки хранятся отдельно.

## Подготовка и проверки

Из `development/` выполните `npm ci --ignore-scripts`. Версии зависимостей закреплены
в `package-lock.json`; приложение предоставляет Vue и публичный `@grigdesk/ui`,
а Pinia, Three и декодеры входят в собранный UI. SDK — dev-only file dependency.
Ключи и общие адаптеры поставщиков находятся в ядре, в пакет не копируются.

SDK собирается из соответствующего ядра командой
`npm --prefix web run build:plugin-types -- --out-dir <absolute-empty-sdk>`.
Результат копируется в `development/sdk/`; runtime не импортирует SDK.
Обе программы типов используют `skipLibCheck: false`.

Основные команды из `development/`:

```sh
npm run typecheck:server
npm run typecheck:web
npm run build
STUDIO3D_CORE_NODE=<absolute-core-node> \
  GRIGDESK_ARTIFACTS_DIR=<absolute-artifacts-root> bash scripts/test.sh
```

Папка артефактов задаётся явно, временные материалы создаются в её подкаталоге
`studio3d-extraction/`. `test.sh` вычисляет своё расположение по `BASH_SOURCE`,
передаёт полный явный список `*.test.mjs` настоящему сторожу памяти и задаёт
4096 МиБ RSS группы и concurrency 2.
`STUDIO3D_CORE_NODE` — явный test port с Node из `core.environment().nodeExecutable`;
подстановка `process.execPath` или случайного Node из PATH не используется. Голый `node --test` не
используется.
Сторож создаёт собственный data home, запускает отдельную process group,
учитывает потомков и завершает только свою группу при превышении RSS.

Сборка создаёт `server.mjs`, `runtime/analysisWorker.mjs` и `ui/` в корне плагина.
Node worker выбирается публичным environment ядра и исполняет собственную ESM-копию
текущего поколения. Фон и панель ссылаются на один общий chunk pendingService;
загрузка фонового entry не импортирует панель, Pinia, просмотрщик или её CSS.

## Чистый export

После зелёных профильных проверок:

```sh
node scripts/release.mjs --out-dir <absolute-empty-export>
```

Цель должна быть пустой и находиться вне рабочего дерева. Экспортёр не очищает
непустые папки, не создаёт Git-репозиторий и не устанавливает пакет. Он копирует
только `plugin.json`, `server.mjs`, `runtime/`, `ui/`, `assets/`, `docs/`,
`README.md`, `LICENSE` и `NOTICE.md`. Development, SDK, node_modules,
корневые package.json/package-lock и devDependencies в export не входят.

Соседний `<export>.receipt.json` содержит перечень `{path,size,sha256}` и digest:
SHA-256 UTF-8 `JSON.stringify(sortedFiles) + "\n"`, где файлы отсортированы
по path с `localeCompare(..., 'en')`. Receipt находится вне устанавливаемого
дерева. Перед передачей повторно сравните перечень и digest с фактическими байтами.
Симлинки и специальные файлы запрещены; предел — 5000 файлов и 50 МиБ.

Для локальных изолированных тестов установщика используется временный Git-репозиторий
этого export. Настоящий release URL и точный тег выбирает владелец: он публикует
проверенный payload отдельно либо в release-ветке с payload в корне. Рабочий каталог
плагина нельзя предлагать как устанавливаемый `file://` release.

## Происхождение и синхронизация

`development/scripts/port-map.json` фиксирует исходные файлы, source SHA и карту
перенесённых imports. `development/vendor/NOTICE.grigdesk.md` и vendor map описывают
небольшие явно скопированные независимые модули. Изменение исходного общего модуля
проверяется по SHA, затем переносится осмысленно и проверяется профильным тестом;
слепая синхронизация всех `shared/` или повторное копирование продукта из ядра не нужны.

Лицензии включённых сторонних библиотек находятся в `assets/licenses/`, происхождение
переноса и авторское право — в [NOTICE](../NOTICE.md) и [LICENSE](../LICENSE).
Изолированные fake-provider/HTTP/IDB проверки не заменяют запуск установленного
комплекта ядра/окна, живой WebGL и платный заказ. Эти виды приёмки отмечаются отдельно.

Порядок применения и ручного отката описан в [переходе на самостоятельный плагин](migration.md).
