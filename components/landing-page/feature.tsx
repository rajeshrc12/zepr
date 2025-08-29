import { FEATURES } from "@/contants/landing-page";
import React from "react";
import { Button } from "@/components/ui/button";

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
            className="grid grid-cols-12 px-10 items-center"
          >
            <div className="col-span-6 flex flex-col gap-5">
              <div className="font-bold text-xl">{feature.title}</div>
              <div>
                <div className="text-stone-600">{feature.description}</div>
              </div>
              <div>
                <Button>{feature.hrefValue}</Button>
              </div>
            </div>
            <div className="col-span-6 border h-[400px] rounded"></div>
          </div>
        )
      )}
    </div>
  );
};

export default Feature;
