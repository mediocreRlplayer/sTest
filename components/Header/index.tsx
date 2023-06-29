import Image from "next/image";
import Link from "next/link";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Mobile from "./Mobile";
import { createKey } from "@/utils/helpers";

const navLinks = [
  // {
  //   name: "Become a Member",
  //   link: "/#memberships",
  // },
  // {
  //   name: "The Roadmap",
  //   link: "/#roadmap",
  // },
  {
    name: "Merch",
    link: "https://shop.sponsorless.com/",
    target: "_blank",
  },
];

export default function Header() {
  return (
    <header className="flex justify-center w-full h-fit bg-black">
      <div className="flex justify-between items-center w-full min-h-[100px] max-w-screen-xl">
        {/* Logo / Home Link */}
        <Link href={"/"} className="flex w-fit h-full">
          <div className="relative w-[50px] h-full">
            <Image
              src="/sponsorless-icon.png"
              alt="Logo"
              fill
              sizes="25vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="hidden md:block relative w-[250px] h-full">
            <Image
              src="/sponsorless-white.png"
              alt="Logo Text"
              fill
              sizes="40vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Nav Links Desktop */}
        <div className="hidden md:flex justify-between gap-3 mr-3">
          {navLinks.map((link) => (
            <Link
              href={link.link}
              key={link.name + createKey(5)}
              target={link?.target}
              className="w-[150px] py-1 bg-[#C63B0B] rounded-[.5rem] text-white text-center"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Nav Links Mobile */}
        <div className="flex md:hidden">
          <Mobile links={navLinks} />
        </div>
      </div>
    </header>
  );
}
