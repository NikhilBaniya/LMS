import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-[#005b7f] transition-colors"
      >
        <Home size={13} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="text-gray-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-gray-800">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-[#005b7f] transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
