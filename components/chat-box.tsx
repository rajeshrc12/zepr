import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const handleMessage = () => {};
  return (
    <div className="flex w-[600px] border items-center p-4 rounded-xl bg-white">
      <input
        type="text"
        placeholder="What do you want to know ?"
        className="outline-none w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim() !== "") {
            setMessage("");
            handleMessage();
          }
        }}
      />
      <LuSendHorizontal />
    </div>
  );
};

export default ChatBox;
