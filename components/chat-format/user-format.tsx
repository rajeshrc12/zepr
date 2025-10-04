import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserFormat = ({ message, image }: { message: string; image: string }) => {
  return (
    <div className="flex text-sm py-2 justify-end">
      <div className="flex gap-2 max-w-[90%] items-center">
        <div className="rounded-2xl px-3 py-1 bg-white shadow">{message}</div>
        <Avatar className="w-6 h-6">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default UserFormat;
