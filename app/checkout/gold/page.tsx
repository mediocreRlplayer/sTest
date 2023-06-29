// importing helpers / fonts
import { titleFont, boldFont } from "@/utils/fonts";
import { goldPerks } from "@/utils/data/perksText";

// importing components
import Form from "@/components/Checkout/Form";

export default function Gold() {
  return (
    <div className="max-w-screen-xl">
      <div className="grid md:grid-cols-2 gap-5 w-full mb-5">
        {/* Left Column */}
        <div className="flex items-center w-full h-full min-h-[80vh] p-5">
          <div className="flex flex-col justify-center items-center">
            {/* Title */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 my-5">
              <h3
                className={`mt-1 text-[1.8rem] uppercase ${titleFont.className}`}
              >
                Gold Member
              </h3>
            </div>

            {/* Perks */}
            <ul className="flex flex-col w-full md:w-3/4 gap-2 mb-[.5rem] list-outside list-disc pl-5">
              {goldPerks.map((perk, index) => (
                <li key={`FoundingPerk${index}`}>
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
                  $1,500+/yr Value for only $300/Lifetime
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full h-full p-5">
          <Form membership="gold" />
        </div>
      </div>
    </div>
  );
}
