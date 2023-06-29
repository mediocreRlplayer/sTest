// importing next
import Image from "next/image";

// importing fonts
import { titleFont } from "../../../utils/fonts";

// importing assets
import mtnLogo from "@/assets/images/mtnopsLogo.png";
import mtnBG from "@/assets/images/mtnopsBG.png";
import npflLogo from "@/assets/images/NPFLTransparentLogo.png";
import npflBG from "@/assets/images/npflBG.png";

export default function DiscountCatalog() {
  return (
    <section className="flex flex-col w-full py-[3rem]">
      <div>
        <h2
          className={`text-[3rem] text-center uppercase ${titleFont.className}`}
        >
          Featured Partners
        </h2>
        <p className="text-[1rem] text-center">
          Being a Sponsorless member comes with an array of exclusive partner
          benefits, including:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 p-5">
        <div className="relative w-3/5 h-[300px] mx-auto z-[1]">
          <Image
            src={npflBG}
            alt="NPFL"
            fill
            sizes="100vw"
            quality={100}
            style={{ objectFit: "cover" }}
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[200px] h-[200px] z-[2]">
            <Image
              src={npflLogo}
              alt="NPFL"
              fill
              sizes="100vw"
              quality={100}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="relative w-3/5 h-[300px] mx-auto overflow-hidden">
          <Image
            src={mtnBG}
            alt="Mountain Ops"
            fill
            sizes="100vw"
            quality={100}
            style={{ objectFit: "cover" }}
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto w-[200px] h-[200px] z-[2]">
            <Image
              src={mtnLogo}
              alt="NPFL"
              fill
              sizes="100vw"
              quality={100}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
