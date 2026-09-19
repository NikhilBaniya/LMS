import React, { useState, useMemo } from 'react';
import { CalendarCheck, Check, X, Bell, Edit2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchInput } from '../../components/common/SearchInput';
import { EditReservationModal } from '../../components/reservations/EditReservationModal';
import { Button } from '../../components/ui/Button';
import { INITIAL_RESERVATIONS } from '../../constants/reservations';
import { Reservation } from '../../types';

export const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Ready' | 'Completed' | 'Cancelled'>('All');
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchQuery =
        !searchQuery.trim() ||
        r.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.bookId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.memberId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'All' || r.status === statusFilter;

      return matchQuery && matchStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  const handleUpdateStatus = (id: string, newStatus: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleSaveEditedReservation = (updated: Reservation) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    setEditingReservation(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Book Reservations & Holds"
        icon={<CalendarCheck className="w-6 h-6 text-[#005b7f]" />}
        subtitle="Manage hold queues, availability alerts, and student pickup fulfillment"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs">
            {(['All', 'Pending', 'Ready', 'Completed', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#005b7f] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <div className="w-60">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search reservation..."
            />
          </div>
        </div>
      </PageHeader>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-50/80">
                <th className="py-3.5 px-4 sm:px-6">Hold ID</th>
                <th className="py-3.5 px-4 sm:px-6 min-w-[200px]">Book Title</th>
                <th className="py-3.5 px-4 sm:px-6">Student</th>
                <th className="py-3.5 px-4 sm:px-6">Reserved Date</th>
                <th className="py-3.5 px-4 sm:px-6">Expiry Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Queue #</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-800">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-500 font-medium">
                    No reservations matching current filters.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-gray-900">
                      {res.reservationId}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                      <div>{res.bookTitle}</div>
                      <div className="text-[11px] text-gray-500 font-mono">ID: {res.bookId} • ISBN: {res.isbn}</div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-gray-800">{res.memberName}</div>
                      <div className="text-[11px] text-gray-500">ID: {res.memberId}</div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-600 font-mono text-xs">
                      {res.reservationDate}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-600 font-mono text-xs">
                      {res.expiryDate}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 font-bold text-xs text-gray-800">
                        {res.priorityQueueNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <StatusBadge status={res.status} />
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="edit"
                          size="sm"
                          icon={<Edit2 size={12} />}
                          onClick={() => setEditingReservation(res)}
                          className="px-2.5 py-1 text-xs"
                        >
                          Edit
                        </Button>
                        {res.status === 'Pending' && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<Bell size={12} />}
                            onClick={() => handleUpdateStatus(res.id, 'Ready')}
                            className="px-2.5 py-1 text-xs"
                          >
                            Ready
                          </Button>
                        )}
                        {res.status === 'Ready' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<Check size={12} className="text-emerald-600" />}
                            onClick={() => handleUpdateStatus(res.id, 'Completed')}
                            className="px-2.5 py-1 text-xs text-emerald-700 bg-emerald-50 border-emerald-200"
                          >
                            Fulfill
                          </Button>
                        )}
                        {(res.status === 'Pending' || res.status === 'Ready') && (
                          <button
                            onClick={() => handleUpdateStatus(res.id, 'Cancelled')}
                            title="Cancel Reservation"
                            className="p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Reservation Modal */}
      <EditReservationModal
        reservation={editingReservation}
        isOpen={Boolean(editingReservation)}
        onClose={() => setEditingReservation(null)}
        onSave={handleSaveEditedReservation}
      />
    </div>
  );
};
