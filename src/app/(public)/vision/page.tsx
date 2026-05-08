"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Layers,
  BarChart3,
  Home,
  FileText,
  AlertCircle,
} from "lucide-react";

const ROOMS = [
  "Bathroom",
  "Kitchen",
  "Living Room",
  "Terrace / Pool",
  "Exterior",
  "Full Property",
];

const STYLES = [
  { label: "Mediterranean Modern", desc: "Clean lines, warm stone, blue accents" },
  { label: "Warm Minimal", desc: "Neutral tones, natural textures, no clutter" },
  { label: "Natural Stone Elegance", desc: "Raw stone, earthy finishes, craftsmanship" },
  { label: "Bright Rental Style", desc: "Light, airy, functional for guests" },
  { label: "Contemporary Villa", desc: "Bold geometry, luxury finishes, dramatic spaces" },
  { label: "Premium Airbnb Ready", desc: "Photography-ready, lifestyle staging" },
];

const OBJECTIVES = [
  { label: "Holiday Rental Upgrade", desc: "Maximise short-term rental appeal and income" },
  { label: "Resale Value Upgrade", desc: "Increase market value through targeted improvements" },
  { label: "Owner-Occupied Comfort", desc: "Create a premium living environment for personal use" },
  { label: "Premium Modernisation", desc: "Bring the property to contemporary standards" },
  { label: "Budget-Driven Refresh", desc: "Maximum visual impact with controlled spend" },
  { label: "Luxury Villa Appeal", desc: "Position as a premium luxury asset" },
];

const BUDGETS = [
  {
    label: "Efficient Refresh",
    range: "€15k – €40k",
    desc: "High-impact cosmetic and fixture upgrades",
    color: "text-[#1F8A62]",
  },
  {
    label: "Balanced Upgrade",
    range: "€40k – €80k",
    desc: "Full room upgrades with quality materials",
    color: "text-[#C58A1C]",
  },
  {
    label: "Premium Transformation",
    range: "€80k – €200k+",
    desc: "Full property transformation, premium specification",
    color: "text-[#2563FF]",
  },
];

const LOADING_STEPS = [
  "Analysing current state of uploaded photo",
  "Matching selected style direction",
  "Generating TECTA Vision concept",
  "Creating material & finish board",
  "Estimating budget band",
];

const MATERIAL_MOCK: Record<string, { name: string; hex: string; label: string; status: string }[]> = {
  "Mediterranean Modern": [
    { label: "Floor Tile", name: "Warm Limestone Porcelain 90×90", hex: "#C8B99A", status: "Approved" },
    { label: "Wall Finish", name: "Warm Mineral White", hex: "#F8F4EE", status: "Approved" },
    { label: "Kitchen Fronts", name: "Oak Veneer + Matte Off-White", hex: "#A07850", status: "Pending Approval" },
    { label: "Countertop", name: "Light Calacatta Quartz", hex: "#F0ECE4", status: "Approved" },
    { label: "Lighting", name: "Black Minimal Spots 3000K", hex: "#1A1A1A", status: "Approved" },
    { label: "Outdoor Tile", name: "Travertine-Look Porcelain 80×80", hex: "#D4BC96", status: "Approved" },
  ],
  "Warm Minimal": [
    { label: "Floor Tile", name: "Greige Large Format 120×60", hex: "#C4B8A8", status: "Approved" },
    { label: "Wall Finish", name: "Soft Linen White", hex: "#FAF6F0", status: "Approved" },
    { label: "Kitchen Fronts", name: "Warm White Lacquer Handleless", hex: "#F4F0E8", status: "Approved" },
    { label: "Countertop", name: "Warm Quartz — Neutral", hex: "#EAE4DA", status: "Approved" },
    { label: "Lighting", name: "Brass Minimal Downlights 2700K", hex: "#C8A850", status: "Pending Approval" },
    { label: "Wood Tone", name: "Washed Oak", hex: "#C4A87A", status: "Approved" },
  ],
};

