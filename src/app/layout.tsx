import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "André Luiz - Desenvolvedor Full Stack",
  description: "Portfólio de André Luiz, desenvolvedor Full Stack especializado em .NET, C#, SQL Server, JavaScript, React e React Native.",
  keywords: ["desenvolvedor", "full stack", "react", "react native", "c#", ".net", "sql server", "typescript", "portfólio"],
  authors: [{ name: "André Luiz" }],
  creator: "André Luiz",
  openGraph: {
    title: "André Luiz - Desenvolvedor Full Stack",
    description: "Portfólio de André Luiz, desenvolvedor Full Stack especializado em .NET, C#, SQL Server, JavaScript, React e React Native.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "André Luiz - Desenvolvedor Full Stack",
    description: "Portfólio de André Luiz, desenvolvedor Full Stack especializado em .NET, C#, SQL Server, JavaScript, React e React Native.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
