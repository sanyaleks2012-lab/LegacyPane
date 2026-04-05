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

1. Download `code.pbin` from [Releases](https://github.com/sanyaleks2012-lab/LegacyPane/releases)
2. Place it in your CS:GO directory:
   ```
   csgo/panorama/code.pbin
   ```
3. Restart the game

That's it.

---

## Building from source

Requires Python 3.

```
cd csgo/panorama
com.bat
```

Or run the two scripts manually:

```
py tablelayout.py -i panorama
py buildpbin.py -i panorama -table panorama.table.txt -o code.pbin
```

The build system packs all source files into a ZIP, then patches it into Valve's proprietary `.pbin` format (PAN header, version bytes, XZP1 metadata).

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

- [Classic Offensive](https://github.com/CSCO-dev/ClassicOffensive) — loading screen
- Valve — CS:GO and Panorama framework

---

Not affiliated with Valve. Use at your own risk.