function getBudgetBand(budget: string, room: string): string {
  const bands: Record<string, Record<string, string>> = {
    "Efficient Refresh": {
      Bathroom: "€8,000 – €18,000",
      Kitchen: "€10,000 – €22,000",
      "Living Room": "€5,000 – €12,000",
      "Terrace / Pool": "€8,000 – €20,000",
      Exterior: "€12,000 – €28,000",
      "Full Property": "€15,000 – €40,000",
    },
    "Balanced Upgrade": {
      Bathroom: "€18,000 – €35,000",
      Kitchen: "€22,000 – €45,000",
      "Living Room": "€12,000 – €28,000",
      "Terrace / Pool": "€20,000 – €45,000",
      Exterior: "€28,000 – €60,000",
      "Full Property": "€40,000 – €80,000",
    },
    "Premium Transformation": {
      Bathroom: "€35,000 – €70,000",
      Kitchen: "€45,000 – €90,000",
      "Living Room": "€28,000 – €60,000",
      "Terrace / Pool": "€45,000 – €100,000",
      Exterior: "€60,000 – €140,000",
      "Full Property": "€80,000 – €200,000+",
    },
  };
  return bands[budget]?.[room] || "€20,000 – €60,000";
}

function getImpactLevel(objective: string): string {
  const map: Record<string, string> = {
    "Holiday Rental Upgrade": "High — Rental Income Impact",
    "Resale Value Upgrade": "High — Capital Value Impact",
    "Owner-Occupied Comfort": "Medium — Lifestyle Impact",
    "Premium Modernisation": "High — Market Positioning",
    "Budget-Driven Refresh": "Medium — Visual Impact",
    "Luxury Villa Appeal": "Very High — Premium Positioning",
  };
  return map[objective] || "High";
}

