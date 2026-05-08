"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      const storedUser = localStorage.getItem("tecta_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        router.push(user.role === "admin" ? "/admin" : "/portal");
      }
    } else {
      setError("Invalid email or password. Use client@example.com or admin@tecta.cy");
    }
  };

  const quickLogin = async (role: "client" | "admin") => {
    const email = role === "admin" ? "admin@tecta.cy" : "client@example.com";
    const success = await login(email, "demo");
    if (success) {
      router.push(role === "admin" ? "/admin" : "/portal");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-[#0B1F33] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <span className="font-bold text-[#0B1F33] text-base">TECTA</span>
              <span className="text-[#2563FF] font-semibold text-base ml-1">Renovision</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Welcome back</h1>
          <p className="text-[#667085] text-sm mt-1">Sign in to your owner portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-8 shadow-sm">
          {/* Demo credentials */}
          <div className="bg-[#EEF2FF] rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-[#2563FF] uppercase tracking-wider mb-2">Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin("client")}
                className="text-xs bg-white border border-[#C7D2FE] rounded-lg px-3 py-2 text-[#2563FF] font-medium hover:bg-[#EEF2FF] transition-colors"
              >
                Login as Client
              </button>
              <button
                onClick={() => quickLogin("admin")}
                className="text-xs bg-[#2563FF] rounded-lg px-3 py-2 text-white font-medium hover:bg-[#1D50D4] transition-colors"
              >
                Login as Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#1F2937]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-[#C64B4B] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#C64B4B]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563FF] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1D50D4] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In to Portal
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-[#667085] text-sm">
            Not a client yet?{" "}
            <Link href="/#start" className="text-[#2563FF] font-semibold hover:underline">
              Request a consultation
            </Link>
          </p>
          <Link href="/" className="text-[#667085] text-xs mt-3 inline-block hover:text-[#1F2937]">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
