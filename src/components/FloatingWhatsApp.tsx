"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";

/** Mobilde sağ altta sabit duran WhatsApp butonu (hero geçildikten sonra görünür) */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp üzerinden randevu al"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-whatsapp py-3 pr-5 pl-3.5 font-semibold text-white shadow-[0_14px_32px_-10px_rgb(37_211_102/0.75)] active:scale-95 lg:hidden"
        >
          <span className="relative grid place-items-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/40" />
            <WhatsAppIcon size={26} className="relative" />
          </span>
          <span className="text-sm">Randevu</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
