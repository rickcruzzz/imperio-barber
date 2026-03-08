import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-gold/30 bg-black/40 px-4 py-2.5 text-sm text-ivory outline-none ring-gold/40 placeholder:text-smoke focus:ring",
        props.className
      )}
    />
  );
}
