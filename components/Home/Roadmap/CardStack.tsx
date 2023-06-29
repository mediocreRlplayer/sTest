// importing next
import Image from "next/image";

// importing assets
import CCard from "@/assets/images/CCard.svg";
import GCard from "@/assets/images/GCard.svg";

export default function CardStack() {
  return (
    <>
      {/* Front Angled Card */}
      <div className="absolute top-[1rem] left-[.5rem] w-[300px] h-[180px] rotate-[-10deg] z-[3]">
        <Image
          src={GCard}
          alt="Gold Member Card"
          fill
          sizes="50vw"
          quality={100}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Back Angled Card */}
      <div className="absolute top-[2.5rem] left-[.5rem] w-[300px] h-[180px] rotate-[15deg] scale-[110%] z-[2]">
        <Image
          src={CCard}
          alt="Crimson Member Card"
          fill
          sizes="50vw"
          quality={100}
          style={{ objectFit: "contain" }}
        />
      </div>
    </>
  );
}
