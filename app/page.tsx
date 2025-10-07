"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div>Zepr</div>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
      <div>AI Data Analyst</div>
    </div>
  );
}
