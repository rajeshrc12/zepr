import { CsvType } from "@/types/db";
import { Sheet, X } from "lucide-react";
import { Button } from "./ui/button";

const CsvCard = ({
  csv,
  onCancel,
}: {
  csv: CsvType;
  onCancel: (() => void) | null;
}) => {
  return (
    <div className="relative w-50">
      {onCancel && (
        <button onClick={onCancel} className="absolute right-1 top-1 p-0.5">
          <X className="w-3 h-3 hover:text-red-800" />
        </button>
      )}

      <Button
        className="border w-full flex justify-start gap-2 text-left"
        variant="ghost"
      >
        <Sheet color="green" />

        <span className="flex flex-col overflow-hidden text-xs">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {csv.name}
          </span>
          <span className="text-muted-foreground">Spreadsheet</span>
        </span>
      </Button>
    </div>
  );
};

export default CsvCard;
