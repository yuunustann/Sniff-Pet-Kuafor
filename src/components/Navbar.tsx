"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#oncesi-sonrasi", label: "Öncesi & Sonrası" },
  { href: "#yaklasimimiz", label: "Yaklaşımımız" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Ana menü"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-500 sm:pl-5",
          scrolled || open
            ? "border-sage/10 bg-ivory/75 shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-ivory/40 backdrop-blur-md",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-sand hover:text-sage"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(217_107_67/0.7)] transition-all hover:bg-terracotta-dark hover:shadow-[0_10px_24px_-8px_rgb(217_107_67/0.85)] active:scale-[0.97] sm:px-5"
          >
            <WhatsAppIcon size={18} className="transition-transform group-hover:rotate-[-8deg]" />
            <span className="hidden sm:inline">WhatsApp Randevu</span>
            <span className="sm:hidden">Randevu</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-sage transition-colors hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobil-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-sage/10 bg-ivory/95 p-3 shadow-lift backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 font-display text-xl text-navy transition-colors hover:bg-sand"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-2 border-t border-sage/10 px-4 pt-3 pb-1 text-sm text-muted">
              {siteConfig.hours[0].days}: {siteConfig.hours[0].time}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
