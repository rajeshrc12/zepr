import React from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5">
      <Logo />
      <div className="flex items-center">
        <Link href={"/login"}>
          <Button className="font-semibold text-md rounded-xl">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
