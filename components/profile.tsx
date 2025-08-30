import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";

const Profile = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <FaChevronDown color="gray" />
      </PopoverTrigger>
      <PopoverContent className="w-32">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
