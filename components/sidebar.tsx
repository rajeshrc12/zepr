"use client";
import React, { useState } from "react";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import { MENU } from "@/constants/sidebar";
import ActiveLink from "./active-link";
import { useUser } from "@/hooks/useUser";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const { data: user } = useUser();
  console.log(user);
  return (
    <div
      className={cn(
        showMenu ? "hidden md:w-[200px]" : "w-[45px]",
        "flex flex-col py-4 gap-5"
      )}
    >
      <div className="flex gap-2 px-4 items-center">
        <div>
          <Logo size="25" />
        </div>
        {showMenu && (
          <div className="text-black font-bold text-xl hidden md:block">
            Zepr
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col px-2 gap-1">
        {MENU.map((m) => (
          <ActiveLink
            showMenu={showMenu}
            key={m.value}
            value={m.value}
            Icon={m.icon}
            href={m.href}
          />
        ))}
      </div>
      <div className="flex justify-between items-center pl-5">
        {showMenu && <div className="hidden md:block">{user?.name}</div>}
        <div className="border rounded-md p-1 hidden md:block">
          <PanelLeft
            size={15}
            color="gray"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
