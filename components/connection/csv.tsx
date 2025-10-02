"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaFileCsv } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

const Csv = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!file || !name.trim() || !description.trim()) {
      toast.error("Fill all details");
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      return;
    }
    setIsLoading((prev) => !prev);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ name, description }));

    try {
      const res = await axios.post("/api/connection/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 && res.data?.rows) {
        toast.success("CSV Uploaded Successfully");
        router.push("/connection");
        return;
      }
    } catch {
      toast.error("CSV upload failed, Try another csv");
    }
    setIsLoading((prev) => !prev);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="w-40 flex justify-start">
          <FaFileCsv /> CSV
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add CSV File</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="picture">File upload *</Label>
            <Input
              disabled={isLoading}
              id="picture"
              type="file"
              onChange={handleChange}
              accept=".csv"
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="name">File Name *</Label>
            <Input
              disabled={isLoading}
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="description">File Description *</Label>
            <Textarea
              disabled={isLoading}
              value={description}
              id={"description"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-700 mb-2">CSV Guidelines</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ">
              <li>
                File limit is <b>1MB</b>
              </li>
              <li>
                Do not add <b>empty lines</b> in the CSV.
              </li>
              <li>
                The <b>first row</b> should contain column names.
              </li>
              <li>There should not be any merged cells.</li>
              <li>
                Each column should have<b> consistent data </b>according to its
                type.
              </li>
            </ul>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="flex gap-3">
                Saving
                <ImSpinner2 size={20} className="animate-spin" color="white" />
              </div>
            ) : (
              "Save"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Csv;
