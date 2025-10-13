"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SendHorizontal, X } from "lucide-react";
import React, { useState } from "react";

const ChatIdPage = () => {
  const [rightPanel, setRightPanel] = useState(true);
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "w-1/3 flex flex-col border-r",
          !rightPanel && "w-full border-none"
        )}
      >
        <div className="px-2 py-1">Title</div>
        <div
          className={cn(
            "flex-1 overflow-y-auto p-2 flex flex-col gap-2 ",
            !rightPanel && "px-[25%]"
          )}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corrupti unde facere, numquam exercitationem, mollitia cumque
                beatae nobis voluptas iure facilis quidem impedit dolorem. Totam
                laudantium quis necessitatibus eum pariatur reiciendis. {i + 1}
              </div>
              <div>
                <Button variant={"outline"} onClick={() => setRightPanel(true)}>
                  Show report
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "border p-2 rounded-xl m-2 bg-white flex flex-col gap-3",
            !rightPanel && "mx-[25%]"
          )}
        >
          <input
            type="text"
            className="outline-none"
            placeholder="Ask a question"
          />
          <div className="flex justify-between">
            <div className="border p-1 rounded-lg text-xs">Netflix.csv</div>
            <SendHorizontal size={20} color="gray" />
          </div>
        </div>
      </div>

      {rightPanel && (
        <div className="flex-1 flex flex-col bg-white rounded-r p-2">
          <div className="flex justify-between">
            <div>Title</div>
            <X size={15} onClick={() => setRightPanel(false)} />
          </div>
          <div className="overflow-y-auto">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i}>hi {i + 1}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIdPage;
