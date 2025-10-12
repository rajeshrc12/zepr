"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/env";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        onClick={() => {
          window.location.href = `${BACKEND_URL}/login`;
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
