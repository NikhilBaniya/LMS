import React from 'react';
import { UPCOMING_RETURNS } from '../../constants/dashboard';
import { Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UpcomingReturnsList: React.FC = () => {
  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-6 border border-gray-200/70 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Upcoming Due & Overdue Returns
        </h3>
        <Link
          to="/transaction"
          className="text-xs font-semibold text-[#005b7f] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {UPCOMING_RETURNS.map((item) => (
          <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors">
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs font-bold text-gray-900 truncate">{item.bookTitle}</h4>
              <p className="text-[11px] text-gray-600">
                Borrower: <span className="font-semibold">{item.studentName}</span> ({item.studentId})
              </p>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Clock size={11} /> Due: {item.dueDate}
              </div>
            </div>

            <div className="shrink-0">
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                  item.status === 'Overdue'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.status === 'Overdue' && <AlertCircle size={12} />}
                {item.status} ({item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d overdue` : `${item.daysRemaining}d left`})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
