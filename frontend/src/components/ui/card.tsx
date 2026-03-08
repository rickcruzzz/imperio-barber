import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card-glass rounded-2xl p-6", className)}>{children}</div>;
}
