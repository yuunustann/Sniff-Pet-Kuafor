"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="sss" className="relative py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="SSS"
            title="Aklınızdaki sorular"
            description="Burada yanıtını bulamadığınız her şeyi bize WhatsApp'tan ya da Instagram DM'den sorabilirsiniz; memnuniyetle yardımcı oluruz."
          />
          <Reveal delay={0.1} className="mt-8">
            <a
              href={whatsappLink("Merhaba Sniff Pet Kuaför 🐾 Bir sorum olacaktı:")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-sage-dark"
            >
              <WhatsAppIcon size={18} /> Soru Sor
            </a>
            <a
              href={siteConfig.social.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-sand"
            >
              <InstagramIcon size={18} /> DM
            </a>
          </Reveal>
        </div>

        <Reveal className="divide-y divide-sage/10 rounded-3xl border border-sage/10 bg-sand px-5 sm:px-8">
          {siteConfig.faq.map((item, i) => {
            const open = openIndex === i;
            const btnId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="font-display text-lg leading-snug font-medium text-navy sm:text-xl">{item.q}</span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                        open ? "rotate-45 bg-terracotta text-white" : "bg-ivory text-sage",
                      )}
                    >
                      <Plus size={18} strokeWidth={2.4} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-12 pb-6 leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
