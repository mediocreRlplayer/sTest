"use client";

import Image from "next/image";
import React, { useState } from "react";
import Form from "./Form";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!showModal ? (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="w-fit px-5 py-2 mx-auto md:mx-0 bg-[#C63B0B] rounded-[.5rem] text-[1.3rem] text-white text-center hover:scale-105 transition-all ease-in-out duration-500"
          >
            Reserve your spot
          </button>
        </>
      ) : (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="fixed top-0 left-0 w-full h-full backdrop-blur z-[99] overflow-hidden overflow-y-scroll overscroll-contain customScrollBar"
          >
            <div className="flex justify-center items-center w-full h-full my-[3rem]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex flex-col justify-center items-center gap-5 relative w-[340px] p-5 bg-black border border-[#C6990B] rounded"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  className="absolute right-3 top-3 w-fit"
                >
                  <CloseRoundedIcon />
                </button>

                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src="/sponsorless-icon.png"
                    alt="Logo"
                    fill
                    sizes="25vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <h1 className="text-white text-center">
                  Reserve your spot now!
                </h1>

                <Form />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
