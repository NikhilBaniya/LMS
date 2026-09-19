import React from 'react';
import { StatusType, BookStatus, MemberStatus, BorrowingStatus, ReservationStatus } from '../../types';

export interface StatusBadgeProps {
  status: StatusType | BookStatus | MemberStatus | BorrowingStatus | ReservationStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const normalized = status.toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case 'available':
      case 'active':
      case 'completed':
      case 'on time':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'borrow':
      case 'borrowed':
      case 'ready':
      case 'due soon':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'returned':
        return 'bg-blue-100 text-[#005b7f] border-blue-200';
      case 'reserved':
      case 'pending':
      case 'renewed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'overdue':
      case 'inactive':
      case 'cancelled':
      case 'out of stock':
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${getStyle()} ${sizeStyles[size]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {status}
    </span>
  );
};
