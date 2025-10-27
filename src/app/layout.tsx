import Script from 'next/script';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ChannelPopup from "@/components/ChannelPopup";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "O/L Countdown 2026",
  description: "Countdown to the 2026 O/L Examination",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="O/L Countdown" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        {/* OneSignal SDK for push notifications */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
              OneSignal.init({
                appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
                allowLocalhostAsSecureOrigin: true
              });
            });
          `
        }} />

        {/* Plausible Analytics */}
        <Script
          strategy="afterInteractive"
          async
          src="https://plausible.io/js/pa-4nM6S3t7S13uJeL0NcJOs.js"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function(){(plausible.q = plausible.q || []).push(arguments)};
            plausible.init = plausible.init || function(i){plausible.o = i || {}};
            plausible.init();
          `}
        </Script>

        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-KCSLNETY6M`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KCSLNETY6M', {
              page_path: window.location.pathname
            });
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        {children}
        <ChannelPopup />
      </body>
    </html>
  );
}