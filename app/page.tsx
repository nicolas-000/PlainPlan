"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)] text-white text-2xl mb-6 shadow-lg">
          📋
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent" style={{backgroundImage: 'var(--gradient-accent)'}}>Plain Plan</span>
        </h1>
        <p className="text-lg text-muted max-w-lg mx-auto">
          Sistema de gestión de proyectos y trabajadores. Simple, rápido y efectivo.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link href="/workers" className="card card-border card-interactive p-8 text-center group">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--muted-bg)] text-3xl mb-4 group-hover:scale-110 transition-transform">
            👥
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">Trabajadores</h2>
          <p className="text-muted text-sm leading-relaxed">Gestiona tu equipo. Crea y organiza por rol y seniority.</p>
        </Link>
        
        <Link href="/projects" className="card card-border card-interactive p-8 text-center group">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--muted-bg)] text-3xl mb-4 group-hover:scale-110 transition-transform">
            📁
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-2)] transition-colors">Proyectos</h2>
          <p className="text-muted text-sm leading-relaxed">Administra proyectos y asigna trabajadores fácilmente.</p>
        </Link>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted mb-4">Comienza ahora</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/workers" className="btn btn-primary btn-lg">
            Crear Trabajador
          </Link>
          <Link href="/projects" className="btn btn-secondary btn-lg">
            Crear Proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
