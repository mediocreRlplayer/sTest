// importing next
import Image from "next/image";

// importing components
import BrandMarquee from "./Marquee";
import CardStack from "@/components/Home/CardStack";

// importing fonts
import { titleFont } from "@/utils/fonts";

// importing assets
import Modal from "./Modal";

export default function Hero() {
  return (
    <section className="flex justify-center w-full md:min-h-screen py-[5rem] md:py-[2rem] bg-black text-white">
      <div className="flex flex-col justify-center items-center w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-3">
          {/* text-box */}
          <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-3/5 h-fit">
            <h1
              className={`text-[2.3rem] lg:text-[3.5rem] uppercase ${titleFont.className}`}
            >
              Building the world's
            </h1>
            <h1
              className={`text-[2.3rem] lg:text-[3.5rem] uppercase ${titleFont.className}`}
            >
              <span className="text-[#C6990B]">greatest</span> outdoor
            </h1>
            <h1
              className={`text-[2.3rem] lg:text-[3.5rem] uppercase ${titleFont.className}`}
            >
              community
            </h1>
            <p className="w-full md:w-5/6 text-[1.2rem] md:text-[1.3rem]">
              A collective of people and brands united by our love of the
              outdoors and committed to improving our world
            </p>

            <div className="flex justify-center md:justify-start w-full md:w-5/6 my-5">
              <Modal />
            </div>
          </div>

          {/* card-box */}
          <div className="hidden md:block relative w-[330px] h-[250px] mx-auto md:mx-0 lg:scale-100 xl:scale-125 transition-all ease-in-out duration-500">
            <CardStack />
          </div>
        </div>

        {/* <BrandMarquee /> */}
      </div>
    </section>
  );
}
