# Происхождение кода Studio3D

Плагин Studio3D распространяется под лицензией [MIT](LICENSE).

Продуктовые исходники и документация перенесены из GrigDesk с сохранением
условий MIT и исходного авторского права в [LICENSE](LICENSE).
Снимок исходного commit: `7b2b1f9a6946610637d96cfdd3ccef3c84812426`.

Development карта source SHA и imports: `development/scripts/port-map.json`;
подробности серверного вендоринга: `development/vendor/NOTICE.grigdesk.md`.
Development и SDK используются только для разработки и не входят в release export.
SDK не импортируется исполняемым payload; Vue и UI предоставляет ядро.


## Сторонние компоненты собранного UI

- Pinia 2.3.1 и vue-demi 0.14.10: MIT; полные условия в `assets/licenses/`.
- Three 0.186.1 и его addons: MIT; входят в отложенный viewer chunk.
- В addons Three включены fflate 0.8.2 (Arjun Barrett) и встроенный decoder
  meshoptimizer 1.1 (Arseny Kapoulkine), MIT. Их условия также сохранены в `assets/licenses/`.
- Vue и публичный UI предоставляет ядро; их копий в payload нет.

Тексты лицензий Pinia/Three/vue-demi взяты из закреплённых npm-пакетов.
MIT meshoptimizer сохранён из закреплённого пакета 1.1.1 с тем же авторским правом.
Лицензия fflate: [официальный текст
v0.8.2](https://raw.githubusercontent.com/101arrowz/fflate/v0.8.2/LICENSE).
Инструменты разработки, SDK и node_modules не входят в устанавливаемый export.
