"use client";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { useChats } from "@/hooks/api/useChats";
import { ChatType } from "@/types/db";

const ChatMenu = () => {
  const { data: chats } = useChats();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setOpen(!open)}
        variant={"ghost"}
        className="flex justify-between"
      >
        <span className="flex items-center gap-2 ">
          <MessageSquare />
          Chats
        </span>
        <ChevronRight />
      </Button>
      {open && (
        <div className="flex flex-col text-[#64748B]">
          {chats?.slice(0, 5)?.map((chat: ChatType) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <Button
                variant={"ghost"}
                key={chat.id}
                className="flex justify-start text-xs h-6 font-normal"
              >
                {chat.name}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMenu;
