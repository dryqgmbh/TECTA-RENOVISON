"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Layers,
  BarChart3,
  ShieldCheck,
  FileText,
  Camera,
  TrendingUp,
  AlertTriangle,
  Star,
  MapPin,
  Clock,
  DollarSign,
  CheckSquare,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0B1F33] flex items-center overflow-hidden pt-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#1F2937] to-[#0B1F33] opacity-90" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563FF]" />
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
                German Building Mindset in the Mediterranean
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.08] mb-6">
              Buy smarter.
              <br />
              <span className="text-[#2563FF]">Renovate</span> with clarity.
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
              TECTA Renovision turns property photos, goals and renovation potential into a clear vision, budget framework, material direction and owner-side execution plan for properties in Cyprus.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                "German building mindset",
                "Owner-side project control",
                "AI-supported before/after vision",
                "Material & finish boards",
                "Weekly site reports",
                "Transparent contractor structure",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1F8A62] flex-shrink-0" />
                  <span className="text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#start"
                className="bg-[#2563FF] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1D50D4] transition-all flex items-center gap-2"
              >
                Start Property Review
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vision"
                className="bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/15 transition-all border border-white/15"
              >
                See Vision Board Example
              </Link>
            </div>
          </div>

          {/* Right: Dashboard overlay cards */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "460px",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-[#0B1F33]/40" />
            </div>

            {/* Overlay cards */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Renovation Budget
              </p>
              <p className="text-[#0B1F33] font-bold text-lg">€60k – €95k</p>
            </div>

            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Project Progress
              </p>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-[#2563FF] rounded-full" />
                </div>
                <span className="text-[#0B1F33] font-bold text-sm">42%</span>
              </div>
            </div>

            <div className="absolute bottom-24 left-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Material Board
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1F8A62]" />
                <span className="text-[#1F8A62] font-semibold text-sm">Approved</span>
              </div>
            </div>

            <div className="absolute bottom-24 right-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Owner Actions
              </p>
              <p className="text-[#C58A1C] font-bold text-lg">2 pending</p>
            </div>

            <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Current Phase
              </p>
              <p className="text-[#0B1F33] font-semibold text-sm">Vision & Budget</p>
            </div>

            <div className="absolute bottom-6 right-4 bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-xl">
              <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                Value Potential
              </p>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#1F8A62]" />
                <span className="text-[#1F8A62] font-semibold text-sm">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FCFBF8] to-transparent" />
    </section>
  );
}

