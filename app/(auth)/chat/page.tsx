"use client";
import { SendHorizontal } from "lucide-react";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2">Home</div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-5 w-[60%]">
          <div className="text-3xl flex flex-col justify-center items-center">
            <div>Good afternoon, Rajesh Charhajari</div>
            <div className="text-[#575859]">How can I help you today?</div>
          </div>
          <div className="flex flex-col bg-white shadow border rounded-md p-4 gap-4">
            <input
              type="text"
              className="outline-none placeholder:font-medium"
              placeholder="Ask a question..."
            />
            <div className="flex justify-between">
              <div></div>
              <SendHorizontal size={20} color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
