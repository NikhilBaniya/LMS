import React from 'react';
import { MONTHLY_CIRCULATION_DATA } from '../../constants/dashboard';

export const CirculationChart: React.FC = () => {
  const maxVal = 3200;

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-6 border border-gray-200/70 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Monthly Book Circulation & Flow
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Borrowing trends vs Returns over past 6 months
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#005b7f]" />
            <span className="text-gray-700 font-medium">Borrowed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-600" />
            <span className="text-gray-700 font-medium">Returned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-purple-500" />
            <span className="text-gray-700 font-medium">Reserved</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-6 pt-4 px-2">
          {MONTHLY_CIRCULATION_DATA.map((item) => {
            const borrowHeight = (item.borrowed / maxVal) * 100;
            const returnHeight = (item.returned / maxVal) * 100;
            const reserveHeight = (item.reserved / maxVal) * 100;

            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-44">
                  {/* Borrow bar */}
                  <div
                    title={`Borrowed: ${item.borrowed}`}
                    className="w-full max-w-[16px] sm:max-w-[20px] bg-[#005b7f] rounded-t-sm transition-all duration-300 hover:opacity-80"
                    style={{ height: `${borrowHeight}%` }}
                  />
                  {/* Return bar */}
                  <div
                    title={`Returned: ${item.returned}`}
                    className="w-full max-w-[16px] sm:max-w-[20px] bg-emerald-600 rounded-t-sm transition-all duration-300 hover:opacity-80"
                    style={{ height: `${returnHeight}%` }}
                  />
                  {/* Reserved bar */}
                  <div
                    title={`Reserved: ${item.reserved}`}
                    className="w-full max-w-[16px] sm:max-w-[20px] bg-purple-500 rounded-t-sm transition-all duration-300 hover:opacity-80"
                    style={{ height: `${reserveHeight}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
