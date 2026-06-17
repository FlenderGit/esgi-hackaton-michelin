"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ConfigNav({
  backHref = "/",
  backLabel = "Retour",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-q-bg/90 backdrop-blur-md border-b border-q-border/20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-[68px] flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Michelin"
            width={90}
            height={36}
            priority
          />
        </Link>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-q-border/50 text-q-text-muted hover:border-q-yellow/40 hover:text-q-text bg-q-card/40 backdrop-blur-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
          {backLabel}
        </Link>
      </div>
    </nav>
  );
}
