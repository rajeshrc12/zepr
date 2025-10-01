"use client";
import React, { useEffect, useRef } from "react";
import ChatBox from "@/components/chat-box";
import UserFormat from "@/components/chat-format/user-format";
import ModelFormat from "@/components/chat-format/model-format";
import { useChat } from "@/hooks/useChat";
import { useParams } from "next/navigation";
import { Message } from "@prisma/client";
import { ImSpinner2 } from "react-icons/im";
import LoaderFormat from "@/components/chat-format/loader-format";

const ChatIdPage = () => {
  const { chatId } = useParams();
  const { data: chat, isLoading } = useChat(chatId as string);

  // Ref for scrollable container
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever chats change
  useEffect(() => {
    if (containerRef.current && chat?.messages) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat?.messages]);
  console.log(chat);
  return (
    <div className="flex-1 flex flex-col bg-gray-50 gap-5">
      <div className="flex-1 overflow-y-auto px-20" ref={containerRef}>
        {isLoading && (
          <div className="flex justify-center py-10">
            <ImSpinner2 size={20} className="animate-spin" />
          </div>
        )}
        {chat?.messages?.map((chat: Message) => {
          if (chat.type === "loader") return <LoaderFormat key={chat.id} />;
          else if (chat.role === "user")
            return <UserFormat key={chat.id} message={chat.message} />;
          else if (chat.role === "model")
            return <ModelFormat key={chat.id} message={chat} />;
        })}
      </div>
      <div className="w-full flex justify-center pb-5">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatIdPage;
