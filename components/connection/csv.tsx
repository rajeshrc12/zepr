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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ name, description }));

    try {
      const res = await axios.post("/api/connection/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.status === 200, res.data?.rows);

      if (res.status === 200 && res.data?.rows) {
        toast.success("CSV Uploaded Successfully");
        router.push("/connection");
        return;
      }
      toast.error("CSV Upload failed");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
              id="picture"
              type="file"
              onChange={handleChange}
              accept=".csv"
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="name">File Name *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="description">File Description *</Label>
            <Textarea
              value={description}
              id={"description"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
