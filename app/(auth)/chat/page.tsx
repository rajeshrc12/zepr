"use client";
import ChatBox from "@/components/chat-box";
import { useUser } from "@/hooks/useUser";
import React from "react";

const ChatPage = () => {
  const { data: user } = useUser();

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2">Home</div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-5 w-[60%]">
          <div className="text-3xl flex flex-col justify-center items-center">
            <div>Good afternoon, {user?.name}</div>
            <div className="text-[#575859]">How can I help you today?</div>
          </div>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
