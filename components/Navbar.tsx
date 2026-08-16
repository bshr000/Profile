"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [["Home", "/"], ["Works", "/works"], ["Notes", "/notes"], ["Life", "/life"], ["Journey", "/journey"], ["About", "/about"]];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="navbar"><div className="nav-inner">
    <Link href="/" className="wordmark" onClick={() => setOpen(false)}>YN<span>·</span></Link>
    <nav className={open ? "nav-links open" : "nav-links"} aria-label="主导航">
      {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <div className="nav-actions"><ThemeToggle /><button className="menu-button" onClick={() => setOpen(!open)} aria-label="打开导航">{open ? <X /> : <Menu />}</button></div>
  </div></header>;
}
