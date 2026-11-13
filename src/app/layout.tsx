import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { LetterFooter } from "@/components/letter-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#fdf3e7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={site.language} className={newsreader.variable}>
      <body>
        <div className="letter">
          <SiteHeader name={site.name} />
          <main>{children}</main>
          <LetterFooter />
        </div>
      </body>
    </html>
  );
}
