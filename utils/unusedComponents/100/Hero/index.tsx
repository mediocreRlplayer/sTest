"use client";

// importing next
import Image from "next/image";
import Link from "next/link";

// importing helpers / fonts
import { titleFont } from "../../../utils/fonts";

// importing components
import Form from "./Form";
import Checkout from "../checkout";

// importing assets
import FCard from "../../../assets/images/FCard.svg";
import GCard from "../../../assets/images/GCard.svg";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center w-full py-[2rem] bg-black text-white">
      <div className="flex flex-col w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row flex-wrap justify-between w-full px-3">
          {/* text-box */}
          <div className="w-full md:w-1/2 py-[3rem]">
            <h1
              className={`w-full text-[2.3rem] lg:text-[3.5rem] text-center uppercase ${titleFont.className}`}
            >
              Reserve your
            </h1>

            <h2
              className={`w-full text-[2.3rem] lg:text-[3.5rem] text-center uppercase ${titleFont.className}`}
            >
              Sponsorless
            </h2>

            <h3
              className={`w-full text-[2.3rem] lg:text-[3.5rem] text-center uppercase ${titleFont.className}`}
            >
              <span className="text-[#C6990B]">Founders Pass</span>
            </h3>
            <p className="w-full md:w-5/6 mx-auto text-[1rem] md:text-[1.1rem] text-center">
              Only 100 Limited Edition passes.
            </p>
          </div>

          {/* card-box */}
          <div className="relative w-[350px] h-[300px] my-[2rem] mx-auto">
            {/* Front Angled Card */}
            <div className="absolute top-[5rem] left-[1rem] w-[300px] h-[180px] rotate-[-15deg] z-[3]">
              <Image
                src={FCard}
                alt="Founding Card"
                fill
                sizes="50vw"
                quality={100}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Back Angled Card */}
            <div className="absolute top-[5rem] left-[1rem] w-[300px] h-[180px] rotate-[15deg] z-[2]">
              <Image
                src={GCard}
                alt="Founding Card"
                fill
                sizes="50vw"
                quality={100}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Sign up form */}
          {/* <Form /> */}

          {/* Checkout  */}
          <Checkout />

          {/* text-box */}
          <div className="w-full md:w-1/2 py-[3rem] mx-auto">
            <h2
              className={`w-full text-[2.3rem] lg:text-[3.5rem] text-center uppercase ${titleFont.className}`}
            >
              GREATER
            </h2>

            <h3
              className={`w-full text-[2.3rem] lg:text-[3.5rem] text-center uppercase ${titleFont.className}`}
            >
              <span className="text-[#C6990B]">TOGETHER</span>
            </h3>
            <p className="w-full md:w-5/6 mx-auto text-[1rem] md:text-[1.1rem] text-center">
              Sign up now for a huge discount...
            </p>

            <p className="w-full md:w-5/6 mx-auto mt-[2rem] text-[.9rem] md:text-[.8rem] text-center">
              *Disclaimer: Membership to the sponsorless platform does not
              constitute an investment or equity interest. It is important to
              note that the sponsorless platform does not provide financial,
              investment, or legal advice, and any decisions made based on the
              information provided are at your own risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
