import SignIn from "@/components/sign-in";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-[300px] flex flex-col justify-center items-center gap-5 p-5 rounded-2xl">
        <Image unoptimized src={"logo.svg"} alt="" height={100} width={100} />
        <div className="font-bold text-2xl">Welcome</div>
        <div className="text-sm">Log in to Zepr to continue</div>
        <SignIn />
        <div className="text-xs text-muted-foreground text-center">
          By clicking Login, you agree to our privacy policy and terms of
          service.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
