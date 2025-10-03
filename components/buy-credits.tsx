import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { FaLinkedin, FaCreditCard } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";

const BuyCredits = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"} className="flex items-center gap-2">
            <MdAttachMoney className="text-lg" />
            Buy Credits
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-6 m-0 rounded-2xl shadow-2xl border border-gray-100">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
              <FaCreditCard className="text-2x" color="white" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Add More Credits
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center text-gray-600 leading-relaxed">
              <p className="text-lg font-medium mb-2">🚀 Unlock More Power!</p>
              <p>
                Thanks for showing interest in our product! To buy more credits
                and continue your amazing journey, you can reach out to me
                through any of below.
              </p>
            </div>

            <div className="flex justify-center gap-6 py-4">
              <a
                href="https://x.com/rajeshwebdev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-gray-600 hover:text-black transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#1DA1F2]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <FaSquareXTwitter className="text-2xl" />
                </div>
                <span className="text-sm font-medium">Twitter (X)</span>
              </a>

              <a
                href="https://linkedin.com/in/rajeshcharhajari"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-gray-600 hover:text-[#0A66C2] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#0A66C2]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <FaLinkedin className="text-2xl" />
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
            <AlertDialogAction className="w-full">Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyCredits;
