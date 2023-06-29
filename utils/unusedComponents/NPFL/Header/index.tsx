import Image from "next/image";
import Link from "next/link";

import npflLogo from "../../../assets/images/NPFLTransparentLogo.png";

export default function Header() {
  return (
    <header className="flex flex-col justify-center w-full min-h-[5vh] p-5 bg-black text-white">
      <div className="flex flex-col md:flex-row justify-around items-center w-full h-fit max-w-screen-xl mx-auto">
        {/* Logo / Home Link */}
        <Link href={"/npfl"} className="flex flex-col w-fit h-full">
          <div className="flex">
            <div className="relative w-[100px] h-[100px] mx-auto">
              <Image
                src="/sponsorless-icon.png"
                alt="Sponsorless Logo"
                fill
                sizes="25vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative w-[100px] h-[100px] mx-auto">
              <Image
                src={npflLogo}
                alt="NPFL Logo"
                fill
                sizes="25vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="relative w-[300px] md:w-[400px] h-[100px]">
            <Image
              src="/sponsorless-white.png"
              alt="Logo Text"
              fill
              sizes="40vw"
              style={{ objectFit: "contain" }}
            />
            <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-[.9rem] md:text-[1rem] text-center">
              Connecting athletes, brands, and communities
            </h2>
          </div>
        </Link>
      </div>
    </header>
  );
}
