import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "TECTA Renovision — Premium Renovation Intelligence for Cyprus Properties",
  description:
    "German building mindset in the Mediterranean. Owner-side renovation planning, AI-supported vision, material boards, budget control and weekly site reports for Cyprus properties.",
  keywords:
    "Cyprus renovation, property renovation Cyprus, renovation management, owner-side project control, villa renovation Cyprus, Paphos renovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
