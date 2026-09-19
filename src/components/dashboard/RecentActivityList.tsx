import React from 'react';
import { RECENT_ACTIVITIES } from '../../constants/dashboard';
import { BookOpen, RotateCcw, Bookmark, UserPlus, BookPlus } from 'lucide-react';

export const RecentActivityList: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'borrow':
        return <BookPlus size={16} className="text-[#005b7f]" />;
      case 'return':
        return <RotateCcw size={16} className="text-emerald-600" />;
      case 'reserve':
        return <Bookmark size={16} className="text-purple-600" />;
      case 'member':
        return <UserPlus size={16} className="text-blue-600" />;
      case 'book':
        return <BookOpen size={16} className="text-amber-600" />;
      default:
        return <BookOpen size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-6 border border-gray-200/70 shadow-xs">
      <h3 className="text-base font-bold text-gray-900 tracking-tight mb-4">
        Recent Library Activities
      </h3>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {RECENT_ACTIVITIES.map((act) => (
          <div key={act.id} className="p-3.5 flex items-start gap-3 hover:bg-gray-50/80 transition-colors">
            <div className="p-2 rounded-lg bg-gray-100 shrink-0 mt-0.5">
              {getIcon(act.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-gray-900">{act.action}</span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.timestamp}</span>
              </div>
              <p className="text-xs text-gray-700 truncate font-medium">{act.user}</p>
              <p className="text-[11px] text-gray-500 truncate">{act.target}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
