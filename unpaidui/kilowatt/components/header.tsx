"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<header className="nav  "><div className="nav-bar"><a className="nav-brand" href="/demos/kilowatt/" aria-label="Kilowatt home"><span className="wordmark"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="mark"><rect x="4" y="2.5" width="16" height="19" rx="3" fill="var(--ink)" /><rect x="7" y="9" width="10" height="9.5" rx="1" fill="var(--own)" /><rect x="9" y="0.5" width="6" height="3" rx="1" fill="var(--ink)" /></svg><span>Kilowatt</span></span></a><nav className="nav-links" id="site-menu" aria-label="Main"><a href="/demos/kilowatt/#tomorrow">How it plans</a><a href="/demos/kilowatt/#devices">Devices</a><a href="/demos/kilowatt/#street">Installers</a><a href="/demos/kilowatt/#pricing">Pricing</a><a className="btn btn-own nav-menu-cta" href="/demos/kilowatt/#pricing">Check my home</a></nav><a className="btn btn-own nav-cta" href="/demos/kilowatt/#pricing">Check my home</a><button className="nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 5h11M2.5 11h11" /></svg></button></div></header>
  );
}
