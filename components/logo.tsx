import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center">
      <Image unoptimized src={"logo.svg"} alt="" height={40} width={40} />
      <div className="font-bold text-2xl">Zepr</div>
    </div>
  );
};

export default Logo;
