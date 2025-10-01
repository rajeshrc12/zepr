"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnections } from "@/hooks/useConnections";
import { Csv } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

const ChatPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useConnections();
  const [message, setMessage] = useState("");
  const [csvId, setCsvId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleMessage = async () => {
    if (!message.trim()) {
      toast.info("Type your query");
      return;
    }
    if (!csvId) {
      toast.info("Select Data Source");
      return;
    }
    setIsLoading(true);
    setMessage("");
    const response = await axios.post("/api/chat", { message, csvId });
    await axios.post("/api/title", {
      chatId: response.data.id,
      message,
    });
    await axios.post("/api/message", {
      chatId: response.data.id,
      csvId,
      message,
      messages: [],
    });
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    queryClient.invalidateQueries({ queryKey: ["chat"] });

    router.push(`/chat/${response.data.id}`);
    setIsLoading(false);
  };
  return (
    <div className="bg-gray-100 flex-1 flex flex-col gap-5 justify-center items-center">
      <div className="w-[60%] flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center gap-5">
          <Image src={"logo.svg"} alt="" height={50} width={50} />
          <div className="font-bold">How may I assist you today ?</div>
        </div>
        <div className="flex flex-col border p-4 gap-3 rounded-xl bg-white shadow">
          <input
            disabled={isLoading}
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMessage();
              }
            }}
            type="text"
            placeholder="Ask anything"
            className="outline-none w-full"
          />
          <div className="flex justify-between items-center">
            <Select
              value={csvId}
              onValueChange={(e) => setCsvId(e)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((csv: Csv) => (
                  <SelectItem key={csv.id} value={csv.id}>
                    {csv.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLoading ? (
              <ImSpinner2 size={20} className="animate-spin" />
            ) : (
              <LuSendHorizontal onClick={handleMessage} />
            )}
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-2">
          {new Array(4).fill(0).map((_, i) => (
            <Button
              variant={"outline"}
              className="h-auto whitespace-normal break-words text-left block"
              key={i}
            >
              who are my top 5 user ?
            </Button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ChatPage;
