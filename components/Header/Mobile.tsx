"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { createKey } from "@/utils/helpers";

interface Link {
  name: string;
  link: string;
  target?: string;
}

interface props {
  links: Link[];
}

export default function Mobile({ links }: props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowMenu(true)}
        aria-label="Mobile Menu"
        className="px-3 text-white"
      >
        <MenuRoundedIcon className="w-[40px] h-[40px]" />
      </button>

      {showMenu && (
        <>
          <div
            onClick={() => setShowMenu(false)}
            className="fixed top-0 left-0 w-full h-full backdrop-blur z-[99]"
          >
            <div className="flex flex-col items-center w-full h-full pt-[3rem]">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col justify-center items-center gap-5 relative w-[340px] px-5 py-[3rem] bg-black border border-[#C6990B] rounded"
              >
                <button
                  onClick={() => setShowMenu(false)}
                  className="absolute top-3 right-3 text-white"
                >
                  <CloseRoundedIcon className="w-[40px] h-[40px]" />
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

                <h3 className="mb-[3rem] text-[2rem] text-white text-center">
                  Menu
                </h3>

                {links.map((link) => (
                  <Link
                    href={link.link}
                    key={link.name + createKey(5)}
                    target={link?.target}
                    className="w-[150px] py-1 my-[1rem] bg-[#C63B0B] rounded-[.5rem] text-white text-center"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
