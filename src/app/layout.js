import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const siteUrl = "https://exploring-space.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "Exploring Space",

  title: {
    default: "Exploring Space — Andrea Castellazzo",
    template: "%s | Exploring Space",
  },

  description:
    "Exploring Space è il portfolio di Andrea Castellazzo: visual designer, fotografo, videomaker e 3D artist. Render 3D, animazioni, fotografia, video, visual design e contenuti per raccontare progetti complessi con immagini più chiare, forti e memorabili.",

  keywords: [
    "Andrea Castellazzo",
    "Exploring Space",
    "visual designer Brescia",
    "graphic designer Brescia",
    "fotografo Brescia",
    "videomaker Brescia",
    "3D artist",
    "render 3D",
    "animazione 3D",
    "visualizzazione 3D",
    "fotografia",
    "videomaking",
    "branding",
    "comunicazione visiva",
    "portfolio creativo",
    "Artemis II",
    "animazioni astronomiche",
    "visual storytelling",
    "contenuti digitali",
    "presentazioni visive",
  ],

  authors: [
    {
      name: "Andrea Castellazzo",
      url: siteUrl,
    },
  ],

  creator: "Andrea Castellazzo",
  publisher: "Andrea Castellazzo",

  icons: {
    icon: [
      {
        url: "/images/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/images/favicon/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
      },
    ],
  },

  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Exploring Space",
    title: "Exploring Space — Andrea Castellazzo",
    description:
      "Visual design, fotografia, video e 3D per raccontare progetti complessi con immagini più chiare, forti e memorabili.",
    images: [
      {
        url: "/images/og/exploring-space-og.jpg",
        width: 1200,
        height: 630,
        alt: "Exploring Space — Andrea Castellazzo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Exploring Space — Andrea Castellazzo",
    description:
      "Visual design, fotografia, video e 3D per raccontare progetti complessi con immagini più chiare, forti e memorabili.",
    images: ["/images/og/exploring-space-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  category: "portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#11100d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="it"
      className="bg-[#11100d] scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] text-[#e8e3d6] antialiased [text-size-adjust:100%] selection:bg-[#e8e3d6] selection:text-[#11100d]">
        <div className="pointer-events-none fixed left-0 top-0 z-30 h-[calc(4.5rem+env(safe-area-inset-top))] w-full bg-gradient-to-b from-[#11100d] via-[#11100d]/76 to-transparent md:h-[calc(5.5rem+env(safe-area-inset-top))]" />

        <div className="pointer-events-none fixed bottom-0 left-0 z-30 hidden h-[calc(5.5rem+env(safe-area-inset-bottom))] w-full bg-gradient-to-t from-[#11100d] via-[#11100d]/70 to-transparent md:block" />

        <SiteHeader />

        <div className="relative z-10">{children}</div>

        <SiteFooter />

        <Analytics />
      </body>
    </html>
  );
}