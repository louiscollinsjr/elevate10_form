import type { Metadata } from "next";
import { Roboto, Lato, Noto_Sans_JP, Oi } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const oi = Oi({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oi',
});

export const metadata: Metadata = {
  title: "Introducing Elevate10+ by atem.",
  description: "Start your web design project by filling out our startup form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${lato.variable} ${notoSansJP.variable} ${oi.variable} font-sans antialiased bg-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
