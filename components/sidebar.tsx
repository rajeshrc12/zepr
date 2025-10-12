"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Cable, MessagesSquare, PanelLeft } from "lucide-react";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [hideMenu, setHideMenu] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col py-4 gap-5",
        hideMenu ? "w-[45px]" : "w-[200px]"
      )}
    >
      <div className="flex gap-2 px-4 items-center">
        <div>
          <Logo size="25" />
        </div>
        {!hideMenu && <div className="text-black font-bold text-xl">Zepr</div>}
      </div>
      <div className="flex-1 flex flex-col px-2 gap-1">
        <Button
          variant={"ghost"}
          className="hover:bg-gray-200 flex justify-start items-center gap-2 h-7 p-0 m-0 w-full text-black"
        >
          <SquarePen color="gray" />
          {!hideMenu && <span>New chat</span>}
        </Button>
        <Button
          variant={"ghost"}
          className="hover:bg-gray-200 flex justify-start items-center gap-2 h-7 p-0 m-0 w-full text-black"
        >
          <Cable color="gray" />
          {!hideMenu && <span>Connection</span>}
        </Button>
        <Button
          variant={"ghost"}
          className="hover:bg-gray-200 flex justify-start items-center gap-2 h-7 p-0 m-0 w-full text-black"
        >
          <MessagesSquare color="gray" />
          {!hideMenu && <span>Chat history</span>}
        </Button>
      </div>
      <div className="flex justify-between items-center pl-5">
        {!hideMenu && <div>Rajesh Charhajari</div>}
        <div className="border rounded-md p-1">
          <PanelLeft
            size={15}
            color="gray"
            className="cursor-pointer"
            onClick={() => setHideMenu(!hideMenu)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
