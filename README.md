# 🎯 LegacyPane

> **Оптимизированный Panorama HUD для Counter-Strike: Global Offensive (Legacy)**

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CS:GO](https://img.shields.io/badge/game-CS%3AGO%20Legacy-orange.svg)](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)
[![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)](https://www.microsoft.com/)
[![Stars](https://img.shields.io/github/stars/sanyaleks2012-lab/LegacyPane?style=social)](https://github.com/sanyaleks2012-lab/LegacyPane/stargazers)

---

## 📋 Описание

**LegacyPane** — это кастомная сборка Panorama UI для CS:GO Legacy, направленная на **максимальную оптимизацию**, **чистоту интерфейса** и **современный внешний вид**.

Проект убираает весь визуальный мусор, возвращает классический стиль загрузки из Classic Offensive и добавляет удобные функции, которых не хватало в ванильной игре.

---

## ✨ Возможности

### 🧹 Очистка главного меню
| Было | Стало |
|------|-------|
| Рекламный баннер | ❌ Убран |
| Новости | ❌ Убраны |
| Магазин | ❌ Убран |
| Вкладка «Смотреть» | ❌ Убрана |
| Статистика (CS:GO 360) | ❌ Убрана |
| Подбор союзника (Limited Test) | ❌ Убран |

### 🎨 Загрузочный экран
- ✨ **Классический стиль** из Classic Offensive
- 🗺️ **Иконки на карте**: спавны CT/T, точки закладки A/B, заложники
- 🎨 **SVG-иконки** вместо PNG — чёткие на любом разрешении
- 🟡 **Золотой прогресс-бар** в цвет подсказок
- 🔄 **Slide-up анимация** закрытия вместо fade-out
- 💡 **Fallback** при ошибке загрузки карты

### 🔫 Меню покупки
- 🎯 **Модель оружия** вместо агента-персонажа
- 📐 Уменьшенный размер для лучшей обзорности

### 🌐 Серверы сообщества
- 🖥️ **Кнопка «Серверы сообщества»** всегда видна в боковом меню
- ⚡ Быстрый доступ через `gamemenucommand openserverbrowser`

---

## 📦 Установка

### Шаг 1: Скачайте файл
Скачайте `code.pbin` из раздела [Releases](https://github.com/sanyaleks2012-lab/LegacyPane/releases) или соберите самостоятельно (см. ниже).

### Шаг 2: Скопируйте файл
Поместите `code.pbin` в папку:
```
C:\Program Files (x86)\Steam\steamapps\common\csgo legacy\csgo\panorama\
```

### Шаг 3: Перезапустите игру
Закройте CS:GO полностью и запустите заново. Готово! 🎉

---

## 🔧 Сборка из исходников

Если вы хотите собрать `code.pbin` самостоятельно:

### Требования
- **Python 3.6+**

### Команды
```bat
cd "C:\Program Files (x86)\Steam\steamapps\common\csgo legacy\csgo\panorama"
com.bat
```

Или вручную:
```bat
py tablelayout.py -i panorama
py buildpbin.py -i panorama -table panorama.table.txt -o code.pbin
```

---

## 📂 Структура проекта

```
panorama/
├── panorama/
│   ├── layout/          # XML-файлы интерфейса
│   ├── scripts/         # JavaScript логика
│   ├── styles/          # CSS стили
│   └── browser/         # WebKit настройки
├── fonts/               # Шрифты (.vfont)
├── videos/              # Видео-файлы
├── tablelayout.py       # Генератор манифеста
├── buildpbin.py         # Сборщик .pbin
└── com.bat              # Удобный скрипт сборки
```

---

## ⚙️ Технические детали

Формат `.pbin`:
1. Файлы упаковываются в **ZIP-архив** (без сжатия)
2. Добавляется заголовок `PAN\x02` + 512 байт нулей
3. ZIP-заголовки патчатся до версий `\x0A\x00` и `\x14\x00\x0A\x00`
4. В конец добавляется метаданные `XZP1 0` + магические байты

---

## ⚠️ Отказ от ответственности

Данный проект **не является официальным продуктом Valve**. Все торговые марки принадлежат их владельцам.

Используйте на свой страх и риск. Авторы не несут ответственности за возможные проблемы.

---

## 🤝 Благодарности

- **[Classic Offensive](https://github.com/CSCO-dev/ClassicOffensive)** — загрузочный экран, вдохновение
- **Valve Corporation** — CS:GO и Panorama UI framework

---

## 📝 Лицензия

MIT License — см. файл [LICENSE](LICENSE) для подробностей.

---

<p align="center">
  <sub>Сделано с ❤️ для сообщества CS:GO Legacy</sub>
</p>
