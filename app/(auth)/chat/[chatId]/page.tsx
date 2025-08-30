"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatBox from "@/components/chat-box";
import UserFormat from "@/components/chat-format/user-format";
import ModelFormat from "@/components/chat-format/model-format";

const ChatIdPage = () => {
  const [
    chats,
    // setChats
  ] = useState([
    { message: "Hi", role: "user" },
    { message: "Hi", role: "model" },
  ]);

  // Ref for scrollable container
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever chats change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);
  return (
    <div className="flex-1 flex flex-col bg-gray-50 gap-5">
      <div className="flex-1 overflow-y-auto" ref={containerRef}>
        {chats.map((chat, i) => {
          if (chat.role === "user")
            return <UserFormat key={i} message={chat.message} />;
          else return <ModelFormat key={i} message={chat.message} />;
        })}
      </div>

      <div className="w-full flex justify-center pb-5">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatIdPage;
