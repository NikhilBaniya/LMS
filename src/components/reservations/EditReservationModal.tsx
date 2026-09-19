import React, { useState, useEffect } from 'react';
import { X, CalendarCheck, Save } from 'lucide-react';
import { Reservation, ReservationStatus } from '../../types/reservation';
import { Button } from '../ui/Button';

interface EditReservationModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedReservation: Reservation) => void;
}

export const EditReservationModal: React.FC<EditReservationModalProps> = ({
  reservation,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Reservation | null>(null);

  useEffect(() => {
    if (reservation) {
      setFormData({ ...reservation });
    }
  }, [reservation]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Reservation, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005b7f]/10 flex items-center justify-center text-[#005b7f]">
              <CalendarCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Edit Reservation</h2>
              <p className="text-xs text-gray-500 font-mono">Hold ID: {formData.reservationId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Hold ID
                </label>
                <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  Auto-assigned
                </span>
              </div>
              <input
                type="text"
                value={formData.reservationId}
                disabled
                readOnly
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 font-mono cursor-not-allowed select-none focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as ReservationStatus)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Book Title
            </label>
            <input
              type="text"
              value={formData.bookTitle}
              onChange={(e) => handleChange('bookTitle', e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Student Name
            </label>
            <input
              type="text"
              value={formData.memberName}
              onChange={(e) => handleChange('memberName', e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Reserved Date
              </label>
              <input
                type="date"
                value={formData.reservationDate}
                onChange={(e) => handleChange('reservationDate', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Queue #
              </label>
              <input
                type="number"
                min="1"
                value={formData.priorityQueueNumber}
                onChange={(e) => handleChange('priorityQueueNumber', parseInt(e.target.value, 10) || 1)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Save size={16} />}
              className="px-6 py-2.5 bg-[#005b7f] hover:bg-[#004d6b]"
            >
              Update Reservation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
