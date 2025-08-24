import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
const AddConnectionPage = () => {
  return (
    <div className="flex relative">
      <div className="h-screen sticky top-0 left-0 bg-gray-200 px-10 w-[500px] flex flex-col justify-center">
        <div className="font-medium text-2xl">
          Choose the data source you want to connect
        </div>
      </div>
      <div className="px-5 flex flex-col pt-10 gap-5 bg-gray-100 w-full">
        <div>
          <Button variant={"ghost"} className="p-0 m-0">
            <FaChevronLeft /> Back to connection
          </Button>
        </div>
        <div className="font-medium text-2xl">File uploads</div>
        <div className="flex">
          {[
            {
              title: "CSV",
              fileSizeMessage: "Maximum file size is 10GB",
              Icon: BsFiletypeCsv,
              href: "/connection/csv",
            },
          ].map(({ title, Icon, fileSizeMessage, href }) => (
            <div
              key={title}
              className="px-2 bg-white gap-2 h-[250px] w-[300px] border-2 rounded-sm flex flex-col justify-center items-center"
            >
              <Icon size={70} />
              <div>{fileSizeMessage}</div>
              <Link href={href} passHref className="w-full">
                <Button className="w-full">Connect</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddConnectionPage;
