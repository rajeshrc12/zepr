import Sidebar from "@/components/sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      <Sidebar />
      <div className="bg-[#fcfcfc] m-2 flex-1 border rounded-sm">
        {children}
      </div>
    </div>
  );
}
