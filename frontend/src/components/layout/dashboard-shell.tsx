import { ReactNode } from "react";
import Link from "next/link";

export function DashboardShell({
  title,
  links,
  children,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="card-glass rounded-2xl p-4">
          <h1 className="mb-4 text-lg font-semibold text-ivory">{title}</h1>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm text-smoke hover:bg-gold/10 hover:text-ivory">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
