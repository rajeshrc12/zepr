"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ConnectionPage = () => {
  return (
    <div className="flex flex-col gap-5 py-10 px-5">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Connections</div>
        <Link href={"/connection/add"} passHref>
          <Button onClick={() => {}}>Add Connection</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionPage;
