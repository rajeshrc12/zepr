"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/env";
import React from "react";

const ChatPage = () => {
  return (
    <div>
      <div>Welcome</div>
      <Button
        onClick={() => {
          window.location.href = `${BACKEND_URL}/logout`;
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ChatPage;
