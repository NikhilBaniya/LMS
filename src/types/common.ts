export type StatusType = 'Available' | 'Borrowed' | 'Reserved' | 'Active' | 'Inactive' | 'Pending' | 'Returned' | 'Overdue' | 'Ready' | 'Completed' | 'Cancelled';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface FilterOptions {
  searchQuery: string;
  categoryFilter?: string;
  statusFilter?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Librarian' | 'Assistant Librarian' | 'Staff';
  avatar?: string;
}
