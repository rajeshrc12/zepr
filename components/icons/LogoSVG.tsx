import React from "react";

const LogoSVG = ({ height, width }: { height: string; width: string }) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        stroke="#000000"
        strokeWidth="2"
        fill="#000000"
        rx="4"
        ry="4"
      />

      <path
        d="M13 4L8 12H12L11 20L16 12H12L13 4Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LogoSVG;
