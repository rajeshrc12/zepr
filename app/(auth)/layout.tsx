import Leftbar from "@/components/leftbar";
import Rightbar from "@/components/rightbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Leftbar />
      {children}
      <Rightbar />
    </div>
  );
}
