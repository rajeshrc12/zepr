import { SendHorizontal } from "lucide-react";
import React from "react";

const ChatIdPage = () => {
  return (
    <div className="flex h-full">
      <div className="w-1/3 flex flex-col border-r">
        <div className="px-2 py-1">Title</div>
        <div className="flex-1 overflow-y-auto p-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i}>hi {i + 1}</div>
          ))}
        </div>

        <div className="border p-2 rounded-xl m-2 bg-white">
          <div className="space-y-2">
            <input
              type="text"
              className="outline-none"
              placeholder="Ask a question"
            />
            <div className="flex justify-between">
              <div className="border p-1 rounded-lg">Netflix.csv</div>
              <SendHorizontal size={20} color="gray" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-r p-2">
        <div>Title</div>
        <div className="overflow-y-auto">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i}>hi {i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatIdPage;
