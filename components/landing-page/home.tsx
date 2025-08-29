import React from "react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="bg-[#FAF9F8] w-full rounded-4xl flex flex-col justify-center items-center gap-5 py-20">
      <div className="bg-white rounded-2xl px-3 py-2 border text-sm font-semibold">
        Your AI data analyst
      </div>
      <div className="font-bold text-5xl flex flex-col justify-center items-center">
        <div>AI data analyst that answers your</div>
        <div>data questions</div>
      </div>
      <div className="text-sm text-muted-foreground font-bold">
        Make data-driven decisions 10x faster with self-service analytics.
      </div>
      <div className="flex items-center">
        <Button className="font-semibold text-md rounded-xl py-6">
          Try for Free
        </Button>
      </div>
    </div>
  );
};

export default Home;
