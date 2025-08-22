"use client";
import React from "react";
import { TbSettingsAutomation } from "react-icons/tb";
import { TbApps } from "react-icons/tb";
import ActiveLink from "@/components/active-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/utils/api";
import useSWR from "swr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCirclePlus } from "react-icons/fa6";
import { CiPlug1 } from "react-icons/ci";

const links = [
  {
    href: "/chat",
    icon: <FaCirclePlus />,
    name: "New Chat",
  },
  {
    href: "/connection",
    icon: <CiPlug1 />,
    name: "Data Sources",
  },
];
const Sidebar = () => {
  const { data } = useSWR(`/api/me`, fetcher);
  return (
    <div className="sticky group flex justify-between w-[48px] hover:w-[200px] flex-col gap-3 shadow h-screen overflow-hidden p-2 transition-all duration-300">
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <ActiveLink key={link.name} {...link} />
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={data?.image || ""} />
            <AvatarFallback>{data?.name?.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.image || ""} />
                <AvatarFallback>{data?.name?.split(" ")[0][0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-medium">{data?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {data?.email}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Sidebar;
