"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";

const badgeIcons = {
  anestezisiz: BadgeCheck,
  steril: ShieldCheck,
  uzman: HeartHandshake,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section id="top" className="grain relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-28">
      {/* Arka plan yumuşak lekeleri */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-sage-soft/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-terracotta-soft/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Sol: Metin */}
        <div>
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-ivory/80 py-1.5 pr-4 pl-1.5 text-xs text-muted shadow-soft backdrop-blur sm:text-sm"
          >
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sage px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-ivory">
              <MapPin size={12} /> {siteConfig.address.short}
            </span>
            {siteConfig.tagline}
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight text-balance text-navy sm:text-6xl lg:text-[4.1rem]"
          >
            Minik Dostunuz İçin{" "}
            <span className="relative whitespace-nowrap text-sage italic [font-variation-settings:'SOFT'_100,'WONK'_1]">
              Stressiz
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-terracotta"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8c40-6 80-7 196-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease }}
                />
              </svg>
            </span>
            , Hijyenik ve Sevgi Dolu Bakım.
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            <strong className="font-semibold text-charcoal">Uyutmadan, anestezisiz</strong> çalışıyoruz. Irkına özel makas
            &amp; makine tıraşı, kıtık açma ve ozonlu spa bakımıyla dostunuz hem güzel görünsün hem kendini iyi hissetsin.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-terracotta px-7 py-4 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgb(217_107_67/0.8)] transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark active:translate-y-0 active:scale-[0.98]"
            >
              <WhatsAppIcon size={20} />
              Hemen Randevu Al
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#hizmetler"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/20 bg-ivory px-7 py-4 text-base font-semibold text-sage transition-all hover:border-sage/40 hover:bg-sand"
            >
              Hizmetleri İncele
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.28)} className="mt-4 text-sm text-muted">
            WhatsApp kullanmıyor musunuz?{" "}
            <a
              href={siteConfig.social.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-navy underline decoration-terracotta/50 underline-offset-4 hover:decoration-terracotta"
            >
              <InstagramIcon size={15} /> Instagram&apos;dan DM atın
            </a>
          </motion.p>

          <motion.ul {...fadeUp(0.32)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {siteConfig.trustBadges.map((badge) => {
              const Icon = badgeIcons[badge.id as keyof typeof badgeIcons] ?? ShieldCheck;
              return (
                <li key={badge.id} className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <span className="grid size-8 place-items-center rounded-full bg-sage-soft text-sage">
                    <Icon size={16} strokeWidth={2.2} />
                  </span>
                  {badge.label}
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* Sağ: Görsel */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-lift">
            <Image
              src={siteConfig.hero.image}
              alt={siteConfig.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover object-[60%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-dark/30 via-transparent to-transparent" />
          </div>

          {/* Yüzen bilgi kartı */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -8, 0] }}
            transition={
              reduce
                ? undefined
                : { opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }
            }
            className="absolute -bottom-6 -left-3 w-[15.5rem] rounded-3xl border border-white/60 bg-ivory/90 p-4 shadow-lift backdrop-blur-xl sm:-left-10"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy text-ivory">
                <HeartHandshake size={22} />
              </span>
              <div>
                <p className="text-sm font-bold text-navy">Uyutmadan, sevgiyle</p>
                <p className="text-xs text-muted">Kedi & köpek bakımı</p>
              </div>
            </div>
            <p className="mt-3 text-[0.82rem] leading-snug text-muted">
              Bakım boyunca dostunuzun fotoğraf ve videolarını size iletiyoruz.
            </p>
          </motion.div>

          {/* Instagram rozeti */}
          <motion.a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="absolute -top-5 -right-2 hidden items-center gap-3 rounded-full border border-white/60 bg-ivory/90 py-2 pr-5 pl-2 shadow-lift backdrop-blur-xl transition-colors hover:bg-ivory sm:flex lg:-right-6"
          >
            <span className="relative size-11 overflow-hidden rounded-full">
              <Image src={siteConfig.hero.secondaryImage} alt={siteConfig.hero.secondaryImageAlt} fill sizes="44px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="flex items-center gap-1 text-sm font-bold text-navy">
                <InstagramIcon size={14} /> @{siteConfig.social.instagramUsername}
              </span>
              <span className="text-xs font-medium text-muted">Dönüşümleri takip edin</span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
