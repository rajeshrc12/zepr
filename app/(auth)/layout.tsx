import Navbar from "@/components/navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
