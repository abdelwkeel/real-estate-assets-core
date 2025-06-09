import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* المحتوى */}
      <main className="flex-1 p-6 mr-64 bg-gray-50 min-h-screen">
        {children}
      </main>

      {/* الشريط الجانبي */}
      <Sidebar />
    </div>
  );
}
