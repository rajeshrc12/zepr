"use client";
import { ArrowUp, Sheet, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { useCsvs } from "@/hooks/api/useCsvs";
import { CsvType } from "@/types/db";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
const ChatInput = () => {
  const router = useRouter();
  const { data: csvs } = useCsvs();
  const [selectedCsv, setSelectCsv] = useState<CsvType | null>(null);
  const [message, setMessage] = useState("");
  console.log(selectedCsv);
  const handleMessage = async () => {
    const chat = await api.post("/chat", {
      csv_id: selectedCsv?.id,
      message,
    });
    setMessage("");
    router.push(`chat/${chat.data.id}`);
    console.log(chat);
  };
  return (
    <div className="border shadow rounded-xl p-3 flex flex-col gap-4 w-[70%]">
      <div className="w-full flex flex-col gap-2">
        {selectedCsv?.name && (
          <div className="relative w-50">
            <button
              onClick={() => setSelectCsv(null)}
              className="absolute right-1 top-1 p-0.5"
            >
              <X className="w-3 h-3 hover:text-red-800" />
            </button>

            <Button
              className="border w-full flex justify-start gap-2 text-left"
              variant="ghost"
            >
              <Sheet color="green" />

              <span className="flex flex-col overflow-hidden text-xs">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedCsv.name}
                </span>
                <span className="text-muted-foreground">Spreadsheet</span>
              </span>
            </Button>
          </div>
        )}

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Type query here"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessage();
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"sm"} variant={"ghost"} className="h-7 w-7">
              <Paperclip />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <div className="text-sm flex flex-col">
              {csvs?.slice(0, 5)?.map((csv: CsvType) => (
                <Button
                  onClick={() => setSelectCsv(csv)}
                  variant={"ghost"}
                  className="flex justify-start"
                  key={csv.id}
                >
                  {csv.name}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button
          onClick={handleMessage}
          size={"sm"}
          className="rounded-full h-7 w-7"
        >
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
