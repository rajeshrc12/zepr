import React from "react";
import Logo from "@/components/logo";
import { NAVBAR_MENU } from "@/contants/dashboard";
import ActiveLink from "@/components/active-link";
import Profile from "@/components/profile";
import BuyCredits from "./buy-credits";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 border-b">
      <Logo />
      <div className="flex gap-5">
        {NAVBAR_MENU.map(({ value, href }: { value: string; href: string }) => (
          <ActiveLink key={value} name={value} href={href} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <BuyCredits />
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
