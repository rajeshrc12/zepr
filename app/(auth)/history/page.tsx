"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, LoaderCircle } from "lucide-react";
import { ChatType } from "@/types/db";
import { useChats } from "@/hooks/useChats";
import { useRouter } from "next/navigation";

const ChatHistoryPage = () => {
  const { data: chats, isLoading } = useChats();
  const router = useRouter();
  console.table(chats);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5">
        <div className="font-bold text-2xl">Chat History</div>
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">ID</TableHead>
              <TableHead className="h-9 py-2">Title</TableHead>
              <TableHead className="h-9 py-2">Messages</TableHead>
              <TableHead className="h-9 py-2">CSV Name</TableHead>
              <TableHead className="h-9 py-2">Created At</TableHead>
              <TableHead className="h-9 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <span>Loading Chats...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : chats && chats.length > 0 ? (
              chats.map((chat: ChatType, index: number) => (
                <TableRow key={chat.id}>
                  <TableCell className="py-2">{index + 1}</TableCell>
                  <TableCell className="py-2 font-medium">
                    {chat.name}
                  </TableCell>
                  <TableCell className="py-2">{chat.messages.length}</TableCell>
                  <TableCell className="py-2">{chat.csv.name}</TableCell>
                  <TableCell className="py-2">
                    {new Date(chat.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-2">
                    <Eye
                      onClick={() => {
                        router.push("/chat/" + chat.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No Chat data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ChatHistoryPage;
