"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/env";

const Login = () => {
  return (
    <Button
      onClick={() => {
        window.location.href = `${BACKEND_URL}/login`;
      }}
    >
      Login
    </Button>
  );
};

export default Login;
