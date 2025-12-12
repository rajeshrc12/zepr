"use client";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/ui/useLayout";
import { ArrowUp, PanelRight, Paperclip } from "lucide-react";

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
        <div className="border shadow rounded-xl p-4 flex flex-col gap-4 w-[70%]">
          <input
            type="text"
            className="outline-none"
            placeholder="Type query here"
          />
          <div className="flex justify-between items-center">
            <Button size={"sm"} variant={"ghost"} className="h-7 w-7">
              <Paperclip />
            </Button>
            <Button size={"sm"} className="rounded-full h-7 w-7">
              <ArrowUp />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
