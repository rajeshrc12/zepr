"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
  href: string;
  name: string;
}

export default function ActiveLink({ href, name }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} passHref>
      <Button
        key={name}
        className={cn("font-semibold text-md", isActive && "shadow-lg")}
        variant={isActive ? "outline" : "ghost"}
      >
        {name}
      </Button>
    </Link>
  );
}
