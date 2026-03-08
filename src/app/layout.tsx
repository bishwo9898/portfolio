import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-context";
import { ThemeSwitcher } from "./theme-switcher";
import { LampToggle } from "./lamp-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Theme-specific fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Computer Science Student",
  description:
    "Portfolio website showcasing projects, skills, and experience in software development and computer science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LampToggle />
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