// ─── Brand Statement Strip ────────────────────────────────────────────────
function BrandStrip() {
  const statements = [
    "German building mindset in the Mediterranean.",
    "From property photo to renovation roadmap.",
    "Before. After. And everything in between.",
    "Not a general contractor. Your owner-side control layer.",
    "Replace WhatsApp chaos with structured weekly reporting.",
    "Every decision documented. Every phase visible.",
  ];

  return (
    <div className="bg-[#F4F1EA] border-y border-[#E8E0D4] py-5 overflow-hidden">
      <div className="flex gap-12 animate-none">
        <div className="flex gap-12 items-center whitespace-nowrap px-6">
          {statements.map((s, i) => (
            <span
              key={i}
              className="text-[#1F2937]/60 text-sm font-medium flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-[#2563FF] flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TECTA Method ─────────────────────────────────────────────────────────
function MethodSection() {
  const steps = [
    {
      number: "01",
      title: "Visualize",
      icon: <Eye className="w-6 h-6" />,
      description:
        "Upload photos. Choose style and objective. Receive an AI-supported renovation vision with before/after imagery and material direction.",
    },
    {
      number: "02",
      title: "Specify",
      icon: <Layers className="w-6 h-6" />,
      description:
        "Define material direction, finishes, fixtures, colors, lighting and room priorities. Every specification becomes a contractor-ready brief.",
    },
    {
      number: "03",
      title: "Budget",
      icon: <BarChart3 className="w-6 h-6" />,
      description:
        "Create a realistic budget framework with trade categories, contractor quote tracking, comparison and scope clarity.",
    },
    {
      number: "04",
      title: "Control",
      icon: <ShieldCheck className="w-6 h-6" />,
      description:
        "Coordinate specialists, track progress weekly, document issues before they escalate and report transparently to the owner.",
    },
  ];

  return (
    <section id="method" className="py-24 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The TECTA Method</p>
          <h2 className="text-4xl font-bold text-[#0B1F33] mb-4">
            The TECTA Renovision Method
          </h2>
          <p className="text-[#667085] text-lg max-w-2xl mx-auto">
            A structured, four-stage process that takes your property from current state to transformation — with full owner visibility at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative bg-white border border-[#EDE8E0] rounded-2xl p-7 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-[#2563FF]">
                  {step.icon}
                </div>
                <span className="text-4xl font-bold text-[#F4F1EA]">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F33] mb-3">
                {step.title}
              </h3>
              <p className="text-[#667085] text-sm leading-relaxed">
                {step.description}
              </p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#E8E0D4] z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Before / After Section ──────────────────────────────────────────────
function BeforeAfterSection() {
  const palette = [
    { name: "Warm Limestone Porcelain 90×90", hex: "#C8B99A", label: "Floor Tile" },
    { name: "Oak Veneer + Matte Off-White", hex: "#A07850", label: "Kitchen Fronts" },
    { name: "Light Calacatta Quartz", hex: "#F0ECE4", label: "Countertop" },
    { name: "Warm Mineral White", hex: "#F8F4EE", label: "Wall Finish" },
    { name: "Black Minimal Spots 3000K", hex: "#1A1A1A", label: "Lighting" },
    { name: "Off-White Linen + Walnut", hex: "#E0D8CC", label: "Furniture" },
  ];

  return (
    <section className="py-24 bg-[#0B1F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-4">
            Case Study — Paphos Villa
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Before. After. And everything in between.
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Mediterranean Modern Kitchen Upgrade — from concept photo to approved material board to documented final result.
          </p>
        </div>

        {/* Before / After Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
              alt="Before"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#1F2937]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Current State
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/70 text-xs">Outdated kitchen — dark surfaces, heavy furniture</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80"
              alt="TECTA Vision"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#2563FF]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              TECTA Vision
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/70 text-xs">AI-generated renovation concept</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80"
              alt="Final Result"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#1F8A62]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Final Result
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/70 text-xs">Documented completion — TECTA controlled</p>
            </div>
          </div>
        </div>

        {/* Material & Finish Board */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-5">
            Material & Finish Board — Mediterranean Modern Kitchen
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {palette.map((item) => (
              <div key={item.name} className="text-center">
                <div
                  className="w-full h-14 rounded-lg mb-2 border border-white/10"
                  style={{ backgroundColor: item.hex }}
                />
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-white/70 text-xs font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Budget Estimate",
              value: "€45,000 – €60,000",
              sub: "Initial planning estimate",
              color: "text-white",
            },
            {
              label: "Final Actual Cost",
              value: "€44,863.27",
              sub: "Below estimate — fully documented",
              color: "text-[#1F8A62]",
            },
            {
              label: "Project Duration",
              value: "8 weeks",
              sub: "On schedule — no extensions",
              color: "text-white",
            },
            {
              label: "Value Impact",
              value: "+20% uplift",
              sub: "Estimated presentation value increase",
              color: "text-[#2563FF]",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                {m.label}
              </p>
              <p className={`text-xl font-bold mb-1 ${m.color}`}>{m.value}</p>
              <p className="text-white/40 text-xs">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Differentiation Section ──────────────────────────────────────────────
function DifferentiationSection() {
  const comparisons = [
    {
      bad: {
        title: "WhatsApp Chaos",
        points: [
          "Scattered photos, no structure",
          "No progress tracking",
          "Unclear approvals",
          "Missing documents",
          "Budget uncertainty",
          "Owner out of control",
        ],
      },
      good: {
        title: "TECTA Portal",
        points: [
          "Structured weekly reports",
          "Phase & progress tracking",
          "Digital approval workflow",
          "Centralised documents",
          "Live budget tracker",
          "Owner in full control",
        ],
      },
    },
    {
      bad: {
        title: "Generic Renovation Idea",
        points: [
          "Vague inspiration only",
          "No material specification",
          "No budget logic",
          "Difficult to quote",
          "Contractor interprets freely",
          "No owner record",
        ],
      },
      good: {
        title: "TECTA Vision Board",
        points: [
          "Before/after visual",
          "Full material board",
          "Realistic budget band",
          "Contractor-ready scope",
          "Owner approval workflow",
          "Everything documented",
        ],
      },
    },
    {
      bad: {
        title: "General Contractor Model",
        points: [
          "Bundled pricing — hidden margins",
          "Limited cost transparency",
          "Contractor controls execution",
          "Owner relies on trust alone",
          "Minimal documentation",
          "Disputes without records",
        ],
      },
      good: {
        title: "TECTA Owner-Side",
        points: [
          "Contractors invoice owner directly",
          "Full cost transparency",
          "TECTA reviews all quotes",
          "TECTA tracks quality & progress",
          "Weekly documented reporting",
          "Owner stays in control",
        ],
      },
    },
  ];

  return (
    <section className="py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Why TECTA</p>
          <h2 className="text-4xl font-bold text-[#0B1F33] mb-4">
            A different kind of renovation partner
          </h2>
          <p className="text-[#667085] text-lg max-w-xl mx-auto">
            Not a contractor. Not an agent. Your structured, owner-side renovation intelligence layer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {comparisons.map((comp, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#EDE8E0]">
              {/* Bad */}
              <div className="p-6 bg-[#FEF2F2] border-b border-[#EDE8E0]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#C64B4B]" />
                  <p className="font-semibold text-[#C64B4B] text-sm">
                    {comp.bad.title}
                  </p>
                </div>
                <ul className="space-y-2">
                  {comp.bad.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[#667085]">
                      <span className="w-3.5 h-3.5 text-[#C64B4B] flex-shrink-0">✗</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Good */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#1F8A62]" />
                  <p className="font-semibold text-[#1F8A62] text-sm">
                    {comp.good.title}
                  </p>
                </div>
                <ul className="space-y-2">
                  {comp.good.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[#1F2937]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1F8A62] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────
function CaseStudiesSection() {
  const cases = [
    {
      title: "Paphos Villa — Airbnb Ready Transformation",
      location: "Paphos, Cyprus",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
      estimate: "€45,000 – €60,000",
      final: "€44,863.27",
      timeline: "8 weeks",
      scope: "Kitchen refresh, bathroom upgrade, terrace lighting, furniture direction",
      outcome: "Rental appeal significantly improved — owner ready for premium short-term rental",
      value: "+20% presentation uplift",
      tecta_role: ["Vision board", "Material specification", "Contractor coordination", "Weekly reporting"],
      status: "Completed",
    },
    {
      title: "Limassol Sea View Apartment — Rental Upgrade",
      location: "Limassol, Cyprus",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      estimate: "€18,000 – €24,000",
      final: "€21,740.80",
      timeline: "5 weeks",
      scope: "Bathroom, lighting, furniture, wall finishes",
      outcome: "Rental appeal significantly improved — fully documented",
      value: "Rental income potential +35%",
      tecta_role: ["Vision board", "Budget control", "Progress reporting", "Issue tracking"],
      status: "Completed",
    },
    {
      title: "Paphos Villa Terrace & Pool Upgrade",
      location: "Paphos, Cyprus",
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=600&q=80",
      estimate: "€55,000 – €80,000",
      final: "€73,925.40",
      timeline: "10 weeks",
      scope: "Terrace tile, lighting, pergola, outdoor furniture, pool area",
      outcome: "Premium outdoor living transformation — documented and delivered on spec",
      value: "Premium lifestyle upgrade",
      tecta_role: ["Scope definition", "Contractor comparison", "Quality control", "Handover reporting"],
      status: "Completed",
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Case Studies</p>
          <h2 className="text-4xl font-bold text-[#0B1F33] mb-4">
            Transformations we controlled
          </h2>
          <p className="text-[#667085] text-lg max-w-xl mx-auto">
            Specific numbers. Documented outcomes. Real properties in Cyprus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((cs) => (
            <div key={cs.title} className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#1F8A62] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {cs.status}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 text-xs font-medium px-2.5 py-1.5 rounded-lg text-[#1F2937]">
                  <MapPin className="w-3 h-3" />
                  {cs.location}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#0B1F33] text-base mb-3 leading-snug">
                  {cs.title}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Budget Estimate
                    </p>
                    <p className="text-xs font-medium text-[#1F2937]">{cs.estimate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Final Actual Cost
                    </p>
                    <p className="text-xs font-bold text-[#1F8A62]">{cs.final}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Duration
                    </p>
                    <p className="text-xs font-medium text-[#1F2937]">{cs.timeline}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Value Impact
                    </p>
                    <p className="text-xs font-medium text-[#2563FF]">{cs.value}</p>
                  </div>
                </div>

                <p className="text-xs text-[#667085] mb-4 leading-relaxed">
                  {cs.scope}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cs.tecta_role.map((r) => (
                    <span
                      key={r}
                      className="text-[10px] font-medium bg-[#F4F1EA] text-[#667085] px-2.5 py-1 rounded-full"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="bg-[#F4F1EA] rounded-xl p-3">
                  <p className="text-xs text-[#1F2937] font-medium">
                    {cs.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust / German Mindset ───────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "German Documentation Discipline",
      text: "Every week. Every decision. Every issue. Documented to a standard that contractors know they will be held to.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Owner-Side Control",
      text: "We work exclusively for the owner. We are not the general contractor. We review, compare and approve — never execute ourselves.",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Transparent Contractor Structure",
      text: "Contractors invoice the owner directly. No hidden margins. TECTA reviews all quotes and tracks all payments.",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Premium Reporting",
      text: "Weekly site reports with photographs, issue tracking, budget status and owner actions — designed for remote ownership.",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Material Specification First",
      text: "We specify before you quote. Contractors price against identical specifications — no ambiguity, no surprises.",
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Issues Prevented, Not Just Reported",
      text: "Our weekly site reviews catch problems before they cost money. Typical prevented mistakes are documented and valued.",
    },
  ];

  return (
    <section className="py-24 bg-[#0B1F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-4">
              Trust & Positioning
            </p>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              German Building Mindset in the Mediterranean.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Led by a German building expert mindset, TECTA bridges the gap between Mediterranean lifestyle and Northern European construction standards.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              We do not sell property. We do not act as the general contractor. We structure, specify, document and control the renovation process on the owner&apos;s side.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                TECTA Inspect vs TECTA Renovision
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                <span className="text-white font-medium">TECTA Inspect</span> shows what you are buying — technical surveys and building assessments led by Markus.
              </p>
              <p className="text-white/75 text-sm leading-relaxed mt-2">
                <span className="text-white font-medium">TECTA Renovision</span> shows what it can become — renovation vision, budget and owner-side project control.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors"
              >
                <div className="w-9 h-9 bg-[#2563FF]/15 rounded-lg flex items-center justify-center text-[#2563FF] mb-3">
                  {p.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{p.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────
function PricingSection() {
  const packages = [
    {
      name: "Vision & Budget",
      tagline: "For owners who want clarity before committing.",
      price: "From €1,500",
      features: [
        "AI-supported before/after vision",
        "Material & finish board",
        "Room-by-room priority plan",
        "Realistic budget framework",
        "Contractor-ready scope outline",
        "PDF vision report",
      ],
      cta: "Start Vision & Budget",
      href: "/vision",
      highlight: false,
    },
    {
      name: "Managed Renovation",
      tagline: "Full owner-side project control from start to handover.",
      price: "€5,000 min + 15%",
      priceNote: "of renovation volume",
      features: [
        "Contractor briefing & quote review",
        "Schedule planning & tracking",
        "Weekly site reports",
        "Photo documentation",
        "Issue tracking & prevention",
        "Owner approval workflow",
        "Quality control & checks",
        "Budget tracking",
        "Handover support",
      ],
      cta: "Discuss Managed Renovation",
      href: "/#start",
      highlight: true,
    },
    {
      name: "Remote Owner Control",
      tagline: "For owners not living in Cyprus.",
      price: "Monthly retainer",
      features: [
        "Recurring site visits",
        "Monthly or weekly reports",
        "Photo documentation",
        "Issue tracking",
        "Maintenance coordination",
        "Owner decision support",
      ],
      cta: "Monitor My Property",
      href: "/#start",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Service Packages</p>
          <h2 className="text-4xl font-bold text-[#0B1F33] mb-4">
            Transparent, owner-aligned fees
          </h2>
          <p className="text-[#667085] text-base max-w-xl mx-auto">
            Contractors invoice the owner directly. TECTA Renovision charges a transparent planning and project-control fee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-8 border ${
                pkg.highlight
                  ? "bg-[#0B1F33] border-[#0B1F33]"
                  : "bg-white border-[#EDE8E0]"
              }`}
            >
              {pkg.highlight && (
                <div className="inline-block bg-[#2563FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
              )}
              <h3
                className={`text-xl font-bold mb-1 ${pkg.highlight ? "text-white" : "text-[#0B1F33]"}`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-sm mb-5 ${pkg.highlight ? "text-white/55" : "text-[#667085]"}`}
              >
                {pkg.tagline}
              </p>
              <div className="mb-6">
                <p
                  className={`text-2xl font-bold ${pkg.highlight ? "text-white" : "text-[#0B1F33]"}`}
                >
                  {pkg.price}
                </p>
                {pkg.priceNote && (
                  <p
                    className={`text-xs mt-1 ${pkg.highlight ? "text-white/40" : "text-[#667085]"}`}
                  >
                    {pkg.priceNote}
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        pkg.highlight ? "text-[#1F8A62]" : "text-[#1F8A62]"
                      }`}
                    />
                    <span
                      className={`text-sm ${pkg.highlight ? "text-white/75" : "text-[#1F2937]"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={pkg.href}
                className={`w-full block text-center font-semibold text-sm py-3.5 rounded-xl transition-all ${
                  pkg.highlight
                    ? "bg-[#2563FF] text-white hover:bg-[#1D50D4]"
                    : "bg-[#F4F1EA] text-[#0B1F33] hover:bg-[#EDE8E0] border border-[#E8E0D4]"
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do you perform technical property inspections?",
      a: "No. Technical property inspections, building surveys, snagging and technical due diligence are provided separately by TECTA Inspect. TECTA Renovision focuses exclusively on renovation vision, planning, budget control and owner-side project management.",
    },
    {
      q: "Are you a general contractor?",
      a: "No. TECTA Renovision is not a general contractor. Contractors invoice the property owner directly. We act as the owner-side control layer — planning, reviewing quotes, tracking progress and documenting the renovation on your behalf.",
    },
    {
      q: "How do weekly reports work?",
      a: "Every week during an active managed renovation, TECTA produces a structured site report. It covers completed works, in-progress items, issues detected and resolved, quality control notes, photo documentation, budget status and a plan for the coming week. Reports are published to your client portal and you receive a notification.",
    },
    {
      q: "Can I manage the project remotely?",
      a: "Yes. This is exactly what the TECTA portal is designed for. Remote property owners in Germany, the UK, Switzerland or elsewhere can follow progress weekly through structured reports, approve decisions, review materials and track budget — without being on-site.",
    },
    {
      q: "Can you create before/after visuals from my photos?",
      a: "Yes. Upload your current property photos, select a style direction and renovation objective, and TECTA generates an AI-supported concept visualisation showing your property's renovation potential. The Vision & Budget service includes this.",
    },
    {
      q: "Are AI visuals final construction plans?",
      a: "No. AI visuals are concept previews and not construction drawings or specifications. They are used to align on style direction before detailed material specification. Final execution is based on approved material boards, contractor specifications and detailed scopes.",
    },
    {
      q: "How do you charge?",
      a: "Vision & Budget services are charged at a fixed project fee (from €1,500). Managed Renovation projects are charged at a minimum flat fee of €5,000 plus 15% of the total renovation volume. All fees are agreed in writing before any work begins.",
    },
    {
      q: "What areas in Cyprus do you cover?",
      a: "TECTA Renovision currently operates in Paphos and Limassol. Coverage for Nicosia, Larnaca and Protaras may be available depending on project scope — please enquire.",
    },
    {
      q: "Can you help prepare a property for Airbnb?",
      a: "Yes. Airbnb and holiday rental optimisation is one of our most common service objectives. We assess the property's current state, create a cost-effective upgrade plan, specify materials and furniture direction and manage the renovation to short-term rental standards.",
    },
    {
      q: "Can you include staging and furniture direction?",
      a: "Yes. TECTA Renovision includes furniture palette direction within the vision and material board service. For final staging, we can coordinate with interior staging specialists as an additional service.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#F4F1EA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-4">Frequently Asked</p>
          <h2 className="text-4xl font-bold text-[#0B1F33]">
            Questions & Answers
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#EDE8E0] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-[#0B1F33] text-sm pr-4">
                  {faq.q}
                </span>
                {open === i ? (
                  <ChevronUp className="w-4 h-4 text-[#667085] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667085] flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#667085] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="start" className="py-24 bg-[#0B1F33]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-4">
          Start Here
        </p>
        <h2 className="text-4xl font-bold text-white mb-5">
          Ready to renovate with clarity?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Start with a Vision & Budget review or request a consultation for your Cyprus property. No obligation, no generic advice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/vision"
            className="bg-[#2563FF] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1D50D4] transition-all flex items-center justify-center gap-2"
          >
            Try AI Vision Tool
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/15 transition-all border border-white/15 flex items-center justify-center gap-2"
          >
            Client Login
          </Link>
        </div>
        <p className="text-white/35 text-xs mt-8">
          TECTA Renovision acts as owner-side control — not as a general contractor. Contractors invoice the owner directly.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <MethodSection />
      <BeforeAfterSection />
      <DifferentiationSection />
      <CaseStudiesSection />
      <TrustSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
