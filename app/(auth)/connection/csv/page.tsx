"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddConnectionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const handleFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/connection/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        router.push("/connection");
        return;
      }
      alert("failed");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex relative">
      <div className="h-screen sticky top-0 left-0 bg-gray-200 px-10 w-[500px] flex flex-col justify-center">
        <div className="font-medium text-2xl">
          <div>Complete connection setup </div>
          <div className="font-medium text-xl text-gray-500">
            You can edit this information later
          </div>
        </div>
      </div>
      <div className="px-5 flex flex-col pt-20 gap-5 bg-gray-100 w-full">
        <div className="font-medium text-2xl">Connect CSV</div>
        <div className="flex flex-col bg-white rounded-xl p-3 gap-5">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture" className="font-bold text-lg">
              File upload
            </Label>
            <Input
              id="picture"
              type="file"
              onChange={handleChange}
              accept=".csv"
            />
          </div>
          <div className="flex">
            <Button onClick={handleFile} disabled={!file}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConnectionPage;
