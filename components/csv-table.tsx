import React from "react";
import { useChat } from "@/hooks/useChat";
import { useParams } from "next/navigation";
import { useCsv } from "@/hooks/useCsv";
import { FaEye, FaFileCsv } from "react-icons/fa";
import DynamicTable from "./dynamic-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const CsvTable = () => {
  const { chatId } = useParams();
  const { data: chat } = useChat(chatId as string);
  const { data: csv } = useCsv(chat?.csvId as string);
  console.log(csv);
  if (csv?.name)
    return (
      <div className="flex border justify-between items-center text-sm bg-white px-2 rounded-xl shadow">
        <div className="font-semibold flex items-center gap-2">
          <FaFileCsv />
          {csv?.name}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"ghost"}>
              <FaEye />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="!max-w-[90vw] !h-[90vh] p-5 m-0">
            <AlertDialogHeader>
              <AlertDialogTitle>CSV data</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="overflow-auto">
              <DynamicTable data={csv.data} />
            </div>

            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
};

export default CsvTable;
