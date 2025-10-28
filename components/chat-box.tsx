import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useCsvs } from "@/hooks/useCsvs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CsvType } from "@/types/db";

const ChatBox = () => {
  const [selectedCsvId, setSelectedCsvId] = useState("");
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const { data: csvs, isLoading } = useCsvs();

  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleMessage = async () => {
    if (!message.trim()) {
      toast.info("Type your query");
      return;
    }
    if (!selectedCsvId) {
      toast.info("Select Data Source");
      return;
    }
    setIsMessageLoading(true);
    setMessage("");
    const response = await api.post("/chat", {
      message,
      csv_id: Number(selectedCsvId),
    });
    try {
      router.push(`/chat/${response.data.id}`);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(String(err?.response?.data));
      setIsMessageLoading(false);
    }
  };
  return (
    <div className="flex flex-col bg-white shadow border rounded-md p-4 gap-4">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isMessageLoading}
        type="text"
        className="outline-none placeholder:font-medium"
        placeholder="Ask a question..."
      />
      <div className="flex justify-between items-end">
        <Select
          disabled={isMessageLoading}
          value={selectedCsvId}
          onValueChange={(e) => setSelectedCsvId(e)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <div className="text-sm">Loading...</div>
            ) : csvs?.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No Connection available
              </div>
            ) : (
              csvs?.map((csv: CsvType) => (
                <SelectItem key={csv.id} value={String(csv.id)}>
                  {csv.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <SendHorizontal onClick={handleMessage} size={20} color="gray" />
      </div>
    </div>
  );
};

export default ChatBox;
