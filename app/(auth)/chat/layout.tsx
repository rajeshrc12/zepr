import ChatMenu from "@/components/chat-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex min-h-0">
      <div className="flex flex-col border-r">
        <Link href={"/chat"}>
          <Button
            variant={"outline"}
            className="flex justify-between m-2 w-[93%]"
          >
            New Chat
            <BiSolidEdit />
          </Button>
        </Link>
        <ChatMenu />
      </div>
      {children}
    </div>
  );
}
