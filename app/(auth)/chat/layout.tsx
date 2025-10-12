"use client";

import { useState } from "react";
import ChatMenu from "@/components/chat-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi"; // hamburger + close icons
import { cn } from "@/lib/utils";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex-1 flex min-h-0 relative">
      {/* Mobile Menu Toggle */}
      <div
        className={cn(
          "md:hidden absolute top-2 z-50 duration-300",
          menuOpen ? "left-66" : "left-3"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {/* Sidebar (Desktop + Mobile) */}
      <div
        className={`
    fixed md:static top-[57px] left-0 h-[calc(100vh-57px)] w-64 bg-white border-r 
    transform transition-transform duration-300 z-40
    ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10">
          <Link href={"/chat"}>
            <Button
              variant="outline"
              className="flex justify-between m-2 w-[93%]"
            >
              New Chat
              <BiSolidEdit />
            </Button>
          </Link>
        </div>

        {/* Scrollable chat list */}
        <div className="overflow-y-auto h-[calc(100%-57px)]">
          <ChatMenu />
        </div>
      </div>

      {children}
    </div>
  );
}
