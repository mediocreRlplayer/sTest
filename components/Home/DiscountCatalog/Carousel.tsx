"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// importing helpers
import { createKey } from "@/utils/helpers";

// importing assets
import bpsLogo from "../../assets/images/carousel/BassProShopsLogo.svg";
import cabLogo from "../../assets/images/carousel/CabelasLogo.svg";
import mtnLogo from "../../assets/images/carousel/MTNOPSLogo.svg";
import backArrow from "../../assets/images/BackArrow.png";
import nextArrow from "../../assets/images/ForwardArrow.png";

const cardData = [
  {
    title: "Bass Pro Shops",
    text: "10% off any order made at BassPro.com",
    image: bpsLogo,
  },
  {
    title: "MTN OPS",
    text: "50% off your entire order, three (3) coupons per year.",
    image: mtnLogo,
  },
  {
    title: "Cabela's",
    text: "15% off any order made at Cabelas.com",
    image: cabLogo,
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goToPrevious = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  return (
    <div className="flex relative w-full max-w-screen-xl mx-auto py-[3rem] px-[55px]">
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-0 bottom-0 h-fit my-auto z-[3]"
      >
        <Image src={backArrow} alt="Back Arrow" width={50} height={50} />
      </button>
      {cardData.map((card, index) => (
        <div
          key={createKey(5)}
          className={`flex flex-col justify-center items-center w-[270px] md:w-[360px] h-[500px] mx-auto bg-white border-2 border-black transition-all duration-500 ${
            index === activeIndex
              ? "scale-100 order-2 z-[2] absolute left-0 right-0 mx-auto"
              : "scale-75 z-[1]"
          }`}
        >
          <div>
            <Image src={card.image} alt={card.title} width={200} height={200} />
          </div>
          <p className="w-3/4 text-center">{card.text}</p>
        </div>
      ))}
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 bottom-0 h-fit my-auto z-[3]"
      >
        <Image src={nextArrow} alt="Next Arrow" width={50} height={50} />
      </button>
    </div>
  );
}
