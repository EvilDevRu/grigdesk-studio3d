# Сборка готовых ресурсов Studio3D

`development/` — рабочие исходники, SDK, закреплённые devDependencies и тесты.
Они не являются install payload. V1 manifest находится в `plugin.json`, иконка —
собственный PNG `assets/icon.png` (96×96, RGBA). В README используется копия
той же иконки `docs/assets/studio3d.png` (256×256). Оба файла входят в чистый export;
иконка манифеста укладывается в лимит 256 КиБ. Package id остаётся `studio3d`, default disabled;
autoImport=true, lowDiskGb=10 и libraryDir="" сохраняют прежние defaults.

Из `development` команда `npm run build` обновляет только собственные generated
server.mjs, runtime/analysisWorker.mjs и ui рабочего проекта. Перед записью ссылки
и неверный тип generated target отклоняются; Vite очищает только generated ui,
поэтому прежние development chunks не попадают в новую сборку.
`node scripts/build.mjs --out-dir <абсолютная-пустая-папка>` создаёт отдельный build
candidate, независимо от cwd. Общий scripts/outputDirectory.mjs проверяет абсолютность и обычные предки без
symlink.
Непустой output и путь внутри рабочего P отклоняются
без удаления содержимого. Это ещё не финальный release export с receipt/digest.

Server и worker собираются esbuild в ESM target Node22, с bundled dependencies
и внешними только Node builtins. Worker разрешается от собственной executing ESM
копии server entry. Runtime получает настоящий Node executable через core SDK;
поиск в PATH и выбор worker из plugin.dir не используются.

Vite выпускает panel/background entry и один общий pending-service chunk.
Vue и @grigdesk/ui остаются внешними фасадами; Pinia, Three и meshoptimizer внутри.
CSS отдельный panel.css, локали ui/locales/ru.json и en.json. modulePreload=false,
cssCodeSplit=false и явный production define исключают Node process dependency
библиотечной сборки в браузере. Фон не импортирует panel/Pinia/viewer/CSS.

Пакетные проверки запускаются настоящим watchdog с 4096 МиБ/concurrency2. Для
worker contract передаётся `STUDIO3D_CORE_NODE` — фактический Node executable ядра.
Проверки lexer3 + esbuild/Rollup metafiles разбирают все JS chunks и static/dynamic
imports: разрешены только свои relative JS и два web externals. Computed/glob,
внешний npm, TS/CSS imports и bundled Vue отклоняются. Готовый default panel
импортируется с тестовыми фасадами и отсутствующим global process; это проверка
browser ambient, а не установленного окна или WebGL.

Отдельные тесты загружают built server default, проверяют его реальный Node/own worker
composition, fd3/fd4, rewrite scale и настоящий GLB. Общий scanner/validator ядра
проверяет отдельный ordinary candidate. Форматный validator fixture не заменяет настоящий installer и полный
production
список reservedIds ядра. Готовый пакет устанавливается через обычный подтверждаемый путь.

Metadata доказательств находится в development/dist, исходное происхождение —
development/scripts/port-map.json и web-port-map.json. Они не входят в payload.
Лицензия и уведомления — LICENSE и NOTICE.md; имя NOTICE.md каноническое.
Окончательный чистый export и проверка настоящего installer выполняются отдельно.
