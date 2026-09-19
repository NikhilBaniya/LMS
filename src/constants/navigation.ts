export interface NavItem {
  id: string;
  name: string;
  path: string;
  iconName: 'LayoutDashboard' | 'Settings' | 'Feather' | 'BookOpen' | 'GraduationCap' | 'ArrowLeftRight' | 'BookPlus' | 'Layers' | 'CalendarCheck' | 'BarChart3';
  description?: string;
  badge?: number;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    iconName: 'LayoutDashboard',
  },
  {
    id: 'setting',
    name: 'Setting',
    path: '/settings',
    iconName: 'Settings',
  },
  {
    id: 'author',
    name: 'Author',
    path: '/authors',
    iconName: 'Feather',
  },
  {
    id: 'books',
    name: 'Books',
    path: '/books',
    iconName: 'BookOpen',
  },
  {
    id: 'students',
    name: 'Students',
    path: '/members',
    iconName: 'GraduationCap',
  },
  {
    id: 'transaction',
    name: 'Transaction',
    path: '/transaction',
    iconName: 'ArrowLeftRight',
  },
  {
    id: 'issuing',
    name: 'Issuing',
    path: '/issuing',
    iconName: 'BookPlus',
  },
  {
    id: 'categories',
    name: 'Categories',
    path: '/categories',
    iconName: 'Layers',
  },
  {
    id: 'reservations',
    name: 'Reservations',
    path: '/reservations',
    iconName: 'CalendarCheck',
  },
  {
    id: 'reports',
    name: 'Reports',
    path: '/reports',
    iconName: 'BarChart3',
  },
];
