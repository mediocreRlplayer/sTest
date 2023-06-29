// importing next
import Image from "next/image";

// importing fonts
import { titleFont } from "../../../utils/fonts";

// importing assets
import brands from "@/assets/images/roadmap/Modern_Orange_Outline_Mobile_Marketplace_Logo1.png";
import controller from "@/assets/images/roadmap/controller.svg";
import network from "@/assets/images/roadmap/network.svg";
import upwardGraph from "@/assets/images/roadmap/upwardGraph.svg";
import sponsorship from "@/assets/images/roadmap/sponsorship.svg";
import affiliate from "@/assets/images/roadmap/affiliate.svg";
import boat from "@/assets/images/SponsorlessBoat.png";
import CardStack from "@/components/Home/CardStack";
import { createKey } from "@/utils/helpers";

const timelineData = [
  {
    title: "Lifetime Membership",
    subTitle: "Launch",
    text: "",
    dateText: "",
    dateSubText: "Coming soon...",
    image: "CardStack",
    imageSide: false, // true = left, false = right
  },
  {
    title: "Proshop",
    subTitle: "Marketplace",
    text: "Upon launch Sponsorless marketplace will be a constantly growing hub of your favorite brands, services, and opportunities.",
    dateText: "",
    image: brands,
    imageSide: true,
  },
  {
    title: "Brand Builder",
    subTitle: "Program",
    text: "Members will be able to opt-in to our partner program to be able to promote, sell, and earn commissions from a variety of top brands.",
    dateText: "",
    image: affiliate,
    imageSide: false,
  },
  {
    title: "Athlete Accelerator Program",
    subTitle: "To promote your business",
    text: "Learn from top marketing professionals, brand owners, and athletes on how to turn your passion into a business.",
    dateText: "",
    image: upwardGraph,
    imageSide: true,
  },
  {
    title: "In person events",
    subTitle: "Networking & Partnerships",
    text: "We will be partnering with top brands and organizations to provide IRL benefits to Sponsorless members. We will also be organizing a massive outing during 2023, with plans for many more.",
    dateText: "",
    image: network,
    imageSide: false,
  },
  {
    title: "Sponsorship",
    subTitle: "Opportunities",
    text: "Connecting athletes and enthusiast with brands and innovative ways to earn money doing what you love.",
    dateText: "",
    image: sponsorship,
    imageSide: true,
  },
  {
    title: "Exclusive",
    subTitle: "Giveaways",
    text: "Wanna win a Sponsorless custom boat? Get your entry fees paid for? Or win cool products from your favorite brands? These are all part of our long term plans.",
    dateText: "",
    image: boat,
    imageSide: false,
  },
  {
    title: "Interactive",
    subTitle: "Gamification platform",
    text: "Immersive interactive experiences with brands, and athletes. Reward systems such as points, badges, prizes, and giveaways.",
    dateText: "",
    image: controller,
    imageSide: true,
  },
];

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="flex flex-col w-full min-h-[200vh] px-3 py-5 bg-black text-white"
    >
      {/* Sponsorless Logos */}
      <div className="flex justify-center items-center w-fit mx-auto max-w-screen-xl h-[70px] md:h-[130px]">
        <div className="relative w-[50px] md:w-[100px] h-full">
          <Image
            src="/sponsorless-icon.png"
            alt="Logo"
            fill
            sizes="25vw"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="relative w-[250px] md:w-[450px] h-full">
          <Image
            src="/sponsorless-white.png"
            alt="Logo Text"
            fill
            sizes="40vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Title */}
      <h2
        className={`mb-[3rem] text-[2rem] text-[#C6990B] text-center uppercase ${titleFont.className}`}
      >
        Product Roadmap
      </h2>
      <p className="text-center">*Estimated Timeline</p>

      <div className="flex flex-col w-full px-3 mx-auto max-w-screen-xl">
        {timelineData.map((item, index) => (
          <div key={createKey(7)} className="flex flex-col md:flex-row">
            {/* Image container */}
            <div
              className={`flex justify-center items-center w-full md:w-1/2 pt-[3rem] first:pt-0 border-l-2 border-white ${
                item.imageSide ? "md:border-l-0" : "md:order-2"
              } `}
            >
              <div className="relative w-[300px] h-[300px] my-[2rem]">
                {item.image === "CardStack" ? (
                  <CardStack />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title + " Image"}
                    fill
                    sizes="40vw"
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </div>

            <div className="flex md:hidden h-[2rem] border-t-2 border-l-2 border-white w-[2rem]" />

            {/* Text container */}
            <div
              key={index}
              className={`flex flex-col justify-center items-center relative w-full md:w-1/2 pb-[3rem] border-l-2 border-white ${
                item.imageSide ? "md:order-1" : "md:border-l-0"
              } `}
            >
              <h3
                className={`px-3 text-[1.8rem] text-center uppercase ${titleFont.className}`}
              >
                {item.title}
              </h3>
              <h4
                className={`px-3 text-[1.8rem] text-[#C6990B] text-center uppercase ${titleFont.className}`}
              >
                {item.subTitle}
              </h4>

              <div
                className={`hidden md:block absolute border-t-2 border-white w-[1rem] ${
                  item.imageSide ? "left-0" : "right-0"
                }`}
              />
              <p className="px-5 mb-5 text-center">{item.text}</p>
              <p className="px-5 text-center">{item.dateSubText}</p>
              <h5
                className={`px-3 text-[1.8rem] text-center uppercase ${titleFont.className}`}
              >
                {item.dateText}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

