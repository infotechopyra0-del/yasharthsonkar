import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-[#B7AEA3] overflow-hidden" data-scroll-behavior="smooth">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 lg:ml-72 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}