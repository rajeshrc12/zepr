import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

const Profile = async () => {
  const session = await auth();
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2">
        <div className="text-sm font-bold">
          {session?.user.name?.split(" ")[0]}
        </div>
        <Avatar>
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <FaChevronDown color="gray" />
      </PopoverTrigger>
      <PopoverContent className="w-30 p-0 flex flex-col justify-center items-center">
        <SignOut />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
