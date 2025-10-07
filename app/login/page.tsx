"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/env";
import React from "react";

const LoginPage = () => {
  return (
    <div>
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
