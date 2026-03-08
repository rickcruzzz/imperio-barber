import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export function Button({ className, variant = "solid", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
        variant === "solid"
          ? "bg-gold text-ink hover:brightness-110 shadow-premium"
          : "border border-gold/50 text-gold hover:bg-gold/10",
        className
      )}
      {...props}
    />
  );
}
