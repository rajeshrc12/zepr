"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-[#FAF9F8] w-full rounded-4xl flex flex-col justify-center items-center gap-2 sm:gap-4 md:gap-3 py-10 sm:py-16 md:py-20 px-4">
      {/* Tagline */}
      <div className="bg-white rounded-xl px-3 py-2 border text-xs sm:text-sm font-semibold">
        Your AI data analyst
      </div>

      {/* Heading */}
      <div className="font-bold text-3xl sm:text-4xl md:text-5xl text-center leading-snug">
        <div>AI data analyst that answers your</div>
        <div>data questions</div>
      </div>

      {/* Subtext */}
      <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-semibold text-center max-w-2xl">
        Make data-driven decisions 10x faster with self-service analytics.
      </div>

      {/* CTA Button */}
      <div className="flex items-center">
        <Link href={"/login"}>
          <Button className="font-semibold text-sm sm:text-md rounded-lg sm:rounded-xl px-5 sm:px-6 py-4 sm:py-5 md:py-6">
            Try for Free
          </Button>
        </Link>
      </div>

      {/* Video Demo */}
      <div className="relative w-full flex justify-center my-6 sm:my-8 md:my-10 px-2">
        <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
          <video
            src="demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            ref={(video) => {
              if (!video) return;
              video.playbackRate = 2.0;

              // Stop by default
              video.pause();

              // Play on hover
              video.addEventListener("mouseenter", () => video.play());
              video.addEventListener("mouseleave", () => {
                video.pause();
                video.currentTime = 0;
              });
            }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Home;
