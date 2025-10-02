import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-grow flex-col">
      <Navbar />
      {/* Page Content */}
      {children}
    </div>
  );
}
