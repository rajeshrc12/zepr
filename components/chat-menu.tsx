"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CiMenuKebab } from "react-icons/ci";
import { useParams } from "next/navigation";
import { useChats } from "@/hooks/useChats";
import { Chat } from "@prisma/client";

const ChatMenu = () => {
  const { chatId } = useParams();
  const { data: chats } = useChats();
  return (
    <div className="w-[250px] overflow-y-auto px-2">
      {chats?.map((chat: Chat) => (
        <Link href={`/chat/${chat.id}`} key={chat.id}>
          <Button
            variant={chatId === chat.id ? "outline" : "ghost"}
            className={cn(
              "flex justify-between p-2 m-0 w-full",
              chatId === chat.id && "bg-gray-100"
            )}
          >
            {chat.name.slice(0, 27)}
            {chatId === chat.id && <CiMenuKebab />}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ChatMenu;
