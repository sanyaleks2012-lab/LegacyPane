"""
CS:GO Panorama Background PNG Converter (16:9)

Converts images to PNG 1920x1080 (16:9).

Usage:
    py convert_to_png.py                          — конвертирует все файлы из папки backgrounds/
    py convert_to_png.py <файл>                   — конвертирует конкретный файл
    py convert_to_png.py --help                   — показать инструкцию
    py convert_to_png.py --keep-original          — не удалять оригиналы
"""

import os
import sys

SUPPORTED_EXT = {'.webp', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.tif', '.avif', '.png'}

# Target 16:9 resolution
TARGET_W = 1920
TARGET_H = 1080

INSTRUCTIONS = """
============================================================
  CS:GO Panorama Background PNG Converter (16:9)
============================================================

  Converts images to PNG 1920x1080 (16:9).

  Usage:
    py convert_to_png.py                          - convert all in backgrounds/
    py convert_to_png.py <файл>                   - convert specific file
    py convert_to_png.py --help                   - show this message
    py convert_to_png.py --keep-original          - keep source files

  Requirements: Pillow
    pip install Pillow

============================================================
"""

def print_instructions():
    print(INSTRUCTIONS)

def convert_file(fpath, out_dir=None, keep_original=False):
    if not os.path.isfile(fpath):
        print(f'  [!] Not a file: {fpath}')
        return False

    try:
        from PIL import Image, ImageOps
    except ImportError:
        print('[!] Pillow is not installed.')
        print('[!] Install it with: pip install Pillow')
        return False

    if out_dir is None:
        out_dir = os.path.dirname(fpath) or '.'

    name, ext = os.path.splitext(os.path.basename(fpath))
    out_path = os.path.join(out_dir, 'background_16x9.png')

    try:
        img = Image.open(fpath)
        
        # Force load pixels to catch format-specific errors
        try:
            img.load()
        except Exception:
            pass
        
        # Convert directly to RGB to avoid alpha/transparency issues with AVIF/WebP
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGBA')

        if img.mode == 'RGBA':
            # Composite onto black background to handle bad alpha
            bg = Image.new('RGB', img.size, (0, 0, 0))
            if img.mode == 'RGBA':
                bg.paste(img, mask=img.split()[3])
                img = bg
            else:
                img = img.convert('RGB')
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Resize to 1920x1080 keeping aspect ratio, fill with black
        img_resized = ImageOps.contain(img, (TARGET_W, TARGET_H))

        # Create final 1920x1080 image with black background
        final = Image.new('RGB', (TARGET_W, TARGET_H), (0, 0, 0))
        paste_x = (TARGET_W - img_resized.size[0]) // 2
        paste_y = (TARGET_H - img_resized.size[1]) // 2
        final.paste(img_resized, (paste_x, paste_y))

        final.save(out_path, 'PNG')

        if not keep_original:
            os.remove(fpath)

        print(f'  [ok] {os.path.basename(fpath)} -> background_16x9.png (1920x1080)')
        return True
    except Exception as e:
        # Fallback: try using ffmpeg subprocess
        try:
            import subprocess
            ffmpeg_out = os.path.join(out_dir, 'background_16x9.png')
            cmd = [
                'ffmpeg', '-y',
                '-i', fpath,
                '-vf', f'scale={TARGET_W}:{TARGET_H}:force_original_aspect_ratio=decrease,pad={TARGET_W}:{TARGET_H}:(ow-iw)/2:(oh-ih)/2:black',
                ffmpeg_out
            ]
            result = subprocess.run(cmd, capture_output=True, timeout=30)
            if result.returncode == 0 and os.path.exists(ffmpeg_out):
                if not keep_original:
                    os.remove(fpath)
                print(f'  [ok] {os.path.basename(fpath)} -> background_16x9.png (1920x1080) [via ffmpeg]')
                return True
        except FileNotFoundError:
            pass  # ffmpeg not installed
        except:
            pass  # any other error
        
        print(f'  [err] {os.path.basename(fpath)}: {e}')
        return False

def convert_folder(folder, keep_original=False):
    if not os.path.isdir(folder):
        print(f'[!] Folder not found: {folder}')
        return

    converted = 0
    skipped = 0

    for fname in sorted(os.listdir(folder)):
        fpath = os.path.join(folder, fname)
        if not os.path.isfile(fpath):
            continue

        ext = os.path.splitext(fname)[1].lower()
        if ext not in SUPPORTED_EXT:
            skipped += 1
            continue

        if ext == '.png':
            try:
                from PIL import Image
                img = Image.open(fpath)
                if img.size[0] == TARGET_W and img.size[1] == TARGET_H and fname == 'background_16x9.png':
                    skipped += 1
                    continue
            except:
                pass

        if convert_file(fpath, folder, keep_original):
            converted += 1
            break  # Only one background_16x9.png needed
        else:
            skipped += 1

    print(f'\n[+] Done: {converted} converted, {skipped} skipped')

if __name__ == '__main__':
    keep_original = '--keep-original' in sys.argv
    show_help = '--help' in sys.argv or '-h' in sys.argv

    if show_help:
        print_instructions()
        sys.exit(0)

    # Check if a file argument is provided
    file_arg = None
    for arg in sys.argv[1:]:
        if not arg.startswith('--'):
            file_arg = arg
            break

    if file_arg:
        if not os.path.isfile(file_arg):
            print(f'[!] File not found: {file_arg}')
            print_instructions()
            sys.exit(1)
        convert_file(file_arg, keep_original=keep_original)
    else:
        # Default: use backgrounds/ folder next to this script
        backgrounds_dir = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            'backgrounds'
        )
        print(f'[*] Converting files in: {backgrounds_dir}')
        convert_folder(backgrounds_dir, keep_original=keep_original)
