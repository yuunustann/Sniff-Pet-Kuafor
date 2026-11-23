import { BadgeCheck, Leaf, ShieldPlus, Video } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/config/siteConfig";

const icons = {
  anestezisiz: BadgeCheck,
  dezenfeksiyon: ShieldPlus,
  "dogal-sampuan": Leaf,
  "seffaf-surec": Video,
} as const;

export default function WhyUs() {
  return (
    <section id="yaklasimimiz" className="relative overflow-hidden bg-sage py-24 text-ivory sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-sage-dark/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-terracotta/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          inverted
          eyebrow="Neden Sniff?"
          title={
            <>
              Klinik soğukluğu değil, <em className="text-terracotta-soft">güvenli bir yuva</em> sıcaklığı
            </>
          }
          description="Yaklaşımımız basit: dostunuza kendi evimizin bir üyesi gibi davranmak. Bunun için her gün aynı dört ilkeye bağlı kalıyoruz."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.whyUs.map((item, i) => {
            const Icon = icons[item.id as keyof typeof icons] ?? BadgeCheck;
            return (
              <Reveal
                key={item.id}
                delay={i * 0.08}
                className="group relative rounded-3xl border border-ivory/10 bg-ivory/[0.06] p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-ivory/[0.1]"
              >
                <span className="font-display text-sm text-ivory/40">0{i + 1}</span>
                <span className="mt-5 grid size-14 place-items-center rounded-2xl bg-terracotta text-white shadow-[0_12px_24px_-10px_rgb(217_107_67/0.9)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                  <Icon size={26} strokeWidth={1.9} />
                </span>
                <h3 className="mt-6 font-display text-xl leading-snug font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
