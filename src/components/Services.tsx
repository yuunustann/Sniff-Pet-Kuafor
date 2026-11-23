"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { serviceInquiryLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";

type FilterId = (typeof siteConfig.serviceFilters)[number]["id"];

const categoryLabels: Record<string, string> = {
  kopek: "Köpek",
  kedi: "Kedi",
  spa: "Spa",
};

export default function Services() {
  const [active, setActive] = useState<FilterId>("tumu");

  const services =
    active === "tumu"
      ? siteConfig.services
      : siteConfig.services.filter((s) => (s.categories as string[]).includes(active));

  return (
    <section id="hizmetler" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title={
            <>
              Her tüy tipine, her karaktere <em className="text-sage">özenle</em> hazırlanmış bakım
            </>
          }
          description="Irkını, deri yapısını ve huyunu tanıyarak çalışıyoruz. Size en uygun hizmeti seçin, fiyatı WhatsApp'tan birkaç dakikada öğrenin."
        />

        {/* Filtre sekmeleri */}
        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Hizmet kategorileri"
            className="mx-auto mt-12 flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-sage/10 bg-sand p-1.5 [scrollbar-width:none] sm:w-fit"
          >
            {siteConfig.serviceFilters.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors sm:px-5",
                    selected ? "text-ivory" : "text-muted hover:text-sage",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 rounded-full bg-sage shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Kartlar */}
        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {services.map((service, i) => (
              <motion.li
                layout
                key={service.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-sage/5 bg-sand transition-shadow duration-500 hover:shadow-lift"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {service.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-ivory/90 px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-sage uppercase backdrop-blur"
                      >
                        {categoryLabels[c]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.4rem] leading-tight font-medium text-navy">{service.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm font-medium text-charcoal">
                        <Check size={15} className="shrink-0 text-terracotta" strokeWidth={2.6} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap text-muted">
                      <Clock size={14} /> {service.duration}
                    </span>
                    <a
                      href={serviceInquiryLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-2 text-sm whitespace-nowrap font-semibold text-sage ring-1 ring-sage/15 transition-all hover:bg-sage hover:text-ivory hover:ring-sage active:scale-95"
                    >
                      <WhatsAppIcon size={15} />
                      WhatsApp&apos;tan Fiyat Sor
                    </a>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
