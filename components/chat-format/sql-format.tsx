import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const SQLFormat = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-full gap-2">
      <div>
        <Button variant={"outline"} onClick={() => setOpen(!open)}>
          SQL Query
        </Button>
      </div>

      {open && (
        <div className="flex flex-col gap-2">
          <div className="bg-primary text-white rounded p-2">
            <div>select * from book</div>
            <div>select * from book</div>
            <div>select * from book</div>
            <div>select * from book</div>
          </div>

          <div>
            <div className="font-bold">Query Explaination</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laborum
            laboriosam recusandae a neque! Obcaecati, natus quas non neque
            aperiam consequuntur pariatur. Nisi voluptates officia numquam
            consectetur iusto laboriosam veritatis?
          </div>
        </div>
      )}
    </div>
  );
};

export default SQLFormat;
