import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-1 items-center">
      <Image unoptimized src={"logo.svg"} alt="" height={40} width={40} />
      <div className="font-bold text-2xl">Zepr</div>
    </Link>
  );
};

export default Logo;
