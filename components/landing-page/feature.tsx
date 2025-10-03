import { FEATURES } from "@/contants/landing-page";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Feature = () => {
  return (
    <div className="flex flex-col gap-10">
      {FEATURES.map(
        (feature: {
          title: string;
          description: string;
          hrefValue: string;
          href: string;
          videoLink: string;
        }) => (
          <div
            key={feature.title}
            className="grid grid-cols-1 lg:grid-cols-12 px-4 sm:px-6 lg:px-10 items-center w-full max-w-[1400px] mx-auto"
          >
            <div className="col-span-1 lg:col-span-6 flex flex-col gap-5 order-2 lg:order-1">
              <div className="font-bold text-xl">{feature.title}</div>
              <div>
                <div className="text-stone-600">{feature.description}</div>
              </div>
              <div>
                <Link href={"/login"}>
                  <Button>{feature.hrefValue}</Button>
                </Link>
              </div>
            </div>
            <div
              className="col-span-1 lg:col-span-6 border h-[300px] lg:h-[400px] rounded bg-cover shadow-lg lg:min-w-0 order-1 lg:order-2"
              style={{
                backgroundImage: `url('${feature.videoLink}')`,
              }}
            ></div>
          </div>
        )
      )}
    </div>
  );
};

export default Feature;
