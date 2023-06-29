// importing next / react libraries
import Image from "next/image";
import Marquee from "react-fast-marquee";

// importing helpers
import { createKey } from "@/utils/helpers";

// importing logos
import cabelas from "@/assets/images/marquee/Cabelas-Logo.svg";
import bassPro from "@/assets/images/marquee/BPS-Logo.svg";
import brcc from "@/assets/images/marquee/BRCC-Logo.svg";
import mtnOps from "@/assets/images/marquee/MTNOPS-Logo.svg";
import traeger from "@/assets/images/marquee/TRAEGER-Logo.svg";
import wwp from "@/assets/images/marquee/WWP-Logo.svg";

const logos = [
  {
    name: "Cabelas",
    image: cabelas,
    width: "200px",
  },
  {
    name: "Bass Pro Shops",
    image: bassPro,
    width: "88px",
  },
  {
    name: "Black Rifle Coffee",
    image: brcc,
    width: "88px",
  },
  {
    name: "MTN OPS",
    image: mtnOps,
    width: "88px",
  },
  {
    name: "Traeger",
    image: traeger,
    width: "200px",
  },
  {
    name: "Wounded Warrior Project",
    image: wwp,
    width: "88px",
  },
];

export default function BrandMarquee() {
  return (
    <div className="flex gap-5 w-full h-[100px] mt-[2rem]">
      <Marquee
        speed={30} // Pixels per second
        gradient={true} // Boolean - adds a gradient to the edge of the content
        gradientColor={[0, 0, 0]} // Array of r, g, b values, expects an array of 3 values
        gradientWidth={100} // Pixel width of the gradient effect on both sides
        direction="left" // "left" or "right"
        className="flex items-center w-full h-full"
      >
        {logos.map((logo) => (
          <div
            key={createKey(5)}
            className={`flex items-center justify-center relative w-fit mx-[2rem]`}
          >
            <Image
              src={logo.image}
              alt={logo.name}
              height={88}
              sizes="50vw"
              quality={100}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
