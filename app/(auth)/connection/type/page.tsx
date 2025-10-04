import Csv from "@/components/connection/csv";
import Postgres from "@/components/connection/postgres";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const DataSourceTypePage = () => {
  return (
    <div className="flex flex-col md:mx-auto">
      <div className="md:w-[800px] flex flex-col gap-8 py-4">
        <div className="flex justify-between items-end">
          <Link href={"/connection"}>
            <Button
              variant={"ghost"}
              className="font-bold text-md flex justify-start !p-0 !m-0"
            >
              <IoIosArrowBack />
              Select source type
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold">Database</div>
          <Postgres />
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold">Files</div>
          <Csv />
        </div>
      </div>
    </div>
  );
};

export default DataSourceTypePage;
