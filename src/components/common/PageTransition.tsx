"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

declare global {
  interface Window {
    __startPageTransition?: (href: string) => void;
  }
}

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    window.__startPageTransition = (href: string) => {
      if (isAnimatingRef.current) return;
      if (!href || href === pathnameRef.current) return;
      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        return;
      }

      isAnimatingRef.current = true;
      gsap.set(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        x: "-110%",
      });

      gsap
        .timeline({
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        })
        .to(overlay, {
          x: "0%",
          duration: 0.55,
          ease: "power2.inOut",
        })
        .call(() => router.push(href))
        .to(overlay, {
          x: "110%",
          duration: 0.7,
          ease: "power2.inOut",
        })
        .set(overlay, { pointerEvents: "none", opacity: 0 });
    };

    return () => {
      delete window.__startPageTransition;
    };
  }, [router]);

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--transition-bg)",
        zIndex: 90,
        opacity: 0,
        pointerEvents: "none",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
