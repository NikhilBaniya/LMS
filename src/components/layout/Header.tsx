import React from 'react';
import { Menu, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { NotificationDropdown } from './NotificationDropdown';

export interface HeaderProps {
  onMenuClick: () => void;
  onOpenAddAdmin: () => void;
  adminName?: string;
  adminRole?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onOpenAddAdmin,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-gray-200/80 px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Add Admin Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenAddAdmin}
          icon={<UserPlus size={14} className="text-[#005b7f]" />}
          className="hidden md:inline-flex text-xs font-semibold border-gray-300 hover:border-[#005b7f]"
        >
          Add Admin
        </Button>

        {/* Interactive Notifications Bell */}
        <NotificationDropdown />
      </div>
    </header>
  );
};


