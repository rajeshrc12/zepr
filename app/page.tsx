"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between p-5">
        <div className="font-bold text-xl">Zepr</div>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="font-bold text-4xl">AI Data Analyst</div>
      </div>
    </div>
  );
}
