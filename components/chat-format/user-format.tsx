import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserFormat = ({ message }: { message: string }) => {
  return (
    <div className="flex text-sm py-2 justify-end">
      <div className="flex gap-2 max-w-[90%]">
        <div className=" rounded shadow p-2 bg-blue-100">{message}</div>
        <Avatar className="w-5 h-5">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default UserFormat;
