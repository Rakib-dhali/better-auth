"use client"

import Link from "next/link";
import { useState, useEffect } from "react";



const NAV_LINKS = ["Home", "Pricing", "Docs", "Blog"];

const FEATURES = [
  {
    icon: "⬡",
    title: "Blazing Fast",
    desc: "Sub-100ms response times. Built on the edge so your users never wait.",
  },
  {
    icon: "⬢",
    title: "Type-Safe APIs",
    desc: "End-to-end type safety from database to client. Zero runtime surprises.",
  },
  {
    icon: "◈",
    title: "Auto-Scaling",
    desc: "Goes from zero to millions without you touching a single config file.",
  },
  {
    icon: "◉",
    title: "Open Protocol",
    desc: "Built on open standards. No lock-in, no vendor gymnastics. Ever.",
  },
];

const STATS = [
  { value: "10ms", label: "avg latency" },
  { value: "99.99%", label: "uptime SLA" },
  { value: "180+", label: "countries" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="text-xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Better-auth<span className="text-[#c8f05c]">.</span>
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#c8f05c] text-[#0a0a0a] px-5 py-2 rounded-full hover:bg-[#d4f570] transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl leading-none">{menuOpen ? "✕" : "≡"}</span>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link key={l} href="#" className="text-sm text-white/60 hover:text-white">
                {l}
              </Link>
            ))}
            <Link
              href="#"
              className="text-sm font-medium bg-[#c8f05c] text-[#0a0a0a] px-5 py-2 rounded-full text-center"
            >
              Get started
            </Link>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6 max-w-6xl mx-auto">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#c8f05c]/5 blur-[120px] pointer-events-none" />

        {/* Eyebrow pill */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f05c] animate-pulse" />
            Now in public beta — free for indie devs
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Ship faster.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8f05c] to-[#84e0a0]">
            Break nothing.
          </span>
        </h1>

        <p className="text-center text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Axon gives your team the infrastructure layer to deploy, observe, and iterate — without
          the ops overhead.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto text-center text-base font-medium bg-[#c8f05c] text-[#0a0a0a] px-8 py-3.5 rounded-full hover:bg-[#d4f570] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start for free
          </a>
          <a
            href="#"
            className="w-full sm:w-auto text-center text-base font-medium border border-white/[0.15] text-white/70 px-8 py-3.5 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            View docs →
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {value}
              </p>
              <p className="text-sm text-white/40 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-xs font-medium uppercase tracking-widest text-[#c8f05c]/80 mb-3">
            Why Axon
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Everything your stack
            <br />
            <span className="text-white/30">was missing.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <span
                className="text-3xl mb-5 block text-[#c8f05c]/80"
                style={{ fontFamily: "monospace" }}
              >
                {icon}
              </span>
              <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/[0.08] group-hover:bg-[#c8f05c]/40 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative bg-[#c8f05c] rounded-3xl px-8 py-14 md:py-16 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#0a0a0a]/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#0a0a0a]/10" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-[#0a0a0a] tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Ready to launch?
                <br />
                We thought so.
              </h2>
              <p className="mt-3 text-[#0a0a0a]/60 text-base max-w-sm">
                No credit card required. Cancel whenever. Your first 3 projects are always free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#"
                className="text-sm font-semibold bg-[#0a0a0a] text-[#c8f05c] px-7 py-3.5 rounded-full hover:bg-[#1a1a1a] transition-all hover:scale-[1.02]"
              >
                Create free account
              </a>
              <a
                href="#"
                className="text-sm font-semibold border-2 border-[#0a0a0a]/20 text-[#0a0a0a] px-7 py-3.5 rounded-full hover:border-[#0a0a0a]/40 transition-all"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <span style={{ fontFamily: "'Syne', sans-serif" }} className="font-bold text-white/50">
          Axon<span className="text-[#c8f05c]">.</span>
        </span>
        <span>© 2025 Axon Inc. All rights reserved.</span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Status"].map((l) => (
            <a key={l} href="#" className="hover:text-white/60 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}