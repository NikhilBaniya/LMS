import React from 'react';
import { Member } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Avatar } from '../common/Avatar';
import { Button } from '../ui/Button';
import { GraduationCap, Mail, Phone, BookOpen, Calendar, MapPin, Edit } from 'lucide-react';

export interface StudentDetailsModalProps {
  student: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (student: Member) => void;
  onIssueBook?: (student: Member) => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  student,
  isOpen,
  onClose,
  onEdit,
  onIssueBook,
}) => {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile"
      icon={<GraduationCap className="w-5 h-5 text-[#005b7f]" />}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Profile Card Top */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200/70">
          <Avatar name={student.name} src={student.avatar} size="lg" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-gray-900">{student.name}</h4>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-xs text-gray-500 font-mono">ID: {student.studentId} • {student.membershipType}</p>
            <p className="text-xs text-[#005b7f] font-semibold mt-0.5">{student.faculty}</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
            <Mail size={14} className="text-[#005b7f] shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
            <Phone size={14} className="text-[#005b7f] shrink-0" />
            <span>{student.contactNo}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
            <BookOpen size={14} className="text-[#005b7f] shrink-0" />
            <span>Books Borrowed: <strong className="text-gray-900">{student.booksBorrowed}</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60">
            <Calendar size={14} className="text-[#005b7f] shrink-0" />
            <span>Registered: {student.registrationDate}</span>
          </div>
        </div>

        {student.address && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200/60 text-xs text-gray-600">
            <MapPin size={14} className="text-[#005b7f] shrink-0 mt-0.5" />
            <span>{student.address}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-200">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              icon={<Edit size={14} />}
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              Edit Details
            </Button>
          )}
          {onIssueBook && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onIssueBook(student);
              }}
            >
              Issue Book to Student
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
