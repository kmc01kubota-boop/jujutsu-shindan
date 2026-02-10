"use client";

import { Megaphone } from "lucide-react";

interface AdSlotProps {
  variant: "header" | "in-feed" | "result" | "footer";
  className?: string;
}

const variantStyles: Record<
  AdSlotProps["variant"],
  { wrapper: string; container: string }
> = {
  header: {
    wrapper: "w-full",
    container:
      "mx-auto h-[60px] w-full sm:h-[90px] sm:max-w-[728px]",
  },
  "in-feed": {
    wrapper: "flex w-full justify-center",
    container:
      "h-[200px] w-[250px] sm:h-[250px] sm:w-[300px]",
  },
  result: {
    wrapper: "w-full",
    container:
      "mx-auto h-[80px] w-full sm:h-[120px]",
  },
  footer: {
    wrapper: "fixed bottom-0 left-0 right-0 z-50 w-full",
    container:
      "mx-auto h-[50px] w-full sm:h-[60px]",
  },
};

export default function AdSlot({ variant, className }: AdSlotProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`${styles.wrapper}${className ? ` ${className}` : ""}`}
      role="complementary"
      aria-label="広告"
    >
      <div
        data-ad-slot={variant}
        className={`${styles.container} flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-zinc-800/50 bg-zinc-900/60`}
      >
        <div className="flex items-center gap-1.5 text-zinc-600">
          <Megaphone size={12} />
          <span className="text-[10px] tracking-wider sm:text-xs">
            スポンサーリンク
          </span>
        </div>
      </div>

      {/* Reserve space when footer variant is used so page content is not hidden behind the fixed bar */}
      {variant === "footer" && (
        <div className="h-[50px] sm:h-[60px]" aria-hidden="true" />
      )}
    </div>
  );
}
