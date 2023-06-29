// importing next
import Image from "next/image";
import Link from "next/link";

// importing helpers / fonts
import { createKey } from "@/utils/helpers";
import { titleFont } from "@/utils/fonts";

// importing assets
import discord from "@/assets/images/social/Discord.png";
import twitter from "@/assets/images/social/Twitter.png";
import insta from "@/assets/images/social/Instagram.png";
import linkedin from "@/assets/images/social/LinkedIn.png";
import facebook from "@/assets/images/social/Facebook.png";
import boat from "@/assets/images/BWBoat.png";
import Subsribe from "./Subscribe";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Merch",
    link: "https://shop.sponsorless.com/",
    target: "_blank",
  },
  // {
  //   name: "Become a Member",
  //   link: "/#memberships",
  // },
  {
    name: "The Roadmap",
    link: "/#roadmap",
  },
];

const legalLinks = [
  {
    name: "Terms of Service",
    link: "/termsofservice",
  },
  {
    name: "Terms of Sale",
    link: "/termsofsale",
  },
  {
    name: "Privacy Policy",
    link: "/privacypolicy",
  },
];

const socials = [
  // {
  //   name: "Discord",
  //   icon: discord,
  //   // link: "https://discord.gg/8Q6QZs2M",
  // },
  {
    name: "Twitter",
    icon: twitter,
    link: "https://twitter.com/sponsorless_",
  },
  {
    name: "Instagram",
    icon: insta,
    link: "https://www.instagram.com/sponsorless.official/",
  },
  // {
  //   name: "Linkedin",
  //   icon: linkedin,
  //   // link: "https://www.linkedin.com/company/sponsorless",
  // },
  {
    name: "Facebook",
    icon: facebook,
    link: "https://www.facebook.com/sponsorless.official",
  },
];

export default function Footer() {
  return (
    <footer className="w-full py-2 bg-black text-white">
      {/* Subscribe box */}
      <div className="max-w-screen-xl h-[450px] md:h-[300px] mx-auto px-5 mt-[3rem]">
        <div className="relative w-full h-full bg-[#C6990B] rounded-[1rem] overflow-hidden z-[1]">
          <Image
            src={boat}
            alt="Boat"
            fill
            sizes="100vw"
            quality={100}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 4,
            }}
          />

          <div className="absolute top-[21rem] md:top-[18rem] lg:top-[22rem] left-[-10rem] w-[150vw] h-[400px] bg-[#C63B0B] rotate-[25deg] md:rotate-[18deg] z-[2]" />
          <div className="absolute top-[21rem] md:top-[18rem] lg:top-[22rem] right-[-10rem] w-[150vw] h-[400px] bg-[#E2E0DF] rotate-[-25deg] md:rotate-[-18deg] z-[3]" />

          <div className="flex flex-col justify-center items-center w-full h-full px-3 relative z-[4]">
            <h2
              className={`text-[2rem] text-center uppercase ${titleFont.className}`}
            >
              Stay up to date with the outdoorsmen
            </h2>
            <p className="text-[1.2rem] text-center">
              Get the latest from Sponsorless when you subscribe to our
              newsletter.
            </p>

          <Subsribe />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mx-auto my-[3rem] px-5 text-[#535353]">
        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-5 text-[1.3rem]">
          {navLinks.map((link) => (
            <Link
            href={link.link}
            target={link?.target}
            key={createKey(5)}
            className="hover:text-white transition-colors ease-in-out duration-500"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Terms */}
        <div className="flex flex-col justify-center items-center gap-1 text-[1.3rem]">
          {legalLinks.map((link) => (
            <Link
            href={link.link}
            key={createKey(5)}
            className="hover:text-white transition-colors ease-in-out duration-500"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="flex justify-center items-center gap-[2rem] my-[1rem]">
          {socials.map((social) => (
            <Link
            href={social.link}
            target="_blank"
            key={createKey(5)}
            className="hover:scale-110 transition-all ease-in-out duration-500"
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={38}
                height={38}
              />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[1.5rem] text-center">
          © 2023 Sponsorless, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
