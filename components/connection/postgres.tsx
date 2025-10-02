import { Button } from "@/components/ui/button";

import { BiLogoPostgresql } from "react-icons/bi";

const Csv = () => {
  return (
    <Button variant={"outline"} className="w-40 flex justify-start relative">
      <BiLogoPostgresql /> PostgreSQL
      <span className="absolute -top-2 -right-2 rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
        Coming Soon
      </span>
    </Button>
  );
};

export default Csv;
