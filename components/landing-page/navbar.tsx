import React from "react";
import Logo from "@/components/logo";
import SignIn from "@/components/sign-in";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5">
      <Logo />
      <div className="flex items-center">
        <SignIn />
      </div>
    </div>
  );
};

export default Navbar;
