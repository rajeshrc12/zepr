"use client";

import { useLayout } from "@/hooks/ui/useLayout";

const Rightbar = () => {
  const { right } = useLayout((state) => state);
  if (right) return <div className="w-[550px] border-l text-sm">Rightbar</div>;
};

export default Rightbar;
