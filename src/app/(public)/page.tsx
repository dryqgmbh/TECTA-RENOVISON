"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageCircle,
  Star,
  MapPin,
  Shield,
  Clock,
  Eye,
  Camera,
  FileCheck,
  BadgeCheck,
  Quote,
  Sparkles,
  BarChart2,
  ImageIcon,
} from "lucide-react";

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative bg-[#0B1F33] pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left */}
          <div className="pt-12 pb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
              <span className="text-base">🇩🇪</span>
              <span className="text-white/75 text-xs font-medium">
                Deutsches Qualitätsbewusstsein · Zypern-Expertise
              </span>
            </div>

            <h1 className="text-[2.6rem] md:text-5xl font-bold text-white leading-[1.1] mb-6">
              Ihre Zypern-Immobilie.
              <br />
              <span className="text-[#2563FF]">Renoviert mit System.</span>
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
              TECTA Renovision bringt deutsche Planungskultur nach Zypern — mit
              persönlicher Beratung, strukturierter Projektkontrolle und vollem
              Einblick für den Eigentümer. Auch aus der Ferne.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/vision"
                className="bg-[#2563FF] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1D50D4] transition-all flex items-center gap-2"
              >
                KI-Renovierungsvorschau starten
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#contact"
                className="bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/15 transition-all border border-white/15"
              >
                Kostenloses Erstgespräch
              </a>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex -space-x-2">
                {["M", "S", "T"].map((l, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563FF] to-[#1D50D4] border-2 border-[#0B1F33] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#C58A1C] text-[#C58A1C]"
                    />
                  ))}
                </div>
                <p className="text-white/50 text-xs">
                  Bewertet von deutschen Eigentümern in Zypern
                </p>
              </div>
            </div>
          </div>

          {/* Right — property image with portal cards */}
          <div className="relative hidden lg:block">
            <div className="relative h-[520px] rounded-t-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80"
                alt="Renoviertes Haus Zypern"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/50 to-transparent" />

              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl">
                <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1.5">
                  Projektfortschritt
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[42%] h-full bg-[#2563FF] rounded-full" />
                  </div>
                  <span className="text-[#0B1F33] font-bold text-sm">42%</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl">
                <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                  Budget
                </p>
                <p className="text-[#1F8A62] font-bold text-sm">Im Rahmen ✓</p>
              </div>

              <div className="absolute bottom-8 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl max-w-[210px]">
                <p className="text-[10px] font-semibold text-[#2563FF] uppercase tracking-wider mb-1">
                  Wochenbericht KW 11
                </p>
                <p className="text-[#0B1F33] text-xs font-medium leading-snug">
                  Badezimmer 80% fertig · Fliesenlegen beginnt Donnerstag
                </p>
              </div>

              <div className="absolute bottom-8 right-6 bg-[#0B1F33]/90 backdrop-blur rounded-xl p-4 shadow-xl">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">
                  Nächster Besuch
                </p>
                <p className="text-white font-bold text-sm">14. Mai 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 bg-gradient-to-t from-[#FCFBF8] to-transparent" />
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { value: "12+", label: "Abgeschlossene Projekte" },
    { value: "€2,4M", label: "Kontrolliertes Bauvolumen" },
    { value: "4,9 / 5", label: "Kundenzufriedenheit" },
    { value: "DE / AT / CH", label: "Deutschsprachige Beratung" },
  ];

  return (
    <div className="bg-white border-y border-[#EDE8E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EDE8E0]">
          {items.map((item) => (
            <div key={item.label} className="py-5 px-6 text-center">
              <p className="text-[#0B1F33] font-bold text-xl mb-0.5">
                {item.value}
              </p>
              <p className="text-[#667085] text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Personal Section ─────────────────────────────────────────────────────────
function PersonalSection() {
  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80"
                alt="Markus — TECTA Renovision"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#0B1F33] text-white rounded-2xl p-5 shadow-xl max-w-[230px]">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-5 h-5 text-[#2563FF]" />
                <span className="text-xs font-semibold">Geprüfter Sachverstand</span>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">
                Zertifizierter Bausachverständiger mit langjähriger Erfahrung auf Zypern
              </p>
            </div>
          </div>

          <div>
            <p className="section-label mb-4">Ihr persönlicher Ansprechpartner</p>
            <h2 className="text-3xl font-bold text-[#0B1F33] mb-5 leading-tight">
              Kein Call-Center.
              <br />
              Kein anonymes Tool.
              <br />
              <span className="text-[#2563FF]">Ich persönlich.</span>
            </h2>
            <p className="text-[#667085] leading-relaxed mb-4">
              Mein Name ist Markus. Ich bin deutscher Bausachverständiger und lebe
              seit Jahren auf Zypern. Ich kenne den lokalen Markt, die Handwerker,
              die Tücken — und ich spreche Ihre Sprache.
            </p>
            <p className="text-[#667085] leading-relaxed mb-8">
              TECTA Renovision ist kein Generalunternehmer und kein Makler. Ich
              arbeite ausschließlich auf der Eigentümerseite — mit deutschem
              Planungsanspruch und lokaler Erfahrung.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Strukturierte Wochenberichte statt WhatsApp-Nachrichten",
                "Alle Entscheidungen dokumentiert und nachvollziehbar",
                "Volle Kostentransparenz — Handwerker rechnen direkt mit Ihnen ab",
                "Vollständiger Einblick von Deutschland, Österreich oder der Schweiz",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#1F8A62] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1F2937] text-sm">{point}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0B1F33] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1F2937] transition-all"
            >
              Persönliches Gespräch anfragen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <Eye className="w-5 h-5" />,
      title: "Vision entwickeln",
      text: "Fotos hochladen, Stil wählen, KI-gestützte Vorher/Nachher-Visualisierung mit Materialboard und Budgetrahmen erhalten.",
    },
    {
      number: "02",
      icon: <FileCheck className="w-5 h-5" />,
      title: "Spezifikation erstellen",
      text: "Materialien, Fliesen, Oberflächen und Ausstattung werden verbindlich spezifiziert — handwerkerreif und vergleichbar.",
    },
    {
      number: "03",
      icon: <Shield className="w-5 h-5" />,
      title: "Budget kontrollieren",
      text: "Angebote einholen, prüfen und vergleichen. TECTA prüft alle Kostenvoranschläge auf Vollständigkeit und Marktüblichkeit.",
    },
    {
      number: "04",
      icon: <Camera className="w-5 h-5" />,
      title: "Ausführung begleiten",
      text: "Wöchentliche Baustellenbesuche, Fotodokumentation, Qualitätskontrolle und strukturierte Berichte direkt ins Portal.",
    },
  ];

  return (
    <section id="method" className="py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">So funktioniert TECTA</p>
          <h2 className="text-3xl font-bold text-[#0B1F33] mb-3">
            Von der Idee zur fertig renovierten Immobilie
          </h2>
          <p className="text-[#667085] max-w-xl mx-auto">
            Strukturiert. Dokumentiert. Transparent. Genau das, was Sie von einem
            deutschen Bauprojekt erwarten würden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-6 border border-[#EDE8E0] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-[#2563FF]">
                  {step.icon}
                </div>
                <span className="text-3xl font-bold text-[#F4F1EA]">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold text-[#0B1F33] mb-2">{step.title}</h3>
              <p className="text-[#667085] text-sm leading-relaxed">{step.text}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-2.5 w-5 h-0.5 bg-[#E8E0D4]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Before / After ───────────────────────────────────────────────────────────
function BeforeAfterSection() {
  return (
    <section className="py-20 bg-[#0B1F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-3">
            Fallstudie — Paphos Villa
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Vorher. Vision. Nachher.
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm">
            Mediterrane Modernisierung — vom Konzeptfoto zum genehmigten
            Materialboard zum dokumentierten Endergebnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
              label: "Vorher",
              labelColor: "bg-[#1F2937]/90",
              caption: "Veraltete Küche — dunkle Oberflächen",
            },
            {
              src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
              label: "TECTA Vision",
              labelColor: "bg-[#2563FF]/90",
              caption: "KI-gestützte Renovierungsvisualisierung",
            },
            {
              src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
              label: "Ergebnis",
              labelColor: "bg-[#1F8A62]/90",
              caption: "Dokumentiertes Ergebnis — TECTA kontrolliert",
            },
          ].map((img) => (
            <div key={img.label} className="relative rounded-2xl overflow-hidden">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-56 object-cover"
              />
              <div
                className={`absolute top-3 left-3 ${img.labelColor} text-white text-xs font-semibold px-3 py-1.5 rounded-lg`}
              >
                {img.label}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white/70 text-xs">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Budgetrahmen", value: "€45–60k", sub: "Anfängliche Schätzung" },
            {
              label: "Endabrechnung",
              value: "€44.863",
              sub: "Unter Budget",
              green: true,
            },
            { label: "Projektdauer", value: "8 Wochen", sub: "Termingerecht" },
            {
              label: "Wertsteigerung",
              value: "+20%",
              sub: "Geschätzter Mehrwert",
              blue: true,
            },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                {m.label}
              </p>
              <p
                className={`text-xl font-bold mb-1 ${
                  m.green
                    ? "text-[#1F8A62]"
                    : m.blue
                    ? "text-[#2563FF]"
                    : "text-white"
                }`}
              >
                {m.value}
              </p>
              <p className="text-white/40 text-xs">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Als Auslandsbesitzer war mir Kontrolle das Wichtigste. Wöchentliche Berichte, echte Fotos, ein direkter Ansprechpartner — TECTA hat meine Erwartungen klar übertroffen.",
      name: "Michael S.",
      location: "München",
      property: "Villa, Paphos",
      initials: "MS",
    },
    {
      quote:
        "Andere Anbieter haben vage Angebote gemacht. TECTA hat konkrete Zahlen, Vergleichsangebote und eine klare Zeitplanung geliefert. Projekt pünktlich, unter Budget.",
      name: "Sandra K.",
      location: "Hamburg",
      property: "Apartment, Limassol",
      initials: "SK",
    },
    {
      quote:
        "Ich war nie persönlich in Zypern während der Renovierung. Dank TECTA wusste ich jeden Dienstag genau, was auf meiner Immobilie passiert — inklusive Fotos und Budget.",
      name: "Thomas W.",
      location: "Zürich",
      property: "Penthouse, Paphos",
      initials: "TW",
    },
  ];

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Kundenstimmen</p>
          <h2 className="text-3xl font-bold text-[#0B1F33]">
            Was unsere Eigentümer sagen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-[#EDE8E0] p-7 hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-[#EDE8E0] mb-4" />
              <p className="text-[#1F2937] text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2563FF] text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#0B1F33] text-sm">{t.name}</p>
                  <p className="text-[#667085] text-xs">
                    {t.location} · {t.property}
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

// ─── Why TECTA ───────────────────────────────────────────────────────────────
function WhyTECTASection() {
  const points = [
    {
      title: "Nicht der Generalunternehmer",
      text: "Wir koordinieren, kontrollieren und dokumentieren — auf Ihrer Seite. Handwerker rechnen direkt mit Ihnen ab. Keine versteckten Margen.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Deutsches Dokumentationsstandard",
      text: "Jede Entscheidung. Jedes Problem. Jede Woche. Dokumentiert wie Sie es aus Deutschland kennen.",
      icon: <FileCheck className="w-5 h-5" />,
    },
    {
      title: "Strukturiert statt WhatsApp-Chaos",
      text: "Klare Wochenberichte, digitales Freigabeverfahren und zentrales Dokumentenarchiv — statt verwischter Fotos im Chat.",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: "Für Remote-Eigentümer gemacht",
      text: "Sie leben in Deutschland, Österreich oder der Schweiz? Kein Problem. Das Portal gibt Ihnen vollständigen Einblick von überall.",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Warum TECTA</p>
            <h2 className="text-3xl font-bold text-[#0B1F33] mb-5 leading-tight">
              Ein anderer Ansatz.
              <br />
              Auf Ihrer Seite.
            </h2>
            <p className="text-[#667085] leading-relaxed mb-8">
              TECTA Renovision verkauft keine Immobilien und ist kein
              Generalunternehmer. Wir strukturieren, spezifizieren, dokumentieren
              und kontrollieren den Renovierungsprozess — ausschließlich im
              Interesse des Eigentümers.
            </p>
            <div className="bg-white rounded-xl border border-[#EDE8E0] p-5 mb-6">
              <p className="text-[#667085] text-xs uppercase tracking-wider font-semibold mb-3">
                TECTA Inspect vs TECTA Renovision
              </p>
              <p className="text-sm text-[#1F2937] leading-relaxed">
                <span className="font-semibold text-[#0B1F33]">TECTA Inspect</span>{" "}
                zeigt, was Sie kaufen — technische Gebäudebewertung.
              </p>
              <p className="text-sm text-[#1F2937] leading-relaxed mt-2">
                <span className="font-semibold text-[#0B1F33]">TECTA Renovision</span>{" "}
                zeigt, was daraus werden kann — Vision, Budget, Projektkontrolle.
              </p>
            </div>
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 bg-[#2563FF] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1D50D4] transition-all"
            >
              Vision & Budget starten
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-xl p-5 border border-[#EDE8E0]"
              >
                <div className="w-9 h-9 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#2563FF] mb-3">
                  {p.icon}
                </div>
                <h4 className="font-bold text-[#0B1F33] text-sm mb-2">
                  {p.title}
                </h4>
                <p className="text-[#667085] text-xs leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function PricingSection() {
  const packages = [
    {
      name: "Vision & Budget",
      tagline: "Für Eigentümer, die Klarheit wollen, bevor sie entscheiden.",
      price: "ab €1.500",
      features: [
        "KI-gestützte Vorher/Nachher-Visualisierung",
        "Materialboard mit Stil- und Farbrichtung",
        "Realistischer Budgetrahmen",
        "Handwerkerreife Leistungsbeschreibung",
        "PDF-Visionsbericht",
      ],
      cta: "Vision starten",
      href: "/vision",
      highlight: false,
    },
    {
      name: "Managed Renovation",
      tagline: "Vollständige Eigentümer-Projektkontrolle bis zur Übergabe.",
      price: "€5.000 + 15%",
      priceNote: "vom Renovierungsvolumen",
      features: [
        "Handwerker-Briefing & Angebotsprüfung",
        "Wöchentliche Berichte mit Fotodokumentation",
        "Qualitätskontrolle & Nachweisdokumentation",
        "Budget-Tracking in Echtzeit",
        "Digitales Freigabeverfahren",
        "Problemerkennung & -protokollierung",
        "Übergabedokumentation",
      ],
      cta: "Beratungsgespräch anfragen",
      href: "#contact",
      highlight: true,
    },
    {
      name: "Remote Monitoring",
      tagline: "Für Eigentümer, die nicht in Zypern leben.",
      price: "Monatliche Pauschale",
      features: [
        "Regelmäßige Baustellenbesuche",
        "Monatliche Fotoreports",
        "Problemerkennung & -meldung",
        "Wartungskoordination",
        "Entscheidungsunterstützung auf Distanz",
      ],
      cta: "Angebot anfragen",
      href: "#contact",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Leistungen & Preise</p>
          <h2 className="text-3xl font-bold text-[#0B1F33] mb-3">
            Transparente Honorare
          </h2>
          <p className="text-[#667085] max-w-lg mx-auto text-sm">
            Handwerker rechnen direkt mit dem Eigentümer ab. TECTA berechnet ein
            transparentes Planungs- und Kontrollhonorar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-7 border ${
                pkg.highlight
                  ? "bg-[#0B1F33] border-[#0B1F33]"
                  : "bg-white border-[#EDE8E0]"
              }`}
            >
              {pkg.highlight && (
                <span className="inline-block bg-[#2563FF] text-white text-[10px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                  Empfohlen
                </span>
              )}
              <h3
                className={`text-lg font-bold mb-1 ${
                  pkg.highlight ? "text-white" : "text-[#0B1F33]"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-xs mb-5 ${
                  pkg.highlight ? "text-white/50" : "text-[#667085]"
                }`}
              >
                {pkg.tagline}
              </p>
              <div className="mb-6">
                <p
                  className={`text-xl font-bold ${
                    pkg.highlight ? "text-white" : "text-[#0B1F33]"
                  }`}
                >
                  {pkg.price}
                </p>
                {pkg.priceNote && (
                  <p
                    className={`text-xs mt-0.5 ${
                      pkg.highlight ? "text-white/40" : "text-[#667085]"
                    }`}
                  >
                    {pkg.priceNote}
                  </p>
                )}
              </div>
              <ul className="space-y-2.5 mb-7">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#1F8A62]" />
                    <span
                      className={`text-sm ${
                        pkg.highlight ? "text-white/70" : "text-[#1F2937]"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={pkg.href}
                className={`w-full block text-center font-semibold text-sm py-3 rounded-xl transition-all ${
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Sind Sie ein Generalunternehmer?",
      a: "Nein. TECTA Renovision ist kein Generalunternehmer. Handwerker rechnen direkt mit dem Eigentümer ab. Wir agieren als Planungs- und Kontrollschicht auf der Eigentümerseite — prüfen Angebote, überwachen Fortschritt und dokumentieren die Renovierung in Ihrem Auftrag.",
    },
    {
      q: "Wie funktionieren die Wochenberichte?",
      a: "Während einer aktiven Managed Renovation erstellt TECTA wöchentlich einen strukturierten Bericht: erledigte Arbeiten, laufende Gewerke, aufgetretene Probleme, Qualitätskontrolle, Fotodokumentation, Budgetstatus und Planung der Folgewoche. Die Berichte erscheinen direkt in Ihrem Eigentümerportal.",
    },
    {
      q: "Kann ich das Projekt von Deutschland aus verwalten?",
      a: "Ja — genau dafür ist das TECTA-Portal konzipiert. Eigentümer aus Deutschland, Österreich oder der Schweiz können Fortschritt verfolgen, Materialien freigeben, Dokumente einsehen und den Budgetstatus überwachen — ohne vor Ort zu sein.",
    },
    {
      q: "Was kostet die Vision & Budget Analyse?",
      a: "Das Vision & Budget Paket beginnt bei €1.500. Der genaue Preis richtet sich nach Immobilientyp, Anzahl der Räume und gewünschtem Leistungsumfang. Alle Honorare werden schriftlich vereinbart, bevor eine Arbeit beginnt.",
    },
    {
      q: "In welchen Gebieten Zyperns sind Sie tätig?",
      a: "TECTA Renovision ist derzeit in Paphos und Limassol aktiv. Für Projekte in Nikosia, Larnaka oder Protaras bitten wir um Anfrage — je nach Projektumfang kann Abdeckung möglich sein.",
    },
    {
      q: "Können KI-Visualisierungen als Baupläne verwendet werden?",
      a: "Nein. KI-Visualisierungen sind Konzeptvorschauen, keine Ausführungspläne. Sie helfen, die Stilrichtung zu definieren, bevor detaillierte Materialspezifikationen erstellt werden. Die Ausführung basiert auf genehmigten Materialboards und Leistungsbeschreibungen.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#F4F1EA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Häufige Fragen</p>
          <h2 className="text-3xl font-bold text-[#0B1F33]">
            Fragen & Antworten
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#EDE8E0] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
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
                <div className="px-6 pb-4">
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#0B1F33]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-3">
            Kontakt
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Bereit für das Gespräch?
          </h2>
          <p className="text-white/55 max-w-lg mx-auto">
            Kein langes Formular. Nehmen Sie direkten Kontakt auf — auf Deutsch,
            per Telefon, WhatsApp oder E-Mail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: <Phone className="w-6 h-6" />,
              label: "Telefon",
              value: "+357 99 000 000",
              sub: "Mo–Fr, 9–18 Uhr (Zypern-Zeit)",
              action: "tel:+35799000000",
              cta: "Jetzt anrufen",
              color: "text-[#1F8A62]",
              bg: "bg-[#1F8A62]/15",
            },
            {
              icon: <MessageCircle className="w-6 h-6" />,
              label: "WhatsApp",
              value: "Nachricht schreiben",
              sub: "Antwort meist innerhalb 2h",
              action: "https://wa.me/35799000000",
              cta: "WhatsApp öffnen",
              color: "text-[#1F8A62]",
              bg: "bg-[#1F8A62]/15",
            },
            {
              icon: <Mail className="w-6 h-6" />,
              label: "E-Mail",
              value: "info@tecta.cy",
              sub: "Antwort innerhalb 24h",
              action: "mailto:info@tecta.cy",
              cta: "E-Mail senden",
              color: "text-[#2563FF]",
              bg: "bg-[#2563FF]/15",
            },
          ].map((contact) => (
            <a
              key={contact.label}
              href={contact.action}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group block"
            >
              <div
                className={`w-12 h-12 ${contact.bg} rounded-xl flex items-center justify-center ${contact.color} mb-4`}
              >
                {contact.icon}
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                {contact.label}
              </p>
              <p className="text-white font-semibold mb-1">{contact.value}</p>
              <p className="text-white/40 text-xs mb-4">{contact.sub}</p>
              <span
                className={`text-xs font-semibold ${contact.color} flex items-center gap-1.5 group-hover:gap-2.5 transition-all`}
              >
                {contact.cta} <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/vision"
            className="inline-flex items-center gap-2 bg-[#2563FF] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1D50D4] transition-all"
          >
            KI-Vorschau kostenlos starten
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/30 text-xs mt-4">
            TECTA Renovision handelt ausschließlich im Interesse des Eigentümers
            — nicht als Generalunternehmer.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Portal Preview — "Das Cockpit" ──────────────────────────────────────────
type CockpitTab = "bericht" | "budget" | "material" | "fotos";

function BerichtTabContent() {
  return (
    <div className="text-left">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider">
            Wochenbericht KW 11 · 6. Mai 2026
          </p>
          <p className="text-white font-bold text-xs">Paphos Villa</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            Im Budget ✓
          </span>
          <span className="text-[9px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            Pünktlich ✓
          </span>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-3 mb-3">
        <p className="text-white/60 text-[11px] leading-relaxed">
          &ldquo;Woche 11 bestätigt soliden Fortschritt. Badezimmer zu 80%
          fertig, Fliesenlegen beginnt Donnerstag. Elektro Erstverlegung
          abgeschlossen.&rdquo;
        </p>
      </div>
      <div className="mb-3">
        <p className="text-white/30 text-[9px] uppercase tracking-wider mb-2">
          Abgeschlossen
        </p>
        {[
          "Abdichtung Layer 2 abgeschlossen ✓",
          "Küche: Abbruch vollständig ✓",
          "Elektro Erstverlegung alle Räume ✓",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 flex-shrink-0 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
            <span className="text-white/60 text-[11px]">{item}</span>
          </div>
        ))}
      </div>
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
        <p className="text-amber-400 text-[10px] font-semibold mb-0.5">
          ⚡ Eigentümer-Aktion erforderlich
        </p>
        <p className="text-white/60 text-[10px]">
          Fliesenwahl Bodenfliese Küche bis 12. Mai freigeben
        </p>
      </div>
    </div>
  );
}

function BudgetTabContent() {
  const cats = [
    { name: "Abbruch", pct: 91, paid: "3,2k", planned: "3,5k" },
    { name: "Sanitär", pct: 70, paid: "8,4k", planned: "12k" },
    { name: "Elektro", pct: 41, paid: "3,5k", planned: "8,5k" },
    { name: "Fliesen", pct: 0, paid: "0", planned: "14k" },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Genehmigt", value: "€ 60.000", sub: "" },
          { label: "Ausgegeben", value: "€ 28.500", sub: "47%" },
          { label: "Prognose", value: "€ 58.200", sub: "↓ €1.800", green: true },
        ].map((m) => (
          <div key={m.label} className="bg-white/5 rounded-lg p-2.5">
            <p className="text-white/40 text-[9px] uppercase tracking-wider">
              {m.label}
            </p>
            <p
              className={`font-bold text-xs mt-0.5 ${
                m.green ? "text-emerald-400" : "text-white"
              }`}
            >
              {m.value}
            </p>
            {m.sub && (
              <p className="text-white/30 text-[9px]">{m.sub}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-white/40 text-[10px]">Gesamtausgaben</span>
          <span className="text-white text-[10px] font-semibold">47 %</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-[47%] h-full bg-[#2563FF] rounded-full" />
        </div>
      </div>
      <div className="space-y-2">
        {cats.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between mb-0.5">
              <span className="text-white/60 text-[10px]">{c.name}</span>
              <span className="text-white/30 text-[9px]">
                €{c.paid} / €{c.planned}
              </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563FF]/70 rounded-full"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialTabContent() {
  const mats = [
    {
      cat: "Bodenfliese",
      name: "Kalkstein 90×90",
      status: "ok",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60",
    },
    {
      cat: "Küchenfronten",
      name: "Eiche + Cremeweiß",
      status: "pending",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60",
    },
    {
      cat: "Badfliese",
      name: "Warmgrau 60×120",
      status: "pending",
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&q=60",
    },
    {
      cat: "Terrasse",
      name: "Travertin 80×80",
      status: "ok",
      img: "https://images.unsplash.com/photo-1596436021236-89e7f79da0f0?w=200&q=60",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-[11px]">
          4 Oberflächen · 2 freigegeben
        </p>
        <span className="text-[10px] bg-[#2563FF]/20 text-[#7BA7FF] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
          ✨ KI Vorschau
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {mats.map((m) => (
          <div
            key={m.cat}
            className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
          >
            <div className="h-14 overflow-hidden">
              <img
                src={m.img}
                alt={m.cat}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-white/40 text-[9px] uppercase tracking-wider">
                {m.cat}
              </p>
              <p className="text-white text-[10px] font-semibold leading-tight">
                {m.name}
              </p>
              <span
                className={`text-[9px] font-semibold ${
                  m.status === "ok" ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {m.status === "ok" ? "✓ Freigegeben" : "⏳ Ausstehend"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FotosTabContent() {
  const photos = [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&q=60",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&q=60",
    "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=200&q=60",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=60",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=200&q=60",
  ];
  return (
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
        KW 11 · 8 Fotos · 06.05.2026
      </p>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {photos.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <p className="text-white/30 text-[10px] text-center">
        Alle Fotos im Fotoprotokoll ansehen
      </p>
    </div>
  );
}

function PortalPreviewSection() {
  const [tab, setTab] = useState<CockpitTab>("bericht");

  const tabs: { id: CockpitTab; label: string; icon: React.ReactNode }[] = [
    { id: "bericht", label: "Bericht", icon: <FileCheck className="w-3 h-3" /> },
    { id: "budget", label: "Budget", icon: <BarChart2 className="w-3 h-3" /> },
    { id: "material", label: "Material", icon: <ImageIcon className="w-3 h-3" /> },
    { id: "fotos", label: "Fotos", icon: <Camera className="w-3 h-3" /> },
  ];

  const sidebarItems = [
    { label: "Dashboard", dot: false },
    { label: "Wochenbericht", dot: tab === "bericht" },
    { label: "Materialboard", dot: tab === "material" },
    { label: "Budget", dot: tab === "budget" },
    { label: "Fotos", dot: tab === "fotos" },
    { label: "Issues", dot: false },
  ];

  return (
    <section className="py-20 bg-[#0B1F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-4">
              Das digitale Renovierungs-Cockpit
            </p>
            <h2 className="text-3xl font-bold text-white mb-5 leading-tight">
              Wie ein CEO Berichte und KPIs
              <br />
              von seinem Team bekommt.
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Jede Woche liefern wir einen strukturierten Bericht — mit
              Fortschritt, Budget, offenen Punkten und Fotos. Kein Anruf nötig.
              Kein Raten. Vollständiger Überblick von überall.
            </p>

            <div className="space-y-5 mb-8">
              {[
                {
                  icon: <FileCheck className="w-5 h-5" />,
                  title: "Wochenberichte mit KPIs",
                  text: "Fortschritt, Budget, offene Punkte — jede Woche strukturiert ins Portal.",
                },
                {
                  icon: <BarChart2 className="w-5 h-5" />,
                  title: "Live-Budget-Tracking",
                  text: "Jeder Euro dokumentiert. Prognose vs. Plan auf einen Blick.",
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Material-KI-Vorschau",
                  text: "Fliesen in Ihrem Raum visualisieren — bevor Sie bestellen.",
                },
                {
                  icon: <Camera className="w-5 h-5" />,
                  title: "Wöchentliches Foto-Protokoll",
                  text: "Baustellenfotos nach Gewerk und Woche archiviert.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#2563FF]/15 rounded-xl flex items-center justify-center text-[#2563FF] flex-shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">
                      {f.title}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-[#0B1F33] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#F4F1EA] transition-all"
            >
              Portal Demo ansehen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: App mockup */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="bg-[#06141F] border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
              </div>
              <div className="flex-1 bg-white/8 rounded-md px-3 py-1 text-white/25 text-[10px]">
                portal.tecta.cy / projekt / paphos-villa
              </div>
            </div>

            <div className="flex" style={{ minHeight: 380 }}>
              {/* Sidebar */}
              <div className="w-32 bg-[#030D15] border-r border-white/8 p-3 hidden sm:block flex-shrink-0">
                <div className="flex items-center gap-1.5 mb-5 px-1">
                  <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">T</span>
                  </div>
                  <span className="text-white text-[9px] font-bold">
                    TECTA Portal
                  </span>
                </div>
                <div className="space-y-0.5">
                  {sidebarItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${
                        item.dot
                          ? "bg-[#2563FF]/20 text-white"
                          : "text-white/30"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          item.dot ? "bg-[#2563FF]" : "bg-white/20"
                        }`}
                      />
                      <span className="text-[9px]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 min-w-0 flex flex-col">
                {/* Tab bar */}
                <div className="border-b border-white/8 px-3 pt-2.5 flex gap-0.5 overflow-x-auto">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-t-lg transition-colors whitespace-nowrap ${
                        tab === t.id
                          ? "bg-white/10 text-white"
                          : "text-white/35 hover:text-white/60"
                      }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {tab === "bericht" && <BerichtTabContent />}
                  {tab === "budget" && <BudgetTabContent />}
                  {tab === "material" && <MaterialTabContent />}
                  {tab === "fotos" && <FotosTabContent />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PersonalSection />
      <PortalPreviewSection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <WhyTECTASection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
