import { titleFont, boldFont } from "@/utils/fonts";
import { foundingPerks } from "@/utils/data/perksText";
import PreviewPage from "./stripeIndex.js";

export default function Checkout() {
  let timer = Date.now();
  let date = new Date(timer.valueOf() + 1000 * 60 * 60 * 24 * 7);
  return (
    <div className="grid md:grid-cols-2 gap-5 w-full mb-5">
      {/* Left Column */}
      {/* took out this for checkout min-h-screen put back in if going back to form */}
      <div className="w-full h-full p-5">
        <div className="flex flex-col justify-center items-center">
          {/* Title */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 my-5">
            <h3
              className={`mt-1 text-[1.8rem] uppercase ${titleFont.className}`}
            >
              First 100 Founding Members
            </h3>
          </div>

          {/* Perks */}
          <ul className="flex flex-col w-full md:w-3/4 gap-2 mb-[.5rem] list-outside list-disc pl-5">
            {foundingPerks.map((perk, index) => (
              <li key={`FoundingPerk${index}x`}>
                <p>{perk}</p>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col w-full md:w-3/4 gap-2 list-outside list-disc pl-5">
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
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full h-full p-5 flex items-center">
        {/* <Form membership="founder" />  */}
        <PreviewPage />
      </div>
    </div>
  );
}
