import React from "react";
import { ImSpinner2 } from "react-icons/im";

const LoaderFormat = () => {
  return (
    <div className="flex text-sm py-2 justify-start">
      <div className="flex gap-2 max-w-[90%]">
        <div className="flex gap-2 rounded shadow p-2 bg-white w-full">
          <ImSpinner2 size={20} className="animate-spin" color="blue" />{" "}
          Thinking
        </div>
      </div>
    </div>
  );
};

export default LoaderFormat;
