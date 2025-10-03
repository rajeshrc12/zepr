"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { FaFileCsv } from "react-icons/fa6";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

const ChatPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading: csvLoading } = useConnections(1, 20);
  const [message, setMessage] = useState("");
  const [csvId, setCsvId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useUser();

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
    try {
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push(`/chat/${response.data.id}`);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(String(err?.response?.data));
      setIsLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <div className="bg-gray-100 flex-1 flex flex-col gap-5 justify-center items-center">
      <div className="w-[60%] flex flex-col gap-5">
        {0 === user?.messageLimit ? (
          <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="text-lg font-semibold text-gray-800">
              You have reached your message limit!
            </div>
            <div className="text-sm text-gray-500 text-center">
              Upgrade your plan to continue exploring and unlock more features.
            </div>
            <Button>Upgrade Plan</Button>
          </div>
        ) : (
          <>
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
                    {csvLoading ? (
                      <div className="text-sm">Loading...</div>
                    ) : data?.data?.length === 0 ? (
                      <div className="text-sm text-muted-foreground">
                        No Connection available
                      </div>
                    ) : (
                      data?.data?.map((csv: Csv) => (
                        <SelectItem key={csv.id} value={csv.id}>
                          <FaFileCsv />
                          {csv.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {isLoading ? (
                  <ImSpinner2 size={20} className="animate-spin" />
                ) : (
                  <LuSendHorizontal onClick={handleMessage} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
