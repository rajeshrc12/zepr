"use client";
import { Button } from "@/components/ui/button";
import { Files, SquarePen } from "lucide-react";
import Link from "next/link";
import ChatMenu from "@/components/chat-menu";
import { useUser } from "@/hooks/api/useUser";

const Leftbar = () => {
  const { data } = useUser();
  return (
    <div className="flex flex-col gap-2 bg-[#f9fafb] p-2 w-[220px] border-r">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Zepr</div>
      </div>
      <div className="truncate w-full">{data?.email}</div>
      <Link href={"/chat"} className="w-full">
        <Button className="w-full flex justify-start" variant={"outline"}>
          <SquarePen />
          New
        </Button>
      </Link>
      <div className="flex flex-col text-[#404040]">
        <ChatMenu />
        <Link href={"/files"} className="w-full">
          <Button className="w-full flex justify-start" variant={"ghost"}>
            <Files />
            Files
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
