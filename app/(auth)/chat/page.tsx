"use client";
import ChatInput from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/ui/useLayout";
import { PanelRight } from "lucide-react";

const ChatPage = () => {
  const { right, setLayout } = useLayout((state) => state);
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end border-b w-full p-1">
        <Button variant={"ghost"} onClick={() => setLayout({ right: !right })}>
          <PanelRight />
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-center items-center">
        <div className="text-3xl font-semibold text-[#404040]">
          What do you want to analyze today?
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
