#!/usr/bin/env python3
"""
Öncesi/Sonrası fotoğraflarını hazırlar.

Kaynak: raw-transformations/ (proje kökü) veya public/raw-transformations/
        dog-1, dog-2, dog-3 … (.png / .jpg / .jpeg / .webp)
        Her fotoğrafta: üstte Sniff logosu, altta SOL: öncesi, SAĞ: sonrası köpek.

İşlem:
  1. Üstten %23 (logo) ve alttan %2 (Instagram kaydırma noktaları) kırpılır.
  2. Fotoğraf iki köpeğin ARASINDAKİ boş sütundan ikiye bölünür
     (boşluk bulunamazsa tam ortadan).
  3. Her yarı, köpek ortalanarak ortak 2:3 çerçeveye yerleştirilir; başın üstüne
     stüdyo boşluğu eklenir, eksik kenarlar fotoğrafın kendi arka plan rengiyle
     yumuşak geçişle doldurulur. Öncesi/sonrası birebir aynı boyutta olur, köpek kırpılmaz.
  4. Lanczos3 ile 1000px genişliğe (1000x1500) ölçeklenir, UnsharpMask ile hafif
     keskinleştirilir, JPEG q95 + 4:4:4 renk ile kaydedilir.

Çıktı: public/transformations/dog-N-before.jpg ve dog-N-after.jpg

Kullanım:  npm run split-photos
Gereksinim: Pillow + numpy  (pip3 install Pillow numpy)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import numpy as np
    from PIL import Image, ImageFilter, ImageOps
except ImportError:
    sys.exit("Pillow ve numpy gerekli. Kurmak için: pip3 install Pillow numpy")

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIRS = [ROOT / "raw-transformations", ROOT / "public" / "raw-transformations"]
OUT_DIR = ROOT / "public" / "transformations"

TOP_CROP_RATIO = 0.23      # üstten kesilecek oran (logo)
BOTTOM_CROP_RATIO = 0.02   # alttan kesilecek oran (Instagram kaydırma noktaları)
SEARCH_RANGE = (0.35, 0.65)  # köpekler arası boşluğun aranacağı yatay aralık
BG_THRESHOLD = 60          # arka plandan bu kadar farklı piksel = köpek
FRAME_RATIO = 2 / 3        # çıktı en/boy oranı (genişlik / yükseklik) — slider kutusuyla aynı
HEADROOM = 0.08            # köpeğin başının üstüne eklenecek stüdyo boşluğu (yüksekliğin oranı)
OUTPUT_WIDTH = 1000        # çıktı genişliği (yükseklik orana göre: 1000x1500)
FEATHER = 48               # dolgu ile fotoğraf arasındaki yumuşak geçiş (px)
JPEG_QUALITY = 95


def find_sources() -> list[Path]:
    found: dict[str, Path] = {}
    for d in SOURCE_DIRS:
        if not d.is_dir():
            continue
        for p in sorted(d.iterdir()):
            if re.fullmatch(r"dog-\d+", p.stem) and p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
                found.setdefault(p.stem, p)
    return [found[k] for k in sorted(found, key=lambda s: int(s.split("-")[1]))]


def dog_mask(arr: np.ndarray) -> np.ndarray:
    h = arr.shape[0]
    bg = np.median(arr[h // 2 - 20 : h // 2 + 20, :6].reshape(-1, 3), axis=0)
    return np.abs(arr - bg).sum(axis=2) > BG_THRESHOLD


def find_split_column(arr: np.ndarray) -> int:
    h, w, _ = arr.shape
    filled = dog_mask(arr).sum(axis=0)
    lo, hi = int(w * SEARCH_RANGE[0]), int(w * SEARCH_RANGE[1])
    col = lo + int(np.argmin(filled[lo:hi]))
    return col if filled[col] <= h * 0.15 else w // 2


def fit_to_frame(half: np.ndarray, outer: str) -> np.ndarray:
    """Yarıyı köpek ortalanmış şekilde FRAME_RATIO çerçevesine yerleştirir (üstte boşluk bırakarak)."""
    h, w, _ = half.shape
    min_h = round(h * (1 + HEADROOM))
    target_w = max(w, round(min_h * FRAME_RATIO))
    target_h = round(target_w / FRAME_RATIO)

    # Köpeğin yatay merkezi
    cols = np.where(dog_mask(half).sum(axis=0) > h * 0.02)[0]
    center = (cols.min() + cols.max()) / 2 if cols.size else w / 2
    offset = int(round(target_w / 2 - center))
    offset = max(target_w - w, min(0, offset)) if w > target_w else max(0, min(target_w - w, offset))

    # Satır bazında arka plan rengi (fotoğrafın dış kenarındaki sütunlardan)
    edge = half[:, :12] if outer == "left" else half[:, -12:]
    row_bg = np.median(edge, axis=1)  # (h, 3)
    canvas = np.repeat(row_bg[:, None, :], target_w, axis=1).astype(float)

    # Fotoğrafı yumuşak kenarlarla tuvale yerleştir
    alpha = np.ones(w)
    ramp = np.linspace(0, 1, FEATHER)
    if offset > 0:
        alpha[:FEATHER] = np.minimum(alpha[:FEATHER], ramp)
    if offset + w < target_w:
        alpha[-FEATHER:] = np.minimum(alpha[-FEATHER:], ramp[::-1])
    region = canvas[:, offset : offset + w]
    canvas[:, offset : offset + w] = region * (1 - alpha[None, :, None]) + half * alpha[None, :, None]

    # Üst boşluk: en üst satır (düz stüdyo arka planı) yukarı doğru uzatılır
    pad_top = target_h - h
    top = np.repeat(canvas[:1], pad_top, axis=0)
    canvas = np.concatenate([top, canvas], axis=0)
    return np.clip(canvas, 0, 255).astype(np.uint8)


def enhance(img: Image.Image) -> Image.Image:
    size = (OUTPUT_WIDTH, round(OUTPUT_WIDTH / FRAME_RATIO))  # tam 2:3 → 1000x1500
    img = img.resize(size, Image.Resampling.LANCZOS)  # Pillow LANCZOS = Lanczos3 (a=3)
    # Büyütmede kaybolan tüy detayını geri kazandırmak için hafif keskinleştirme
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    return img


def main() -> int:
    sources = find_sources()
    if not sources:
        dirs = " veya ".join(str(d.relative_to(ROOT)) + "/" for d in SOURCE_DIRS)
        print(f"✗ dog-1, dog-2, dog-3 bulunamadı. Dosyaları şu klasöre koyun: {dirs}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src in sources:
        img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        w, h = img.size
        top, bottom = round(h * TOP_CROP_RATIO), round(h * (1 - BOTTOM_CROP_RATIO))
        body = np.asarray(img.crop((0, top, w, bottom))).astype(float)
        split = find_split_column(body)

        halves = {
            "before": fit_to_frame(body[:, :split], outer="left"),
            "after": fit_to_frame(body[:, split:], outer="right"),
        }
        print(f"{src.relative_to(ROOT)}  {w}x{h}  → {split}. sütundan bölündü (orta: {w // 2})")
        for side, arr in halves.items():
            out = OUT_DIR / f"{src.stem}-{side}.jpg"
            final = enhance(Image.fromarray(arr))
            # subsampling=0 → 4:4:4 renk (renk kenarlarında sıkıştırma izi olmaz)
            final.save(out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True, subsampling=0)
            print(f"   ✓ {out.relative_to(ROOT)}  {final.width}x{final.height}  {out.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
