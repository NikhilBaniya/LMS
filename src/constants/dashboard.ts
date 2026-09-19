export interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  reservedBooks: number;
  totalMembers: number;
  overdueBooks: number;
  totalAuthors: number;
  todayTransactions: number;
}

export const DASHBOARD_STATS: DashboardStats = {
  totalBooks: 14580,
  availableBooks: 10420,
  borrowedBooks: 3780,
  reservedBooks: 380,
  totalMembers: 4250,
  overdueBooks: 86,
  totalAuthors: 520,
  todayTransactions: 94,
};

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  type: 'borrow' | 'return' | 'reserve' | 'member' | 'book';
}

export const RECENT_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'Issued Book',
    user: 'Anisha Sharma (IOE-001)',
    target: 'Muna Madan (मुनामदन) - Laxmi Prasad Devkota',
    timestamp: '10 mins ago',
    type: 'borrow',
  },
  {
    id: 'act-2',
    action: 'Returned Book',
    user: 'Suman Thapa (CDCSIT-002)',
    target: 'Karnali Blues (कर्णाली ब्लुज)',
    timestamp: '35 mins ago',
    type: 'return',
  },
  {
    id: 'act-3',
    action: 'New Reservation',
    user: 'Rojina Karki (PKC-003)',
    target: 'Shiris Ko Phool (शिरीषको फूल)',
    timestamp: '1 hour ago',
    type: 'reserve',
  },
  {
    id: 'act-4',
    action: 'New Student Registered',
    user: 'Bibek Shrestha',
    target: 'Faculty of Management (Shanker Dev Campus)',
    timestamp: '2 hours ago',
    type: 'member',
  },
  {
    id: 'act-5',
    action: 'Added New Book Accession',
    user: 'Admin Roshan Adhikari',
    target: 'Computer Networks & Distributed Systems in Nepal (Qty: 20)',
    timestamp: '4 hours ago',
    type: 'book',
  },
];

export interface UpcomingReturn {
  id: string;
  bookTitle: string;
  studentName: string;
  studentId: string;
  dueDate: string;
  daysRemaining: number;
  status: 'Due Soon' | 'Overdue' | 'On Time';
}

export const UPCOMING_RETURNS: UpcomingReturn[] = [
  {
    id: 'ur-1',
    bookTitle: 'Muna Madan (मुनामदन)',
    studentName: 'Anisha Sharma',
    studentId: '001',
    dueDate: '2024-03-11',
    daysRemaining: 2,
    status: 'Due Soon',
  },
  {
    id: 'ur-2',
    bookTitle: 'Computer Networks & Distributed Systems in Nepal',
    studentName: 'Suman Thapa',
    studentId: '002',
    dueDate: '2024-03-10',
    daysRemaining: 1,
    status: 'Due Soon',
  },
  {
    id: 'ur-3',
    bookTitle: 'Shiris Ko Phool (शिरीषको फूल)',
    studentName: 'Rojina Karki',
    studentId: '003',
    dueDate: '2024-03-09',
    daysRemaining: 0,
    status: 'Due Soon',
  },
  {
    id: 'ur-4',
    bookTitle: 'Engineering Mathematics: IOE & TU Curriculum',
    studentName: 'Kiran Pokharel',
    studentId: '007',
    dueDate: '2024-03-01',
    daysRemaining: -8,
    status: 'Overdue',
  },
];

export const MONTHLY_CIRCULATION_DATA = [
  { month: 'Baisakh', borrowed: 2150, returned: 1980, reserved: 240 },
  { month: 'Jestha', borrowed: 2680, returned: 2450, reserved: 350 },
  { month: 'Ashadh', borrowed: 3120, returned: 2900, reserved: 420 },
  { month: 'Shrawan', borrowed: 2750, returned: 2680, reserved: 310 },
  { month: 'Bhadra', borrowed: 2320, returned: 2400, reserved: 220 },
  { month: 'Ashwin', borrowed: 1850, returned: 2010, reserved: 180 },
];
