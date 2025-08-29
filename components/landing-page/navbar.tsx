import { NAVBAR_MENU } from "@/contants/landing-page";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5">
      <div className="flex gap-1 items-center">
        <Image src={"logo.svg"} alt="" height={40} width={40} />
        <div className="font-bold text-2xl">Zepr</div>
      </div>
      <div className="shadow rounded-xl flex bg-white p-2 border gap-5">
        {NAVBAR_MENU.map((menu: { value: string; href: string }) => (
          <Button
            key={menu.value}
            className="font-semibold text-md"
            variant={"ghost"}
          >
            {menu.value}
          </Button>
        ))}
      </div>
      <div className="flex items-center">
        <Button className="font-semibold text-md" variant={"ghost"}>
          Sign In
        </Button>
        <Button className="font-semibold text-md rounded-xl py-6">
          Try for Free
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
