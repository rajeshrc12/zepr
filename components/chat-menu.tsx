"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CiMenuKebab } from "react-icons/ci";

const ChatMenu = () => {
  const pathname = usePathname();
  return (
    <div className="w-[250px] overflow-y-auto px-2">
      {new Array(30).fill(0).map((_, i) => (
        <Link href={`/chat/${i}`} key={i}>
          <Button
            variant={pathname.includes(String(i)) ? "outline" : "ghost"}
            className={cn(
              "flex justify-between p-2 m-0 w-full",
              pathname.includes(String(i)) && "bg-gray-100"
            )}
          >
            what is react ?{pathname.includes(String(i)) && <CiMenuKebab />}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ChatMenu;
