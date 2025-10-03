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
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
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
          className="w-54 p-4 flex flex-col gap-4 rounded-xl shadow-lg"
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

          <div
            className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200
          ${
            user?.messageLimit === 0
              ? "bg-red-50 text-red-700 border-red-200 shadow-sm"
              : "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
          }`}
          >
            {user?.messageLimit === 0 ? (
              <FiXCircle className="w-3 h-3 mr-1.5" />
            ) : (
              <FiCheckCircle className="w-3 h-3 mr-1.5" />
            )}
            {user?.messageLimit}{" "}
            {user?.messageLimit === 1 ? "message" : "messages"} left
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
