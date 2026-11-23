import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { mapsDirectionsUrl, mapsEmbedUrl, whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const { contact, address, hours, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer id="iletisim" className="relative bg-navy text-ivory">
      {/* Kapanış CTA */}
      <div className="mx-auto max-w-6xl px-5 pt-24">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-terracotta px-6 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full bg-sage/30 blur-2xl" />
          <h2 className="relative font-display text-3xl leading-tight font-medium text-balance text-white sm:text-5xl">
            Dostunuz şımartılmayı hak ediyor.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-white/85">
            WhatsApp&apos;tan ya da Instagram DM&apos;den yazın, size en uygun gün ve saati birlikte ayarlayalım.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-ivory px-7 py-4 font-semibold text-terracotta-dark shadow-lift transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <WhatsAppIcon size={20} /> WhatsApp&apos;tan Randevu Al
          </a>
          <a
            href={social.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 sm:mt-8 sm:ml-3"
          >
            <InstagramIcon size={19} /> Instagram DM
          </a>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.1fr]">
        {/* Bilgiler */}
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Logo inverted variant="full" className="w-48 sm:w-56" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">
              {siteConfig.tagline}. Anestezisiz, hijyenik ve sevgi dolu bakım için {address.short} stüdyomuzda
              sizi ve minik dostunuzu bekliyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-terracotta-soft uppercase">Adres</h3>
            <p className="mt-4 flex gap-2.5 text-sm leading-relaxed text-ivory/85">
              <MapPin size={18} className="mt-0.5 shrink-0 text-terracotta" />
              <span>{address.full}</span>
            </p>
            <a
              href={mapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/20"
            >
              <Navigation size={15} /> Yol Tarifi Al
            </a>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-terracotta-soft uppercase">Çalışma Saatleri</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {hours.map((h) => (
                <li key={h.days} className="flex items-start gap-2.5">
                  <Clock size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <span className="flex flex-1 flex-wrap justify-between gap-x-3">
                    <span className="text-ivory/70">{h.days}</span>
                    <span className="font-semibold whitespace-nowrap text-ivory">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-terracotta-soft uppercase">İletişim</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10"
              >
                <Phone size={16} className="text-terracotta" /> {contact.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10"
              >
                <WhatsAppIcon size={16} className="text-whatsapp" /> WhatsApp
              </a>
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10"
              >
                <InstagramIcon size={16} className="text-terracotta" /> @{social.instagramUsername}
              </a>
              <a
                href={social.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10"
              >
                <InstagramIcon size={16} className="text-terracotta" /> DM Gönder
              </a>
              {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10"
              >
                <Mail size={16} className="text-terracotta" /> {contact.email}
              </a>
              )}
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="relative min-h-80 overflow-hidden rounded-3xl border border-ivory/10 bg-navy-dark">
          <iframe
            title={`${siteConfig.name} konumu`}
            src={mapsEmbedUrl()}
            className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 pb-24 text-xs text-ivory/55 sm:flex-row lg:pb-6">
          <p>© {year} {siteConfig.name}. Tüm hakları saklıdır.</p>
          <p>Sevgiyle ve bolca pati izi ile 🐾</p>
        </div>
      </div>
    </footer>
  );
}