export default function VisionPage() {
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generated, setGenerated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string);
      setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string);
      setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingStep(0);
    for (let i = 0; i < LOADING_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setLoadingStep(i + 1);
    }
    setIsGenerating(false);
    setGenerated(true);
    setStep(6);
  };

  const reset = () => {
    setStep(1);
    setUploadedImage(null);
    setRoom("");
    setStyle("");
    setObjective("");
    setBudget("");
    setGenerated(false);
    setLoadingStep(0);
  };

  const materials =
    MATERIAL_MOCK[style as keyof typeof MATERIAL_MOCK] ||
    MATERIAL_MOCK["Mediterranean Modern"];

  const VISION_IMAGES: Record<string, string> = {
    "Mediterranean Modern":
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80",
    "Warm Minimal":
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&q=80",
    "Natural Stone Elegance":
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&q=80",
    "Bright Rental Style":
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80",
    "Contemporary Villa":
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=700&q=80",
    "Premium Airbnb Ready":
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&q=80",
  };

  const visionImage =
    VISION_IMAGES[style] ||
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80";

  return (
    <div className="min-h-screen bg-[#FCFBF8] pt-16">
      {/* Header */}
      <div className="bg-[#0B1F33] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/50 hover:text-white text-sm">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 text-sm">AI Vision Tool</span>
          </div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-3">
            TECTA Vision Tool
          </p>
          <h1 className="text-3xl font-bold mb-2">
            AI-Supported Renovation Vision
          </h1>
          <p className="text-white/55 text-base">
            Upload your property photo and receive a renovation concept with material board and budget estimate.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Step indicator */}
        {step < 6 && (
          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step
                      ? "bg-[#1F8A62] text-white"
                      : s === step
                      ? "bg-[#2563FF] text-white"
                      : "bg-[#EDE8E0] text-[#667085]"
                  }`}
                >
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                {s < 5 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 min-w-8 md:min-w-16 ${
                      s < step ? "bg-[#1F8A62]" : "bg-[#EDE8E0]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-[#0B1F33] mb-2">
              Upload your property photo
            </h2>
            <p className="text-[#667085] mb-8">
              Upload a clear photo of the room or area you want to transform.
              This becomes your &ldquo;Current State&rdquo; — the baseline for your TECTA Vision.
            </p>

            <div
              className="border-2 border-dashed border-[#D8CBB8] rounded-2xl p-16 text-center hover:border-[#2563FF] hover:bg-blue-50/30 transition-all cursor-pointer bg-white"
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload className="w-12 h-12 text-[#D8CBB8] mx-auto mb-4" />
              <p className="text-[#1F2937] font-semibold text-lg mb-2">
                Drop your photo here or click to upload
              </p>
              <p className="text-[#667085] text-sm mb-4">
                JPG, PNG or HEIC — any property photo works
              </p>
              <button className="bg-[#2563FF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1D50D4] transition-all">
                Choose Photo
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="mt-6 bg-[#F4F1EA] rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#667085] flex-shrink-0 mt-0.5" />
              <p className="text-[#667085] text-sm">
                AI visuals are concept previews only, not construction drawings or specifications. Final execution is based on detailed scope and approved material boards.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Room */}
        {step === 2 && (
          <div className="fade-in">
            <div className="flex items-start gap-4 mb-8">
              <div className="relative">
                <img
                  src={uploadedImage!}
                  alt="Uploaded"
                  className="w-24 h-20 object-cover rounded-xl border border-[#EDE8E0]"
                />
                <div className="absolute -top-1 -right-1 bg-[#1F8A62] rounded-full p-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F8A62] uppercase tracking-wider mb-1">
                  Photo uploaded — Current State saved
                </p>
                <h2 className="text-2xl font-bold text-[#0B1F33]">
                  Select room / area
                </h2>
                <p className="text-[#667085] text-sm mt-1">
                  Which part of the property is in this photo?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ROOMS.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRoom(r); setStep(3); }}
                  className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all ${
                    room === r
                      ? "border-[#2563FF] bg-[#EEF2FF] text-[#2563FF]"
                      : "border-[#EDE8E0] bg-white text-[#1F2937] hover:border-[#2563FF]/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-[#0B1F33] mb-2">
              Select style direction
            </h2>
            <p className="text-[#667085] mb-8">
              Choose the aesthetic direction for your renovation vision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {STYLES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => { setStyle(s.label); setStep(4); }}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    style === s.label
                      ? "border-[#2563FF] bg-[#EEF2FF]"
                      : "border-[#EDE8E0] bg-white hover:border-[#2563FF]/50"
                  }`}
                >
                  <p className="font-semibold text-[#0B1F33] text-sm">{s.label}</p>
                  <p className="text-[#667085] text-xs mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Objective */}
        {step === 4 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-[#0B1F33] mb-2">
              Select renovation objective
            </h2>
            <p className="text-[#667085] mb-8">
              What is the primary goal of this renovation?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OBJECTIVES.map((o) => (
                <button
                  key={o.label}
                  onClick={() => { setObjective(o.label); setStep(5); }}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    objective === o.label
                      ? "border-[#2563FF] bg-[#EEF2FF]"
                      : "border-[#EDE8E0] bg-white hover:border-[#2563FF]/50"
                  }`}
                >
                  <p className="font-semibold text-[#0B1F33] text-sm">{o.label}</p>
                  <p className="text-[#667085] text-xs mt-1">{o.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Budget + Generate */}
        {step === 5 && !isGenerating && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-[#0B1F33] mb-2">
              Select budget direction
            </h2>
            <p className="text-[#667085] mb-8">
              This helps calibrate the material specification and scope of the vision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {BUDGETS.map((b) => (
                <button
                  key={b.label}
                  onClick={() => setBudget(b.label)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    budget === b.label
                      ? "border-[#2563FF] bg-[#EEF2FF]"
                      : "border-[#EDE8E0] bg-white hover:border-[#2563FF]/50"
                  }`}
                >
                  <p className="font-bold text-[#0B1F33] text-sm mb-1">{b.label}</p>
                  <p className={`text-base font-bold mb-1 ${b.color}`}>{b.range}</p>
                  <p className="text-[#667085] text-xs">{b.desc}</p>
                </button>
              ))}
            </div>

            {/* Summary before generate */}
            <div className="bg-[#0B1F33] rounded-2xl p-6 mb-6">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-4">
                Vision Brief Summary
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Room / Area", room],
                  ["Style Direction", style],
                  ["Objective", objective],
                  ["Budget Direction", budget || "Not selected"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-white/40 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 text-[#667085] text-sm font-medium hover:text-[#1F2937]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={!budget}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-4 rounded-xl transition-all ${
                  budget
                    ? "bg-[#2563FF] text-white hover:bg-[#1D50D4]"
                    : "bg-[#EDE8E0] text-[#667085] cursor-not-allowed"
                }`}
              >
                Generate TECTA Vision
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isGenerating && (
          <div className="fade-in text-center py-16">
            <div className="w-16 h-16 rounded-full border-4 border-[#EEF2FF] border-t-[#2563FF] mx-auto mb-8 spin" />
            <h3 className="text-xl font-bold text-[#0B1F33] mb-2">
              Generating your TECTA Vision
            </h3>
            <p className="text-[#667085] text-sm mb-10">
              This takes about 5 seconds for a real project.
            </p>
            <div className="max-w-xs mx-auto space-y-3">
              {LOADING_STEPS.map((s, i) => (
                <div
                  key={s}
                  className={`flex items-center gap-3 text-sm transition-all ${
                    i < loadingStep
                      ? "text-[#1F8A62]"
                      : i === loadingStep
                      ? "text-[#2563FF] pulse-soft"
                      : "text-[#D8CBB8]"
                  }`}
                >
                  {i < loadingStep ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : i === loadingStep ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#2563FF] border-t-transparent spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8CBB8] flex-shrink-0" />
                  )}
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {step === 6 && generated && (
          <div className="fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#1F8A62] text-xs font-semibold uppercase tracking-wider mb-1">
                  TECTA Vision Complete
                </p>
                <h2 className="text-2xl font-bold text-[#0B1F33]">
                  Your Renovation Vision
                </h2>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#1F2937] border border-[#EDE8E0] px-4 py-2 rounded-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Start New
              </button>
            </div>

            {/* Before / After */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={uploadedImage!}
                  alt="Current State"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#1F2937]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Current State
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={visionImage}
                  alt="TECTA Vision"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#2563FF]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  TECTA Vision
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-medium">{style}</p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
                <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Budget Band</p>
                <p className="text-[#0B1F33] font-bold text-sm">{getBudgetBand(budget, room)}</p>
              </div>
              <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
                <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Impact Level</p>
                <p className="text-[#2563FF] font-bold text-sm">{getImpactLevel(objective)}</p>
              </div>
              <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
                <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Next Step</p>
                <p className="text-[#0B1F33] font-bold text-sm">Full Vision Report</p>
              </div>
            </div>

            {/* Material Board */}
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <Layers className="w-4 h-4 text-[#2563FF]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                  Material & Finish Board — {style}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {materials.map((m) => (
                  <div key={m.label} className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 border border-[#EDE8E0]"
                      style={{ backgroundColor: m.hex }}
                    />
                    <div>
                      <p className="text-[10px] text-[#667085] uppercase tracking-wider">{m.label}</p>
                      <p className="text-xs font-medium text-[#1F2937] leading-tight">{m.name}</p>
                      <span
                        className={`text-[10px] font-semibold ${
                          m.status === "Approved" ? "text-[#1F8A62]" : "text-[#C58A1C]"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0B1F33] rounded-2xl p-6">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Recommended Next Step</p>
              <h3 className="text-white font-bold text-lg mb-2">
                Request Full Vision & Budget Report
              </h3>
              <p className="text-white/55 text-sm mb-5">
                Receive a detailed PDF report with your full vision board, material specification, room-by-room budget framework and contractor-ready scope outline.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/#start"
                  className="bg-[#2563FF] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1D50D4] transition-all flex items-center gap-2"
                >
                  Request Full Report
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/15 transition-all border border-white/15"
                >
                  Client Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
