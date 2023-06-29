import Link from "next/link";
import Image from "next/image";

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
      </div>
    </header>
  );
}
