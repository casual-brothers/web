"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(navigator.language?.startsWith("es") ? "/es/" : "/en/");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-2xl font-bold uppercase">Casual Brothers</h1>
      <p className="text-sm text-white/50">Choose your language / Elige tu idioma</p>
      <div className="flex gap-3">
        <Link className="rounded border border-brand bg-brand px-5 py-3 text-xs font-bold uppercase text-background" href="/en/">English</Link>
        <Link className="rounded border border-white/20 px-5 py-3 text-xs font-bold uppercase text-white" href="/es/">Español</Link>
      </div>
    </main>
  );
}
