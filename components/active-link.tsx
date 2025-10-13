"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActiveLinkProps {
  href: string;
  value: string;
  showMenu: boolean;
  Icon: LucideIcon;
}

export default function ActiveLink({
  href,
  value,
  Icon,
  showMenu,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link href={href} passHref>
      <Button
        key={value}
        variant={"ghost"}
        className={cn(
          "hover:bg-gray-200 flex justify-start items-center gap-2 h-7 p-0 m-0 text-black",
          isActive && "bg-gray-200",
          showMenu ? "w-full" : "w-auto"
        )}
      >
        <Icon color="gray" />
        {showMenu && <span className="hidden md:inline">{value}</span>}
      </Button>
    </Link>
  );
}
