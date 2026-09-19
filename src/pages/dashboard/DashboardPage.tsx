import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  BookCheck,
  BookX,
  Bookmark,
  Users,
  AlertTriangle,
  PlusCircle,
  ArrowRight,
  BookPlus,
  GraduationCap,
  Feather,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { CirculationChart } from '../../components/dashboard/CirculationChart';
import { RecentActivityList } from '../../components/dashboard/RecentActivityList';
import { UpcomingReturnsList } from '../../components/dashboard/UpcomingReturnsList';
import { DASHBOARD_STATS } from '../../constants/dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        icon={<LayoutDashboard className="w-6 h-6 text-[#005b7f]" />}
        subtitle="Real-time status of library inventory, circulation, students, and activities"
      >
        <Link
          to="/issuing"
          className="inline-flex items-center gap-2 bg-[#005b7f] hover:bg-[#004d6b] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          <BookPlus size={15} /> Issue New Book
        </Link>
      </PageHeader>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Books"
          value={DASHBOARD_STATS.totalBooks}
          icon={BookOpen}
          change="+120 this month"
          color="text-[#005b7f]"
          bgIconColor="bg-[#005b7f]/10"
        />
        <StatCard
          title="Available"
          value={DASHBOARD_STATS.availableBooks}
          icon={BookCheck}
          subtitle="71% in stock"
          color="text-emerald-700"
          bgIconColor="bg-emerald-100"
        />
        <StatCard
          title="Borrowed"
          value={DASHBOARD_STATS.borrowedBooks}
          icon={BookX}
          subtitle="Active circulations"
          color="text-amber-700"
          bgIconColor="bg-amber-100"
        />
        <StatCard
          title="Reserved"
          value={DASHBOARD_STATS.reservedBooks}
          icon={Bookmark}
          subtitle="Queue holds"
          color="text-purple-700"
          bgIconColor="bg-purple-100"
        />
        <StatCard
          title="Total Members"
          value={DASHBOARD_STATS.totalMembers}
          icon={Users}
          change="+45 new"
          color="text-blue-700"
          bgIconColor="bg-blue-100"
        />
        <StatCard
          title="Overdue"
          value={DASHBOARD_STATS.overdueBooks}
          icon={AlertTriangle}
          isPositive={false}
          subtitle="Pending return"
          color="text-red-700"
          bgIconColor="bg-red-100"
        />
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/issuing"
          className="bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-[#005b7f] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005b7f]/10 text-[#005b7f] flex items-center justify-center group-hover:bg-[#005b7f] group-hover:text-white transition-colors">
              <BookPlus size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Issue / Borrow</h4>
              <p className="text-[11px] text-gray-500">Record book checkout</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-[#005b7f] group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/books"
          className="bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-[#005b7f] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <PlusCircle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Add Book</h4>
              <p className="text-[11px] text-gray-500">New accession entry</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/members"
          className="bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-[#005b7f] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Add Student</h4>
              <p className="text-[11px] text-gray-500">Register new member</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/authors"
          className="bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-[#005b7f] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Feather size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Add Author</h4>
              <p className="text-[11px] text-gray-500">Manage author profiles</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Circulation Chart */}
      <CirculationChart />

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingReturnsList />
        <RecentActivityList />
      </div>
    </div>
  );
};
