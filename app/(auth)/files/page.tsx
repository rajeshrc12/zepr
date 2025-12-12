"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCsvs } from "@/hooks/api/useCsvs";
import api from "@/lib/api";
import { CsvType } from "@/types/db";

const FilesPage = () => {
  const { data: csvs, refetch } = useCsvs();
  console.log(csvs);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      console.log("file not fount");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/csv", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      if (res.status === 200) {
        console.log("success", res);
        refetch();
      }
    } catch {
      console.log("CSV upload failed, Try another csv");
    } finally {
    }
  };

  return (
    <div className="flex flex-col relative overflow-y-auto gap-5">
      <div className="p-3 sticky border-b">
        <div className="font-bold text-xl">My Files</div>
        <div className="text-sm text-[#64748B]">
          Uploads and files created Julius{" "}
        </div>
      </div>{" "}
      <div className="px-10">
        <Input onChange={handleFile} accept=".csv" type="file" />
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-10">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvs?.map((csv: CsvType) => (
              <TableRow key={csv.id}>
                <TableCell className="font-medium">{csv.name}</TableCell>
                <TableCell>{csv.description}</TableCell>
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
