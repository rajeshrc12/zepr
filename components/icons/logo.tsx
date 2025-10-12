import React from "react";

const Logo = ({ size = "40" }: { size?: string }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
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

export default Logo;
