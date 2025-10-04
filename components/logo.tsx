import Link from "next/link";
import React from "react";
import LogoSVG from "@/components/icons/LogoSVG";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-1 items-center">
      <LogoSVG height="40" width="40" />
      <div className="font-bold text-2xl">Zepr</div>
    </Link>
  );
};

export default Logo;
