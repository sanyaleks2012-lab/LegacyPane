# CS:GO Legacy — Panorama UI

## Overview

This directory contains the **Panorama UI** source files for **Counter-Strike: Global Offensive (Legacy version)**. Panorama is Valve's XML/JS/CSS-based UI framework used in Source 2 and later Source engine games. The folder holds both the **raw source files** (`.xml`, `.js`, `.css`) and **Python tooling** to compile them into the game's proprietary `.pbin` binary format.

## Directory Structure

```
panorama/
├── buildpbin.py          # Script to compile source files into a .pbin archive
├── tablelayout.py        # Script to generate a file-list manifest (.table.txt)
├── com.bat               # Batch convenience script (runs tablelayout + buildpbin)
├── panorama.table.txt    # Generated manifest listing all source file paths
├── code.pbin             # Compiled UI binary (used by the game at runtime)
├── 2/                    # Alternate/versioned UI folder (contains its own code.pbin + fonts + panorama/)
├── fonts/                # Font files (.vfont format + fonts.conf)
├── panorama/             # Raw UI source files
│   ├── layout/           # XML layout definitions
│   ├── scripts/          # JavaScript logic (Panorama JS API)
│   ├── styles/           # CSS stylesheets
│   ├── browser/          # WebKit-related assets
│   └── *.cfg             # Keybind and config files
└── videos/               # Video assets (if any)
```

## Key Components

### Python Tooling

| File | Purpose |
|---|---|
| `tablelayout.py` | Scans a target directory recursively and produces a `.table.txt` manifest file listing all files in sorted order |
| `buildpbin.py` | Reads the `.table.txt` manifest, bundles files into a ZIP archive, then patches it into a valid `.pbin` binary with the correct Valve-specific magic bytes (`PAN\x02` header, `XZP1 0` metadata) |
| `com.bat` | Convenience batch script that runs both tools in sequence: first generates the table, then builds the `.pbin` |

### Build Workflow

```bat
py tablelayout.py -i panorama
py buildpbin.py -i panorama -table panorama.table.txt -o code.pbin
```

Or simply run:
```bat
com.bat
```

### UI Source Files (`panorama/` subfolder)

- **`layout/`** — XML files defining every UI panel: main menu, HUD, buy menu, settings, popups, end-of-match screens, survival mode, tournaments, tooltips, context menus, etc.
- **`scripts/`** — JavaScript files implementing UI logic. Uses Panorama's JS engine (V8-based) with Valve's custom C++/JS bindings.
- **`styles/`** — CSS stylesheets for all UI panels.
- **`*.cfg`** — Configuration files (keybinds, panorama settings).

## Technologies

- **Panorama UI Framework** — Valve's proprietary UI framework using XML + JavaScript + CSS
- **Python 3** — Build scripts (uses `zipfile`, `argparse`, `pathlib`)
- **ZIP-based packaging** — `.pbin` files are modified ZIP archives with custom headers/metadata

## `.pbin` Format Details

The `buildpbin.py` script reveals the internal structure:
1. Files are packed into a **ZIP archive** (stored, no compression)
2. A `PAN\x02` header + 512 zero bytes are prepended
3. ZIP local file headers are patched to version `\x0A\x00`
4. Central directory entries are patched to `\x14\x00\x0A\x00`
5. End of Central Directory (EOCD) comment is set to 32 bytes starting with `XZP1 0` followed by a specific magic byte sequence

## Development Conventions

- **Naming**: Layout files use kebab-case (e.g., `mainmenu_news.xml`). JS/CSS files mirror layout names.
- **Structure**: Each major UI component has its own subdirectory under `layout/`, `scripts/`, and `styles/`.
- **Common utilities**: Shared JS modules live in `scripts/common/` (e.g., `commonutil.js`, `eventutil.js`, `iteminfo.js`).

## Notes

- This is from the **CS:GO Legacy** branch (pre-CS2). The UI framework has been superseded by Source 2's UI system in Counter-Strike 2.
- The `2/` directory appears to be an alternate or versioned build of the UI.
- Font files use Valve's proprietary `.vfont` format.
