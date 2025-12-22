'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Sparkles, RefreshCw, TrendingUp, Activity,
  FolderOpen, Code, Package, MessageSquare, FileText, Users,
  ArrowRight, BarChart3, Zap
} from 'lucide-react';

interface DashboardStats {
  category: string;
  icon: any;
  count: number;
  status: 'active' | 'inactive';
  trend: 'growing' | 'stable' | 'declining';
  color: string;
  bgColor: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats[]>([
    {
      category: 'Total Projects',
      icon: FolderOpen,
      count: 6,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    },
    {
      category: 'Total Services',
      icon: Code,
      count: 3,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    },
    {
      category: 'Software Services',
      icon: Activity,
      count: 3,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    },
    {
      category: 'Additional Services',
      icon: Package,
      count: 13,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    },
    {
      category: 'Quote Requests',
      icon: FileText,
      count: 0,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    },
    {
      category: 'Contacts',
      icon: Users,
      count: 0,
      status: 'active',
      trend: 'growing',
      color: 'text-[#000000]',
      bgColor: 'bg-[#D9D2C9]'
    }
  ]);

  const handleRefresh = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      {/* Header */}
      <header className="bg-[#1A1A1A] shadow-2xl border-b-4 border-[#000000] sticky top-0 z-10">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-black text-[#FFFFFF] flex items-center gap-3">
                Dashboard
                <Sparkles className="text-[#B7AEA3]" size={32} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 flex items-center gap-2">
                Welcome back, Admin!
                <span className="inline-block">👋</span>
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#D9D2C9] text-[#000000] px-6 py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              Refresh
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FFFFFF] shadow-2xl p-8 border-4 border-[#000000]"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#000000] flex items-center justify-center">
                <BarChart3 className="text-[#FFFFFF]" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#000000]">
                  Dashboard Statistics
                </h2>
                <p className="text-[#000000]/60 font-semibold text-sm">
                  Real-time analytics and insights
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#D9D2C9] px-4 py-2">
              <Zap className="w-4 h-4 text-[#000000]" />
              <span className="text-[#000000] font-bold text-sm">Live Data</span>
            </div>
          </div>

          {/* Stats Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A] border-b-4 border-[#000000]">
                  <th className="px-6 py-4 text-left text-sm font-black text-[#FFFFFF] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-black text-[#FFFFFF] uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-black text-[#FFFFFF] uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-black text-[#FFFFFF] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#D9D2C9]">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="hover:bg-[#B7AEA3]/20 transition-colors duration-200"
                    >
                      {/* Category */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`${stat.bgColor} p-3 shadow-md border-2 border-[#000000]/10`}>
                            <Icon className={stat.color} size={24} strokeWidth={2.5} />
                          </div>
                          <span className="font-black text-[#000000] text-base">
                            {stat.category}
                          </span>
                        </div>
                      </td>

                      {/* Icon Status */}
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#000000] text-[#FFFFFF] text-sm font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#B7AEA3] animate-pulse"></span>
                          Active
                        </span>
                      </td>

                      {/* Count */}
                      <td className="px-6 py-5 text-center">
                        <span className="text-4xl font-black text-[#000000]">
                          {stat.count}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D9D2C9] text-[#000000] font-bold text-sm">
                          <TrendingUp size={16} />
                          Growing
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { 
              title: 'Add New Project', 
              icon: FolderOpen, 
              description: 'Create and manage portfolio projects',
              href: '/admin/dashboard/portfolio' 
            },
            { 
              title: 'Manage Services', 
              icon: Code, 
              description: 'Update your service offerings',
              href: '/admin/dashboard/services' 
            },
            { 
              title: 'View Messages', 
              icon: MessageSquare, 
              description: 'Check client inquiries and feedback',
              href: '/admin/dashboard/contacts' 
            }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={index}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group bg-[#FFFFFF] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border-4 border-[#000000] hover:border-[#B7AEA3]"
              >
                <div className="bg-[#1A1A1A] p-6 text-[#FFFFFF] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7AEA3] opacity-10 blur-2xl rounded-full"></div>
                  <Icon size={48} strokeWidth={2} className="mb-4 relative z-10" />
                  <h3 className="text-xl font-black relative z-10">{action.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-[#000000]/70 font-semibold mb-4">{action.description}</p>
                  <div className="flex items-center text-[#000000] font-black group-hover:gap-3 transition-all duration-300 gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Stats Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Items', value: '25', icon: Package, trend: '+12%' },
            { label: 'Active Projects', value: '6', icon: FolderOpen, trend: '+5%' },
            { label: 'Messages', value: '0', icon: MessageSquare, trend: '0%' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="bg-[#1A1A1A] p-6 border-4 border-[#000000] shadow-lg hover:shadow-2xl transition-all duration-300 group hover:border-[#B7AEA3]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#B7AEA3] p-3">
                    <Icon className="text-[#000000]" size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[#B7AEA3] font-black text-sm bg-[#FFFFFF]/10 px-3 py-1">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-4xl font-black text-[#FFFFFF] mb-2">{stat.value}</div>
                <div className="text-[#FFFFFF]/70 font-semibold">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-[#FFFFFF] p-6 border-4 border-[#000000] shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#000000] animate-pulse"></div>
              <span className="font-black text-[#000000]">System Status: All Systems Operational</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#000000]/60">Uptime:</span>
                <span className="font-black text-[#000000]">99.9%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#000000]/60">Response:</span>
                <span className="font-black text-[#000000]">Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#000000]/60">Security:</span>
                <span className="font-black text-[#000000]">Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}