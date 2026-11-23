#!/usr/bin/env python3
"""
Sniff logosunu (krem zemin üzerinde lacivert) şeffaf PNG varyantlarına dönüştürür.

Kaynak: brand-source/sniff-logo-source.png
Çıktı:  public/brand/sniff-logo.png            (tam logo, lacivert)
        public/brand/sniff-logo-cream.png      (tam logo, krem — koyu zeminler için)
        public/brand/sniff-wordmark.png        (yalnızca "Sniff" yazısı, lacivert)
        public/brand/sniff-wordmark-cream.png  (yalnızca "Sniff" yazısı, krem)

Kullanım: python3 scripts/prepare-logo.py
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand-source" / "sniff-logo-source.png"
OUT = ROOT / "public" / "brand"

NAVY = (0x13, 0x29, 0x4B)
CREAM = (0xF5, 0xE9, 0xDA)
SCALE = 3          # kenarların pürüzsüz olması için büyütme
PAD = 6            # kırpma çevresindeki boşluk (kaynak px)

# Kaynak görseldeki bölgeler (x0, y0, x1, y1)
REGIONS = {
    "sniff-logo": (49, 23, 634, 346),
    "sniff-wordmark": (49, 23, 634, 281),
}


def alpha_mask(gray: Image.Image) -> np.ndarray:
    big = gray.resize((gray.width * SCALE, gray.height * SCALE), Image.Resampling.LANCZOS)
    big = big.filter(ImageFilter.GaussianBlur(0.6))  # JPEG kenar kirliliğini yumuşat
    L = np.asarray(big).astype(float)
    l_bg, l_ink = np.percentile(L, 97), np.percentile(L, 3)
    a = np.clip((l_bg - L) / (l_bg - l_ink), 0, 1)
    a = np.clip((a - 0.5) * 1.35 + 0.5, 0, 1)  # kenarları netleştir
    return (a * 255).astype(np.uint8)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("L")
    for name, (x0, y0, x1, y1) in REGIONS.items():
        crop = src.crop((x0 - PAD, y0 - PAD, x1 + PAD, y1 + PAD))
        a = alpha_mask(crop)
        for suffix, color in (("", NAVY), ("-cream", CREAM)):
            rgba = np.zeros((*a.shape, 4), dtype=np.uint8)
            rgba[..., :3] = color
            rgba[..., 3] = a
            out = OUT / f"{name}{suffix}.png"
            Image.fromarray(rgba).save(out, optimize=True)
            print(f"✓ {out.relative_to(ROOT)}  {a.shape[1]}x{a.shape[0]}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
