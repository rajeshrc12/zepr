"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/env";
import { useUser } from "@/hooks/useUser";
import React from "react";

const ChatPage = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  console.log(user, error);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5">
        <div>Zepr</div>
        <Button
          onClick={() => {
            window.location.href = `${BACKEND_URL}/logout`;
          }}
        >
          Logout
        </Button>
      </div>
      <div>Welcome,{user?.name}</div>
    </div>
  );
};

export default ChatPage;
