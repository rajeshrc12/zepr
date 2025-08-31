import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { FaChartBar, FaTable } from "react-icons/fa";
// import SQLFormat from "@/components/chat-format/sql-format";
// import ChartFormat from "./chart-format";

const ModelFormat = ({ message }: { message: string }) => {
  return (
    <div className="flex text-sm py-2 px-5 justify-start">
      <div className="flex gap-2 max-w-[90%]">
        <div className="flex flex-col gap-2 rounded shadow p-4 bg-white w-full">
          {message}
          {/* <div className="font-bold">Top 5 user count by country {message}</div>
          <Tabs defaultValue="data" className="flex flex-col gap-2">
            <TabsList className="bg-white flex gap-2">
              <TabsTrigger value="data" className="bg-gray-200 p-4 flex">
                <FaTable />
                Data
              </TabsTrigger>
              <TabsTrigger value="chart" className="bg-gray-200 p-4 flex">
                <FaChartBar />
                chart
              </TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              <SQLFormat />
            </TabsContent>
            <TabsContent value="chart">
              <ChartFormat />
            </TabsContent>
          </Tabs>
          <table className="w-full table-fixed border">
            <thead className="bg-gray-100 font-bold">
              <tr>
                <th className="border-y p-2 rounded-tl w-1/2 text-left">
                  name
                </th>
                <th className="border-y p-2 rounded-tr w-1/2  text-left">
                  email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-y p-2">rajesh</td>
                <td className="border-y p-2">rajesh@gmail.com</td>
              </tr>
              <tr>
                <td className="border-y p-2">rajesh</td>
                <td className="border-y p-2">rajesh@gmail.com</td>
              </tr>
              <tr>
                <td className="border-y p-2">rajesh</td>
                <td className="border-y p-2">rajesh@gmail.com</td>
              </tr>
            </tbody>
          </table>

          <div>
            <div className="font-bold">Interpretation</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              aliquam optio eum exercitationem rerum nobis laudantium excepturi,
              qui quidem perspiciatis officiis non at porro odio quia adipisci
              cumque totam ab.
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModelFormat;
