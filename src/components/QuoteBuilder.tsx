"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cat, Check, Dog, MessageCircleHeart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";

const { petTypes, sizes, coatConditions } = siteConfig.quoteBuilder;

function OptionButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative rounded-2xl border-2 px-4 py-3 text-left transition-all active:scale-[0.98]",
        selected
          ? "border-sage bg-sage text-ivory shadow-soft"
          : "border-sage/10 bg-ivory text-charcoal hover:border-sage/35",
        className,
      )}
    >
      {children}
    </button>
  );
}

function StepLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <legend className="mb-3 flex items-center gap-2.5 text-sm font-bold text-charcoal">
      <span className="grid size-6 place-items-center rounded-full bg-terracotta text-xs text-white">{n}</span>
      {children}
    </legend>
  );
}

export default function QuoteBuilder() {
  const [petType, setPetType] = useState<string>(petTypes[0]);
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState<string>(sizes[0].id);
  const [coat, setCoat] = useState<string>(coatConditions[0].id);
  const [services, setServices] = useState<string[]>([]);
  const [petName, setPetName] = useState("");
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleService = (title: string) => {
    setShowError(false);
    setServices((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]));
  };

  const message = useMemo(() => {
    const sizeObj = sizes.find((s) => s.id === size)!;
    const coatObj = coatConditions.find((c) => c.id === coat)!;
    const lines = [
      "Merhaba Sniff Pet Kuaför 🐾",
      "Fiyat ve uygun randevu saati öğrenmek istiyorum:",
      "",
      `• Tür: ${petType}`,
      ...(petName.trim() ? [`• Adı: ${petName.trim()}`] : []),
      `• Irk: ${breed.trim() || "Belirtilmedi"}`,
      `• Boyut: ${sizeObj.label} (${sizeObj.hint})`,
      `• Tüy durumu: ${coatObj.label}`,
      `• İstenen hizmet(ler): ${services.length ? services.join(", ") : "-"}`,
      "",
      "Teşekkürler!",
    ];
    return lines.join("\n");
  }, [petType, petName, breed, size, coat, services]);

  const validate = () => {
    if (services.length === 0) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  /** Instagram DM linkine hazır mesaj eklenemediği için mesajı panoya kopyalayıp DM'i açar */
  const handleInstagram = async () => {
    if (!validate()) return;
    window.open(siteConfig.social.instagramDmUrl, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch {
      /* pano izni yoksa sessizce geç */
    }
  };

  // Kedi seçiliyse kedi hizmetleri, köpek seçiliyse köpek + spa hizmetleri listelenir
  const availableServices = siteConfig.services.filter((s) => {
    const cats = s.categories as string[];
    return petType === "Kedi" ? cats.includes("kedi") : cats.includes("kopek") || cats.includes("spa");
  });

  return (
    <section id="randevu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Akıllı Fiyat Teklifi"
              title="30 saniyede fiyat & randevu sorun"
              description="Dostunuzu birkaç tıkla tanıtın; bilgileri düzenli bir mesaj hâlinde WhatsApp'a ya da Instagram DM'e aktaralım. Size kısa sürede net fiyat ve boş saatlerimizle dönüyoruz."
            />

            <Reveal delay={0.1} className="mt-8 hidden rounded-3xl border border-sage/10 bg-sand p-5 lg:block">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-muted uppercase">
                <MessageCircleHeart size={15} className="text-terracotta" /> Mesaj önizlemesi
              </p>
              <pre className="font-sans text-[0.85rem] leading-relaxed whitespace-pre-wrap text-charcoal">{message}</pre>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-[2rem] border border-sage/10 bg-sand p-5 shadow-soft sm:p-8"
            >
              {/* 1 — Tür */}
              <fieldset>
                <StepLabel n={1}>Dostunuz bir…</StepLabel>
                <div className="grid grid-cols-2 gap-3">
                  {petTypes.map((t) => {
                    const Icon = t === "Kedi" ? Cat : Dog;
                    return (
                      <OptionButton
                        key={t}
                        selected={petType === t}
                        onClick={() => {
                          setPetType(t);
                          setServices([]);
                        }}
                        className="flex items-center justify-center gap-2.5 py-4 font-display text-lg"
                      >
                        <Icon size={22} /> {t}
                      </OptionButton>
                    );
                  })}
                </div>
              </fieldset>

              {/* 2 — Irk & isim */}
              <fieldset className="grid gap-3 sm:grid-cols-2">
                <StepLabel n={2}>Irkı ve adı</StepLabel>
                <label className="col-span-full sm:col-span-1">
                  <span className="sr-only">Irk</span>
                  <input
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder={petType === "Kedi" ? "Örn. İran, British Shorthair" : "Örn. Poodle, Golden Retriever"}
                    className="w-full rounded-2xl border-2 border-sage/10 bg-ivory px-4 py-3 text-charcoal placeholder:text-muted/60 focus:border-sage focus:outline-none"
                  />
                </label>
                <label className="col-span-full sm:col-span-1">
                  <span className="sr-only">Adı (isteğe bağlı)</span>
                  <input
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Adı (isteğe bağlı)"
                    className="w-full rounded-2xl border-2 border-sage/10 bg-ivory px-4 py-3 text-charcoal placeholder:text-muted/60 focus:border-sage focus:outline-none"
                  />
                </label>
              </fieldset>

              {/* 3 — Boyut */}
              <fieldset>
                <StepLabel n={3}>Boyutu</StepLabel>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {sizes.map((s) => (
                    <OptionButton key={s.id} selected={size === s.id} onClick={() => setSize(s.id)} className="text-center">
                      <span className="block font-semibold">{s.label}</span>
                      <span className={cn("block text-xs", size === s.id ? "text-ivory/75" : "text-muted")}>{s.hint}</span>
                    </OptionButton>
                  ))}
                </div>
              </fieldset>

              {/* 4 — Tüy durumu */}
              <fieldset>
                <StepLabel n={4}>Tüy durumu</StepLabel>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {coatConditions.map((c) => (
                    <OptionButton key={c.id} selected={coat === c.id} onClick={() => setCoat(c.id)}>
                      <span className="block font-semibold">{c.label}</span>
                      <span className={cn("block text-xs", coat === c.id ? "text-ivory/75" : "text-muted")}>{c.hint}</span>
                    </OptionButton>
                  ))}
                </div>
              </fieldset>

              {/* 5 — Hizmet */}
              <fieldset>
                <StepLabel n={5}>İstediğiniz hizmet(ler)</StepLabel>
                <div className="flex flex-wrap gap-2">
                  {availableServices.map((s) => {
                    const selected = services.includes(s.title);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(s.title)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all active:scale-95",
                          selected
                            ? "border-terracotta bg-terracotta text-white"
                            : "border-sage/10 bg-ivory text-charcoal hover:border-terracotta/40",
                        )}
                      >
                        {selected && <Check size={14} strokeWidth={3} />}
                        {s.title}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      role="alert"
                      className="mt-3 text-sm font-medium text-terracotta-dark"
                    >
                      Lütfen en az bir hizmet seçin.
                    </motion.p>
                  )}
                </AnimatePresence>
              </fieldset>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-terracotta px-6 py-4.5 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgb(217_107_67/0.8)] transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark active:translate-y-0 active:scale-[0.99]"
              >
                <WhatsAppIcon size={21} />
                WhatsApp ile Fiyat &amp; Saat Sor
              </button>
              <button
                type="button"
                onClick={handleInstagram}
                className="-mt-4 flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-navy/15 bg-ivory px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy/40 active:scale-[0.99]"
              >
                <InstagramIcon size={18} />
                Instagram DM ile Gönder
              </button>
              <p aria-live="polite" className="-mt-4 text-center text-xs text-muted">
                {copied
                  ? "Mesajınız kopyalandı — Instagram DM'e yapıştırıp gönderebilirsiniz. ✓"
                  : "Çalışma saatlerinde en kısa sürede dönüş yapıyoruz."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
