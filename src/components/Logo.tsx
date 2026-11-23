import Image from "next/image";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/siteConfig";

interface LogoProps {
  /** Koyu zeminlerde krem renkli logo kullanılır */
  inverted?: boolean;
  /**
   * compact: "Sniff" yazısı + HTML "PET KUAFÖR" (navbar gibi küçük alanlarda net okunur)
   * full:    logonun tamamı (footer gibi geniş alanlar için)
   */
  variant?: "compact" | "full";
  className?: string;
}

export default function Logo({ inverted = false, variant = "compact", className }: LogoProps) {
  const label = `${siteConfig.name} — ana sayfa`;

  if (variant === "full") {
    return (
      <a href="#top" aria-label={label} className={cn("inline-block", className)}>
        <Image
          src={inverted ? siteConfig.brand.logoCream : siteConfig.brand.logo}
          alt={siteConfig.name}
          width={1791}
          height={1005}
          className="h-auto w-full"
          sizes="240px"
        />
      </a>
    );
  }

  return (
    <a href="#top" aria-label={label} className={cn("group inline-flex flex-col items-center", className)}>
      <Image
        src={inverted ? siteConfig.brand.wordmarkCream : siteConfig.brand.wordmark}
        alt={siteConfig.name}
        width={1791}
        height={810}
        priority
        sizes="96px"
        className="h-8 w-auto transition-transform duration-500 group-hover:-rotate-2 sm:h-9"
      />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 pl-[0.32em] text-[0.55rem] leading-none font-bold tracking-[0.32em] uppercase sm:text-[0.6rem]",
          inverted ? "text-cream" : "text-navy",
        )}
      >
        Pet Kuaför
      </span>
    </a>
  );
}
