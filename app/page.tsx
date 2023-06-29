// importing fonts
import { baseFont } from "@/utils/fonts";

// importing components
import Header from "@/components/Header";
import Hero from "@/components/Home/Hero";
import Memberships from "@/components/Home/Memberships";
// import DiscountCatalog from "@/components/Home/DiscountCatalog";
import Roadmap from "@/components/Home/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center min-h-screen ${baseFont.className} scroll-smooth`}
    >
      <Header />
      <Hero />
      <Memberships />
      {/* <DiscountCatalog /> */}
      <Roadmap />
      <Footer />
    </main>
  );
}
