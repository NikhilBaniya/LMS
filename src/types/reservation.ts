export type ReservationStatus = 'Pending' | 'Ready' | 'Completed' | 'Cancelled';

export interface Reservation {
  id: string;
  reservationId: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  reservationDate: string;
  expiryDate: string;
  status: ReservationStatus;
  priorityQueueNumber: number;
  pickupLocation?: string;
  notes?: string;
}
