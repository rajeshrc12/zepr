// import { NAVBAR_MENU } from "@/contants/landing-page";
import React from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import SignIn from "@/components/sign-in";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5">
      <Logo />
      {/* <div className="shadow rounded-xl flex bg-white p-2 border gap-5">
        {NAVBAR_MENU.map((menu: { value: string; href: string }) => (
          <Button
            key={menu.value}
            className="font-semibold text-md"
            variant={"ghost"}
          >
            {menu.value}
          </Button>
        ))}
      </div> */}
      <div className="flex items-center">
        <SignIn />
      </div>
    </div>
  );
};

export default Navbar;
