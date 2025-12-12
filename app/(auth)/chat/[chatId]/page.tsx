"use client";
import ChatIdInput from "@/components/chat-id-input";
import { useChat } from "@/hooks/api/useChat";
import { useUser } from "@/hooks/api/useUser";
import { MessageType } from "@/types/db";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";
import CsvCard from "@/components/csv-card";
import PythonEditor from "@/components/python-editor";

const ChatIdPage = () => {
  const { chatId } = useParams();
  const { data: user } = useUser();
  const { data: chat, isLoading } = useChat(chatId as string);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current && chat?.messages) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  if (!chat || !user || isLoading)
    return (
      <div className="w-full justify-center flex">
        <Loader className="animate-spin " />;
      </div>
    );
  return (
    <div className="w-full flex flex-col">
      <div className="border-b flex justify-between p-2">
        <div></div>
        <div>{chat?.name}</div>
        <div></div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 flex flex-col overflow-y-auto py-5"
      >
        <div className="w-[75%] mx-auto text-sm flex flex-col gap-4">
          <CsvCard csv={chat.csv} onCancel={null} />

          {chat.messages.map((message: MessageType) => {
            if (message.type == "human")
              return (
                <div key={message.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>You</div>
                  </div>
                  <div className="pl-1">{message.content}</div>
                </div>
              );
            if (message.type == "ai")
              return (
                <div key={message.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="logo.png" />

                      <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                    <div>Zepr</div>
                  </div>
                  <PythonEditor
                    value={message.content}
                    id={String(message.id)}
                  />
                </div>
              );
            if (message.type == "loading")
              return (
                <div key={message.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="logo.png" />

                      <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                    <div>Zepr</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Loader className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              );
          })}
        </div>
      </div>
      <div className="w-[75%] mx-auto py-2">
        <ChatIdInput
          csvId={chat?.csv?.id}
          csvColumns={chat?.csv?.columns}
          csvName={chat.csv.name}
        />
      </div>
    </div>
  );
};

export default ChatIdPage;
