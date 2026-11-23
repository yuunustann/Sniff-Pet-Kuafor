"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsLeftRight, Scissors } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, type BeforeAfterItem } from "@/config/siteConfig";
import { cn } from "@/lib/cn";

/**
 * Görseller scripts/split-transformations.py ile 2:3 (1000x1500) hazırlanır;
 * kutu da 2:3 olduğu için köpeğin tüm vücudu kırpılmadan, ferah bir kadrajla görünür.
 *
 * İki katmanlı karşılaştırma:
 *  - Alt katman: SONRASI görseli, tam genişlikte
 *  - Üst katman: ÖNCESİ görseli, tam genişlikte, yalnızca clip-path ile kırpılır
 * İki görsel de aynı kutuda, aynı object-fit ile durduğu için piksel piksel hizalıdır.
 */
function CompareSlider({ item }: { item: BeforeAfterItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + step));
    else if (e.key === "Home") setSliderPosition(0);
    else if (e.key === "End") setSliderPosition(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative mx-auto aspect-[2/3] w-full max-w-md touch-pan-y overflow-hidden rounded-3xl bg-sand shadow-lift select-none",
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
      )}
    >
      {/* ALT KATMAN — SONRASI */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.after}
        alt={`${item.label} — bakım sonrası`}
        className="pointer-events-none block h-full w-full object-cover object-center contrast-[1.03]"
        draggable={false}
      />

      {/* ÜST KATMAN — ÖNCESİ (yalnızca clip-path ile kırpılır) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.before}
          alt={`${item.label} — bakım öncesi`}
          className="pointer-events-none block h-full w-full object-cover object-center contrast-[1.03]"
          draggable={false}
        />
      </div>

      {/* Rozetler */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-navy/80 px-3.5 py-1.5 text-xs font-bold tracking-widest text-ivory uppercase backdrop-blur">
        Öncesi
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-terracotta px-3.5 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
        Sonrası
      </span>

      {/* Dikey beyaz çizgi + tutamaç */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_14px_rgb(0_0_0/0.35)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Öncesi ve sonrası karşılaştırma"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuetext={`Öncesi %${Math.round(sliderPosition)} görünüyor`}
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-navy text-white shadow-lift transition-transform",
            dragging ? "scale-110" : "hover:scale-105",
          )}
        >
          <ChevronsLeftRight size={24} strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const items = siteConfig.beforeAfter;
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <section id="oncesi-sonrasi" className="relative bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Öncesi & Sonrası"
          title="Farkı kendiniz görün"
          description="Salonumuzdan gerçek dönüşümler. Ortadaki tutamacı sağa-sola kaydırarak öncesini ve sonrasını karşılaştırın."
        />

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div role="tablist" aria-label="Dönüşüm örnekleri" className="mb-6 flex flex-wrap justify-center gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={item.id === activeId}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all sm:px-5",
                  item.id === activeId
                    ? "border-navy bg-navy text-ivory shadow-soft"
                    : "border-navy/15 bg-ivory text-muted hover:border-navy/40 hover:text-navy",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <CompareSlider item={active} />
              <div className="mx-auto mt-6 flex max-w-md items-start gap-4 rounded-3xl bg-ivory p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-terracotta-soft text-terracotta">
                  <Scissors size={22} />
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-navy">{active.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{active.note}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
