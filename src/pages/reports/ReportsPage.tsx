import React, { useState } from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/ui/Button';
import { INITIAL_BOOKS } from '../../constants/books';
import { INITIAL_TRANSACTIONS } from '../../constants/borrowing';

export const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'circulation' | 'overdue' | 'inventory'>('circulation');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setExportNotice(`Exported ${type.toUpperCase()} report successfully! Download starting...`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Library Reports & Analytics"
        icon={<BarChart3 className="w-6 h-6 text-[#005b7f]" />}
        subtitle="Detailed audits, inventory valuation, circulation statistics, and compliance exports"
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Printer size={14} />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Download size={14} />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
        </div>
      </PageHeader>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
          {exportNotice}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setReportType('circulation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === 'circulation'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Circulation & Issue Audit
        </button>
        <button
          onClick={() => setReportType('overdue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === 'overdue'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Overdue & Fine Collection
        </button>
        <button
          onClick={() => setReportType('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === 'inventory'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Catalog & Inventory Stock
        </button>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Transactions (YTD)"
          value="4,892"
          icon={BarChart3}
          subtitle="Circulation events"
        />
        <StatCard
          title="Fines Collected (YTD)"
          value="Rs. 48,250"
          icon={BarChart3}
          subtitle="Late return fees collected"
          color="text-emerald-700"
          bgIconColor="bg-emerald-100"
        />
        <StatCard
          title="Catalog Health"
          value="98.4%"
          icon={BarChart3}
          subtitle="Active circulating titles"
          color="text-blue-700"
          bgIconColor="bg-blue-100"
        />
      </div>

      {/* Report Data Preview Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {reportType === 'circulation' && 'Circulation Ledger Record'}
            {reportType === 'overdue' && 'Overdue Loans & Penalties Summary'}
            {reportType === 'inventory' && 'Inventory Status by Classification'}
          </h3>
          <span className="text-xs text-gray-500">Showing last updated records</span>
        </div>

        <div className="overflow-x-auto">
          {reportType === 'circulation' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">T_ID</th>
                  <th className="py-3 px-4">Book ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {INITIAL_TRANSACTIONS.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold">{trx.tId}</td>
                    <td className="py-3 px-4 font-mono">{trx.bookId}</td>
                    <td className="py-3 px-4 font-medium">{trx.bookTitle}</td>
                    <td className="py-3 px-4">{trx.userId}</td>
                    <td className="py-3 px-4 font-semibold text-[#005b7f]">{trx.transactionType}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">{trx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'overdue' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Faculty</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Days Overdue</th>
                  <th className="py-3 px-4">Assessed Fine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">Kiran Pokharel (STU-007)</td>
                  <td className="py-3 px-4">Civil Engineering (IOE - WRC)</td>
                  <td className="py-3 px-4 font-medium">Engineering Mathematics: IOE & TU Curriculum</td>
                  <td className="py-3 px-4 font-mono text-red-600">2026-03-01</td>
                  <td className="py-3 px-4 font-bold text-red-600">6 days</td>
                  <td className="py-3 px-4 font-bold text-gray-900">Rs. 60</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">Suman Thapa (STU-002)</td>
                  <td className="py-3 px-4">CDCSIT - Tribhuvan University</td>
                  <td className="py-3 px-4 font-medium">Computer Networks & Distributed Systems in Nepal</td>
                  <td className="py-3 px-4 font-mono text-red-600">2026-02-28</td>
                  <td className="py-3 px-4 font-bold text-red-600">8 days</td>
                  <td className="py-3 px-4 font-bold text-gray-900">Rs. 80</td>
                </tr>
              </tbody>
            </table>
          )}

          {reportType === 'inventory' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Book ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Genre / Category</th>
                  <th className="py-3 px-4">Total Copies</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {INITIAL_BOOKS.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold">{b.bookId}</td>
                    <td className="py-3 px-4 font-medium">{b.title}</td>
                    <td className="py-3 px-4">{b.genre}</td>
                    <td className="py-3 px-4 font-semibold">{b.quantity}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{b.availableCopies}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-xs">{b.shelfLocation || 'Main Hall'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
