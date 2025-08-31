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
import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/useConnection";
import { Csv } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const ChatPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useConnection();
  const [message, setMessage] = useState("");
  const [csvId, setCsvId] = useState("");
  const handleMessage = async () => {
    setMessage("");
    const response = await axios.post("/api/chat", { message, csvId });
    await queryClient.invalidateQueries({ queryKey: ["chats"] });
    router.push(`/chat/${response.data.id}`);
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
            <Select value={csvId} onValueChange={(e) => setCsvId(e)}>
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
            <LuSendHorizontal />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {new Array(4).fill(0).map((_, i) => (
            <Button
              variant={"outline"}
              className="h-auto whitespace-normal break-words text-left block"
              key={i}
            >
              who are my top 5 user ?
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
