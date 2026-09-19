import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertTriangle, 
  CalendarClock, 
  BookCheck, 
  UserPlus, 
  Layers,
  X
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'overdue' | 'reservation' | 'return' | 'member' | 'inventory';
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Book Overdue Alert',
    message: "'Seto Dharti' borrowed by Aarav Sharma is 3 days overdue (Fine: NPR 30).",
    time: '15m ago',
    unread: true,
    type: 'overdue',
  },
  {
    id: 'notif-2',
    title: 'Hold Ready for Pickup',
    message: "'Shirishko Phool' has been allocated to Priya Shrestha (Hold #HLD-102).",
    time: '1h ago',
    unread: true,
    type: 'reservation',
  },
  {
    id: 'notif-3',
    title: 'Low Stock Notification',
    message: "'Python Crash Course' has only 1 available copy left in circulation.",
    time: '3h ago',
    unread: true,
    type: 'inventory',
  },
  {
    id: 'notif-4',
    title: 'Book Returned Successfully',
    message: "'Data Structures and Algorithms' returned by Suman Thapa in good condition.",
    time: 'Yesterday',
    unread: false,
    type: 'return',
  },
  {
    id: 'notif-5',
    title: 'New Student Registration',
    message: 'Rohan Karki (STU-005) enrolled from Computer Science faculty.',
    time: '2 days ago',
    unread: false,
    type: 'member',
  },
];

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const displayedNotifications = activeTab === 'unread' 
    ? notifications.filter((n) => n.unread) 
    : notifications;

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle size={15} className="text-red-500" />;
      case 'reservation':
        return <CalendarClock size={15} className="text-blue-500" />;
      case 'return':
        return <BookCheck size={15} className="text-emerald-500" />;
      case 'member':
        return <UserPlus size={15} className="text-purple-500" />;
      case 'inventory':
        return <Layers size={15} className="text-amber-500" />;
    }
  };

  const getTypeBadgeClass = (type: NotificationItem['type']) => {
    switch (type) {
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'reservation':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'return':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'member':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'inventory':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl transition-all cursor-pointer relative ${
          isOpen
            ? 'bg-[#005b7f]/10 text-[#005b7f]'
            : 'text-gray-500 hover:text-[#005b7f] hover:bg-gray-100'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-800">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-[#005b7f] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#005b7f] hover:underline flex items-center gap-1 font-medium cursor-pointer p-1 rounded-md hover:bg-gray-200/50"
                  title="Mark all as read"
                >
                  <CheckCheck size={14} />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                  title="Clear all"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-100 bg-white px-3 pt-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-[#005b7f] text-[#005b7f]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`pb-2 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'unread'
                  ? 'border-[#005b7f] text-[#005b7f]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* List of Notifications */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {displayedNotifications.length === 0 ? (
              <div className="py-10 text-center px-4">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Bell size={18} />
                </div>
                <p className="text-xs font-semibold text-gray-700">No notifications</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {activeTab === 'unread'
                    ? "You're all caught up! No unread alerts."
                    : 'Your notification list is empty.'}
                </p>
              </div>
            ) : (
              displayedNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => toggleReadStatus(notif.id)}
                  className={`p-3 sm:p-3.5 flex items-start gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer relative group ${
                    notif.unread ? 'bg-blue-50/30' : 'bg-white'
                  }`}
                >
                  {/* Icon Indicator */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${getTypeBadgeClass(
                      notif.type
                    )}`}
                  >
                    {getTypeIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4
                        className={`text-xs truncate ${
                          notif.unread
                            ? 'font-bold text-gray-900'
                            : 'font-medium text-gray-700'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  {/* Actions & Unread Dot */}
                  <div className="flex flex-col items-center justify-between self-stretch shrink-0">
                    {notif.unread ? (
                      <span className="w-2 h-2 rounded-full bg-[#005b7f] mt-1" />
                    ) : (
                      <span className="w-2 h-2" />
                    )}
                    <button
                      onClick={(e) => deleteNotification(notif.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-0.5 rounded cursor-pointer transition-opacity"
                      title="Delete"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-gray-50/80 border-t border-gray-100 text-center">
              <span className="text-[11px] text-gray-500">
                Click any notification to toggle read/unread status
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
