import {
    ArrowLeftRight,
    BarChart3,
    BookOpen,
    BookPlus,
    CalendarCheck,
    Feather,
    GraduationCap,
    Layers,
    LayoutDashboard,
    LogOut,
    Settings,
    X,
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MAIN_NAV_ITEMS } from '../../constants/navigation';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout }) => {
  const getIcon = (iconName: string, active: boolean) => {
    const className = active ? 'text-[#005b7f]' : 'text-white';
    const size = 18;

    switch (iconName) {
      case 'LayoutDashboard':
        return <LayoutDashboard size={size} className={className} />;
      case 'Settings':
        return <Settings size={size} className={className} />;
      case 'Feather':
        return <Feather size={size} className={className} />;
      case 'BookOpen':
        return <BookOpen size={size} className={className} />;
      case 'GraduationCap':
        return <GraduationCap size={size} className={className} />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight size={size} className={className} />;
      case 'BookPlus':
        return <BookPlus size={size} className={className} />;
      case 'Layers':
        return <Layers size={size} className={className} />;
      case 'CalendarCheck':
        return <CalendarCheck size={size} className={className} />;
      case 'BarChart3':
        return <BarChart3 size={size} className={className} />;
      default:
        return <BookOpen size={size} className={className} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-60 sm:w-64 bg-[#005b7f] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Brand / Logo - Exact HCC LIBRARY styling */}
          <div className="pt-7 pb-6 px-6 flex items-center justify-between border-b border-white/10">
            <div>
              <div className="text-xl font-bold tracking-tight leading-tight uppercase font-sans">
                HCC
              </div>
              <div className="text-lg font-semibold tracking-wider uppercase font-sans text-cyan-100">
                LIBRARY
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
            {MAIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors select-none ${
                    isActive
                      ? 'bg-white text-[#005b7f] font-bold shadow-xs'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="shrink-0">{getIcon(item.iconName, isActive)}</span>
                    <span className="truncate">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Log Out Section - Matching Screenshots */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              if (onLogout) onLogout();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={18} className="text-white shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
