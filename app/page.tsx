import Image from "next/image";
import { Button } from "@/components/ui/button";

import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Navbar from "@/components/landing-page/navbar";
import Home from "@/components/landing-page/home";
import Feature from "@/components/landing-page/feature";
import FAQ from "@/components/landing-page/faq";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col max-w-[1400px] mx-auto gap-8 md:gap-38 px-4 sm:px-6 lg:px-8">
      <div>
        <Navbar />
        <Home />
      </div>

      <div className="flex flex-col justify-center items-center gap-6 md:gap-10">
        <div className="bg-gray-50 rounded-2xl px-3 py-2 border text-sm font-semibold">
          How it works
        </div>
        <div className="font-bold text-2xl sm:text-3xl md:text-4xl flex flex-col justify-center items-center text-center">
          <div>Make data analysis self-service</div>
        </div>
      </div>

      <Feature />
      <FAQ />

      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-white rounded-4xl w-full max-w-[900px] py-10 md:py-20 bg-black flex flex-col justify-center items-center gap-5 px-6 sm:px-8">
          <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
            Talk to your data today
          </div>
          <div className="text-sm text-muted-foreground font-bold text-center">
            Make better data-driven decisions 10x faster with a fraction of the
            cost
          </div>
          <Link href={"/login"}>
            <Button className="text-black" variant={"outline"}>
              Get started
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-[900px] border-t flex flex-col gap-5 py-10">
          <div className="flex gap-1 items-center">
            <Image src={"logo.svg"} alt="" height={40} width={40} />
            <div className="font-bold text-xl sm:text-2xl">Zepr</div>
          </div>
          <div>Copyright @ 2025 Zepr.live</div>
          <div className="flex gap-3">
            <a
              href="https://linkedin.com/in/rajeshcharhajari"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gray-100">
                <FaLinkedin color="black" />
              </Button>
            </a>
            <a
              href="https://x.com/rajeshwebdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gray-100">
                <FaSquareXTwitter color="black" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
