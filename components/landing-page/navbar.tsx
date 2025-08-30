import { NAVBAR_MENU } from "@/contants/landing-page";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5">
      <Logo />
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
        <Link href={"/chat"}>
          <Button className="font-semibold text-md" variant={"ghost"}>
            Sign In
          </Button>
          <Button className="font-semibold text-md rounded-xl py-6">
            Try for Free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
