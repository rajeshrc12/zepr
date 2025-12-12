import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const csvs = [
  {
    id: "1",
    name: "Netflix",
    description: "Netflix data",
    columns: "10",
    created_at: "",
  },
];

const FilesPage = () => {
  return (
    <div className="flex flex-col relative overflow-y-auto gap-5">
      <div className="p-3 sticky border-b">
        <div className="font-bold text-xl">My Files</div>
        <div className="text-sm text-[#64748B]">
          Uploads and files created Julius{" "}
        </div>
      </div>
      <div className="px-10">
        <Input type="file" />
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-10">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Columns</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvs.map((csv) => (
              <TableRow key={csv.id}>
                <TableCell className="font-medium">{csv.name}</TableCell>
                <TableCell>{csv.description}</TableCell>
                <TableCell>{csv.columns}</TableCell>
                <TableCell className="text-right">{csv.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FilesPage;
