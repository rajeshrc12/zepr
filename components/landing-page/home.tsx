"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <Link href={"/login"}>
          <Button className="font-semibold text-md rounded-xl py-6">
            Try for Free
          </Button>
        </Link>
      </div>
      <div className="relative w-full flex justify-center my-20">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-lg">
          <video
            src="demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            ref={(video) => {
              if (!video) return;
              video.playbackRate = 2.0; // 1.5x speed

              // Stop by default
              video.pause();

              // Play on hover
              video.addEventListener("mouseenter", () => {
                video.play();
              });

              // Pause when hover ends
              video.addEventListener("mouseleave", () => {
                video.pause();
                video.currentTime = 0; // optional: reset to start
              });
            }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Home;
