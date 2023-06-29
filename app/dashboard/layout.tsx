import { baseFont } from "@/utils/fonts";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main
        className={`flex flex-col items-center min-h-screen ${baseFont.className} scroll-smooth`}
      >
        <Header />
        {children}
        <Footer />
      </main>
    </body>
  );
}
