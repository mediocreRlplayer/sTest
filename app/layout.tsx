import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

export const metadata = {
  title: "Sponsorless - Building the world's greatest outdoor community",
  description:
    "A community united by our love for the outdoors, sharing that passion with others, and making the most of each day of life we are given.",
  keywords: [
    "sponsorless",
    "sponsorless outdoors",
    "sponsorless outdoors community",
    "sponsorless community",
    "sponsorless outdoor community",
    "sponsorless outdoor",
    "sponsorless outdoor community",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sponsorless.com",
    title: "Sponsorless - Building the world's greatest outdoor community",
    description:
      "A community united by our love for the outdoors, sharing that passion with others, and making the most of each day of life we are given.",
    images: [
      {
        url: "https://sponsorless.com/sponsorless-black.png",
        width: 1200,
        height: 630,
        alt: "Sponsorless - Building the world's greatest outdoor community",
      },
    ],
    siteName: "Sponsorless",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={googleAnalyticsId} />
      <body>{children}</body>
    </html>
  );
}
