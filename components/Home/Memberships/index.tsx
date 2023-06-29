// importing next
import Image from "next/image";

// importing helpers / fonts
import { titleFont, boldFont } from "@/utils/fonts";
import { goldPerks, crimsonPerks } from "@/utils/data/perksText";

// importing components
import BuyButton from "./BuyButton";

// importing assets
import CCard from "@/assets/images/CCard.svg";
import GCard from "@/assets/images/GCard.svg";

export default function Memberships() {
  return (
    <section id="memberships" className="flex flex-col py-[3rem] px-3">
      <h2
        className={`text-[2rem] md:text-[3rem] text-center uppercase ${titleFont.className}`}
      >
        Limited Time Offer:
      </h2>
      <h3
        className={`pb-[3rem] text-[2rem] md:text-[3rem] text-center uppercase ${titleFont.className}`}
      >
        Become a <span className="text-[#C6990B]">member</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl px-5 md:px-[4rem] py-[2rem] border-4 border-black">
        {/* Left column */}
        <div className="flex flex-col">
          {/* Card */}
          <div className="relative w-[300px] h-[180px] mx-auto md:mx-0">
            <Image
              src={GCard}
              alt="Gold Card"
              fill
              sizes="50vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Title */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 my-5">
            <h3
              className={`mt-1 text-[1.8rem] uppercase ${titleFont.className}`}
            >
              Gold Member
            </h3>
          </div>

          {/* Perks */}
          <ul className="flex flex-col w-3/4 gap-2 mb-[.5rem] list-outside list-disc pl-5">
            {goldPerks.map((perk, index) => (
              <li key={`FoundingPerk${index}`}>
                <p>{perk}</p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2 list-outside list-disc pl-5">
            <li>
              <p className={`${boldFont.className} uppercase`}>
                Limited Number Available
              </p>
            </li>
            <li>
              <p className={boldFont.className}>
                $5,000+/yr Value for only $1500/Lifetime
              </p>
            </li>
          </ul>

          <div className="flex justify-start mt-[2rem]">
            <BuyButton membership="gold" />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col mt-[3rem] md:mt-0">
          {/* Card */}
          <div className="relative w-[300px] h-[180px] mx-auto md:mx-0">
            <Image
              src={CCard}
              alt="Crimson Card"
              fill
              sizes="50vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Title */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 my-5">
            <h3
              className={`mt-1 text-[1.8rem] uppercase ${titleFont.className}`}
            >
              Crimson Member
            </h3>
            {/* <BuyButton membership="crimson" /> */}
          </div>

          {/* Perks */}
          <ul className="flex flex-col w-3/4 gap-2 mb-[.5rem] list-outside list-disc pl-5">
            {crimsonPerks.map((perk, index) => (
              <li key={`GoldPerk${index}`}>{perk}</li>
            ))}
          </ul>

          <div className="bg-purple-500">Sign up</div>
        </div>
      </div>
    </section>
  );
}
