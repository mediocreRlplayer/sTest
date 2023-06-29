import Link from "next/link";
import { titleFont } from "@/utils/fonts";

export default function BuyButton({ membership }: { membership: string }) {
  return (
    <Link
      href={`/checkout/${membership}`}
      className={`w-[150px] pt-1 bg-green-500 rounded-[.5rem] text-[1.5rem] text-white text-center uppercase ${titleFont.className}`}
    >
      Buy Now
    </Link>
  );
}
