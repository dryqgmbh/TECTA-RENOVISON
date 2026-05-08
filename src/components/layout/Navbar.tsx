"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Vision Tool", href: "/vision" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Services", href: "/#pricing" },
  { label: "How It Works", href: "/#method" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isPortal =
    pathname.startsWith("/portal") || pathname.startsWith("/admin");

  if (isPortal) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0B1F33] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs tracking-wider">T</span>
          </div>
          <div>
            <span className="font-bold text-[#0B1F33] text-sm tracking-wide">
              TECTA
            </span>
            <span className="text-[#2563FF] font-semibold text-sm tracking-wide ml-1">
              Renovision
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1F2937] text-sm font-medium hover:text-[#2563FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-[#1F2937] hover:text-[#2563FF] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#0B1F33] flex items-center justify-center text-white text-xs font-semibold">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name.split(" ")[0]}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-1">
                  <Link
                    href={user.role === "admin" ? "/admin" : "/portal"}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1F2937] hover:bg-stone-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {user.role === "admin" ? "Admin Portal" : "My Portal"}
                  </Link>
                  <Link
                    href="/portal/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1F2937] hover:bg-stone-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <hr className="my-1 border-stone-100" />
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#C64B4B] hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#1F2937] hover:text-[#2563FF] transition-colors"
              >
                Client Login
              </Link>
              <Link
                href="/#start"
                className="bg-[#2563FF] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1D50D4] transition-colors"
              >
                Start Property Review
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-[#1F2937]" />
          ) : (
            <Menu className="w-5 h-5 text-[#1F2937]" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 py-4 px-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-[#1F2937] hover:text-[#2563FF] py-1.5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-stone-100" />
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/portal"}
                className="block text-sm font-semibold text-[#1F2937] py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                My Portal
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="text-sm font-semibold text-[#C64B4B] py-1.5"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-sm font-semibold text-[#1F2937] py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                Client Login
              </Link>
              <Link
                href="/#start"
                className="block bg-[#2563FF] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                Start Property Review
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
