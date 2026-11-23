import Image from "next/image";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/config/siteConfig";

export default function SocialProof() {
  const { instagramUsername, instagramUrl } = siteConfig.social;

  return (
    <section id="yorumlar" className="relative bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        {/* Instagram vitrini */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Instagram Vitrini"
            title={
              <>
                Salonumuzdan <em className="text-sage">tatlı anlar</em>
              </>
            }
            description="Her gün yeni dönüşümler, yeni dostluklar. En güncel paylaşımlar için bizi Instagram'da takip edin."
          />
          <Reveal>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-ivory px-5 py-3 text-sm font-semibold text-sage transition-all hover:border-sage hover:bg-sage hover:text-ivory"
            >
              <InstagramIcon size={18} />@{instagramUsername}
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {siteConfig.instagramPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.07}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-3xl bg-sand"
                aria-label={`Instagram'da gör: ${post.caption}`}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 270px, 46vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-sage/0 p-4 text-center text-ivory opacity-0 transition-all duration-500 group-hover:bg-sage/75 group-hover:opacity-100 group-focus-visible:bg-sage/75 group-focus-visible:opacity-100">
                  <InstagramIcon size={30} />
                  <span className="text-sm font-semibold">Instagram&apos;da Gör</span>
                  <span className="hidden text-xs text-ivory/80 sm:block">{post.caption}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Yorumlar — yalnızca siteConfig.testimonials doluysa gösterilir */}
        {siteConfig.testimonials.length > 0 && (
        <div className="mt-24">
          <SectionHeading
            eyebrow="Pati Sahipleri Anlatıyor"
            title="Mutlu dostlar, rahat sahipler"
            description="Bizi tercih eden pati sahiplerinin deneyimleri."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {siteConfig.testimonials.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 0.08}
                className="relative flex flex-col rounded-3xl bg-ivory p-7 shadow-soft"
              >
                <Quote size={36} className="text-terracotta/25" fill="currentColor" strokeWidth={0} />
                <div className="mt-3 flex gap-0.5 text-terracotta" aria-label={`${t.rating} üzerinden 5 yıldız`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-charcoal">{t.text}</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-sage/10 pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-sage font-display text-lg text-ivory">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-charcoal">{t.name}</span>
                    <span className="text-sm text-muted">{t.pet}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
