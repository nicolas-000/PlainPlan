import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plain Plan",
  description: "Plain Plan — Aplicación demo para gestionar proyectos y trabajadores",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full py-8 md:py-12">
          <div className="container-main">{children}</div>
        </main>
        <footer className="py-6 border-t border-[var(--card-border)]">
          <div className="container-main text-center text-sm text-muted">
            Plain Plan &copy; {new Date().getFullYear()} — Sistema de gestión de proyectos
          </div>
        </footer>
      </body>
    </html>
  );
}
