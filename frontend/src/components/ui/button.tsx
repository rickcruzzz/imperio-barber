import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "solid", size = "md", ...props }: Props) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
        variant === "solid"
          ? "bg-gold text-ink hover:brightness-110 shadow-premium disabled:opacity-50 disabled:cursor-not-allowed"
          : "border border-gold/50 text-gold hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
