export type MemberStatus = 'Active' | 'Inactive' | 'Suspended';
export type MembershipType = 'Student' | 'Faculty' | 'Staff' | 'Research Scholar';

export interface Member {
  id: string;
  studentId: string; // e.g. "STU-1001" or "001"
  name: string;
  faculty: string; // Department / faculty e.g. "Computer Science & Engineering"
  email: string;
  contactNo: string;
  membershipType: MembershipType;
  booksBorrowed: number;
  dueBooks: number;
  status: MemberStatus;
  registrationDate: string;
  avatar?: string;
  address?: string;
  semester?: string;
  maxBorrowLimit?: number;
}
