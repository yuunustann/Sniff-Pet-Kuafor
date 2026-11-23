import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  inverted?: boolean;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, description, align = "center", inverted, className }: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em]",
          inverted ? "bg-ivory/10 text-terracotta-soft" : "bg-terracotta-soft text-terracotta-dark",
        )}
      >
        <span className="size-1.5 rounded-full bg-terracotta" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5 font-display text-[2.1rem] leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl",
          inverted ? "text-ivory" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed text-pretty sm:text-lg", inverted ? "text-ivory/75" : "text-muted")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
