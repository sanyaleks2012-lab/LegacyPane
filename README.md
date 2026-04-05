# LegacyPane

Custom Panorama UI for CS:GO Legacy. Cleaner interface, loading screen from Classic Offensive, and a few quality-of-life fixes.

---

## What it does

**Removes clutter from the main menu:**
- Advertising toggle
- News panel
- Store
- Watch tab
- Stats (CS:GO 360)
- Limited Test entries

**Loading screen** (ported from Classic Offensive):
- CT/T spawn icons on the overhead map
- Bomb site and hostage markers (SVG instead of PNG)
- Gold progress bar matching the hint text color
- Slide-up close animation instead of fade
- Fallback image if map overview fails to load

**Buy menu:**
- Shows weapon model instead of the agent character

**Community servers:**
- Server browser button is now always visible in the sidebar

---

## Installation

Download `code.pbin` from [Releases](https://github.com/sanyaleks2012-lab/LegacyPane/releases) and place it in:

```
csgo/panorama/code.pbin
```

Restart the game.

---

## Building from source

### Prerequisites
- Python 3

### Using the build script
```
cd csgo/panorama
com.bat
```

### Manual build
```
py tablelayout.py -i panorama
py buildpbin.py -i panorama -table panorama.table.txt -o code.pbin
```

The build process packs all source files into a ZIP archive and converts it to Valve's `.pbin` format. For more details on the format, see [PBIN-Packer](https://github.com/901D3/PBIN-Packer).

---

## Structure

```
panorama/
  layout/    -- XML layouts
  scripts/   -- JS logic
  styles/    -- CSS styles
  browser/   -- WebKit config
  *.cfg      -- keybinds
```

---

## Credits

- Loading screen ported from [Classic Offensive](https://steamcommunity.com/id/zoolsmith) by **zoolsmith**
- PBIN build tooling by [901D3](https://github.com/901D3/PBIN-Packer)
- Valve -- CS:GO and Panorama framework

---

Made by [sanyaleks2012-lab](https://steamcommunity.com/profiles/76561198726950349/)

Not affiliated with Valve. Use at your own risk.
