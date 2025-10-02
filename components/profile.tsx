"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions/sign-out";
import { Progress } from "./ui/progress";

const Profile = () => {
  const { data: user } = useUser();
  if (user)
    return (
      <Popover>
        <PopoverTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted transition">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <FaChevronDown size={12} className="text-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-64 p-4 flex flex-col gap-4 rounded-xl shadow-lg"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 w-full border-b pb-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Limit Section */}
          <div className="w-full">
            <p className="text-sm font-medium mb-1">Message Limit</p>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{user?.messageLimit}/10</span>
              <span>{100 - Number(user?.messageLimit) * 10}% left</span>
            </div>
            <Progress value={Number(user?.messageLimit) * 10} className="h-2" />
          </div>

          {/* Logout Button */}
          <Button variant="outline" className="w-full" onClick={signOutAction}>
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    );
};

export default Profile;
