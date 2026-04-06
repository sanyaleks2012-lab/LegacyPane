#!/usr/bin/env python3
"""Generate PNG gradient backgrounds using only stdlib (struct + zlib)."""

import struct
import zlib
import os

OUTPUT_DIR = r"c:\Program Files (x86)\Steam\steamapps\common\csgo legacy\csgo\panorama\backgrounds"

FILES = {
    "background_4x3.png": (1024, 768),
    "background_16x9.png": (1920, 1080),
    "background_21x9.png": (2560, 1080),
}

# Gradient colors
C1 = (0x1a, 0x1a, 0x2e)  # #1a1a2e
C2 = (0x16, 0x21, 0x3e)  # #16213e
C3 = (0x0f, 0x34, 0x60)  # #0f3460


def lerp_color(c1, c2, t):
    """Linear interpolation between two RGB colors."""
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def get_gradient_pixel(x, y, width, height):
    """Get gradient color for a pixel using a vertical 3-stop gradient."""
    # Normalize y to 0..1
    t = y / max(height - 1, 1)
    if t < 0.5:
        # Interpolate between C1 and C2
        return lerp_color(C1, C2, t * 2)
    else:
        # Interpolate between C2 and C3
        return lerp_color(C2, C3, (t - 0.5) * 2)


def create_png(width, height):
    """Create a PNG image file (bytes) with a vertical gradient."""
    def make_chunk(chunk_type, data):
        """Create a PNG chunk: length + type + data + CRC."""
        chunk = chunk_type + data
        return struct.pack(">I", len(data)) + chunk + struct.pack(">I", zlib.crc32(chunk) & 0xFFFFFFFF)

    # PNG signature
    signature = b"\x89PNG\r\n\x1a\n"

    # IHDR chunk
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    # 8 = bit depth, 2 = RGB color type
    ihdr = make_chunk(b"IHDR", ihdr_data)

    # IDAT chunk (image data)
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # Filter type: None
        for x in range(width):
            r, g, b = get_gradient_pixel(x, y, width, height)
            raw_data.extend([r, g, b])

    compressed = zlib.compress(bytes(raw_data), 9)
    idat = make_chunk(b"IDAT", compressed)

    # IEND chunk
    iend = make_chunk(b"IEND", b"")

    return signature + ihdr + idat + iend


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for filename, (w, h) in FILES.items():
        path = os.path.join(OUTPUT_DIR, filename)
        print(f"Generating {filename} ({w}x{h})...", end=" ")
        png_bytes = create_png(w, h)
        with open(path, "wb") as f:
            f.write(png_bytes)
        print(f"done ({len(png_bytes)} bytes)")


if __name__ == "__main__":
    main()
