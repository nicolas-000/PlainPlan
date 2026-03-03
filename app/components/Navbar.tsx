"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-20 header">
      <div className="container-main py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--accent)] hover:text-[var(--accent-alt)] transition-colors">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)] text-white text-sm">PP</span>
          <span className="hidden sm:inline">Plain Plan</span>
        </Link>
        <nav className="hidden md:flex gap-1 items-center">
          <Link href="/" className={`nav-link ${isActive('/') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}>
            Inicio
          </Link>
          <Link href="/workers" className={`nav-link ${isActive('/workers') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}>
            Trabajadores
          </Link>
          <Link href="/projects" className={`nav-link ${isActive('/projects') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}>
            Proyectos
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden hamburger"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={`${open ? 'block' : 'hidden'} md:hidden border-t border-[var(--card-border)]`}>
        <div className="container-main py-4">
          <nav className="flex flex-col gap-1">
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/workers" 
              className={`nav-link ${isActive('/workers') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Trabajadores
            </Link>
            <Link 
              href="/projects" 
              className={`nav-link ${isActive('/projects') ? 'bg-[var(--muted-bg)] text-[var(--accent)]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Proyectos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
