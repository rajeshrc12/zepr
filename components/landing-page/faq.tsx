import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQs } from "@/contants/landing-page";

const FAQ = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-5 py-5 px-4 sm:px-6">
      <div className="font-bold text-2xl sm:text-3xl md:text-4xl flex flex-col justify-center items-center text-center">
        <div>Frequently Asked Questions</div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-[900px]">
        {FAQs.map((faq: { question: string; answer: string }) => (
          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-xl"
            key={faq.question}
          >
            <AccordionItem value={faq.question}>
              <AccordionTrigger className="font-bold text-base sm:text-lg border-b p-4 sm:p-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-4 sm:p-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
