import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <div>
                <span className="font-bold text-white text-sm">TECTA</span>
                <span className="text-[#2563FF] font-semibold text-sm ml-1">
                  Renovision
                </span>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              German building mindset in the Mediterranean.
            </p>
            <p className="text-white/40 text-xs mt-3">
              Owner-side renovation planning and project control for Cyprus properties.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {[
                ["Vision & Budget", "/vision"],
                ["Managed Renovation", "/#pricing"],
                ["Remote Owner Control", "/#pricing"],
                ["Material Boards", "/#method"],
                ["Weekly Reports", "/#method"],
                ["Contractor Management", "/#method"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Platform
            </p>
            <ul className="space-y-2.5">
              {[
                ["AI Vision Tool", "/vision"],
                ["Client Portal", "/portal"],
                ["Weekly Reports", "/portal"],
                ["Issue Tracker", "/portal"],
                ["Document Center", "/portal"],
                ["Budget Tracker", "/portal"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Cyprus — Paphos & Limassol</li>
              <li>
                <a
                  href="mailto:hello@tecta.cy"
                  className="hover:text-white transition-colors"
                >
                  hello@tecta.cy
                </a>
              </li>
              <li>
                <a
                  href="tel:+35725000000"
                  className="hover:text-white transition-colors"
                >
                  +357 25 000 000
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                TECTA Group
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                TECTA Renovision — Renovation Planning & Control
                <br />
                TECTA Inspect — Technical Property Surveys
              </p>
            </div>
          </div>
        </div>

        <hr className="border-white/10 my-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-white/35 text-xs leading-relaxed max-w-2xl">
            AI visuals are concept previews and not construction drawings. Budget bands are planning estimates, not fixed contractor quotes. Technical inspections are performed only by TECTA Inspect if commissioned separately. TECTA Renovision is not a general contractor. Executing contractors remain responsible for their own work.
          </p>
          <p className="text-white/30 text-xs whitespace-nowrap">
            © 2026 TECTA Renovision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
