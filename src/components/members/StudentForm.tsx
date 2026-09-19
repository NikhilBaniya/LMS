import React, { useState } from 'react';
import { Member } from '../../types';
import { Button } from '../ui/Button';

export interface StudentFormProps {
  onAddStudent: (student: Omit<Member, 'id' | 'booksBorrowed' | 'dueBooks' | 'status' | 'registrationDate'>) => void;
  autoStudentId?: string;
  initialValues?: Partial<Member>;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  onAddStudent,
  autoStudentId = '001',
  initialValues,
  isEditing = false,
  onCancelEdit,
}) => {
  const currentStudentId = initialValues?.studentId || autoStudentId;
  const [faculty, setFaculty] = useState(initialValues?.faculty || '');
  const [name, setName] = useState(initialValues?.name || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [contactNo, setContactNo] = useState(initialValues?.contactNo || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStudent({
      studentId: currentStudentId,
      faculty: faculty.trim() || 'General Studies',
      name: name.trim(),
      email: email.trim(),
      contactNo: contactNo.trim(),
      membershipType: initialValues?.membershipType || 'Student',
    });

    if (!isEditing) {
      setFaculty('');
      setName('');
      setEmail('');
      setContactNo('');
    }
  };

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Student ID & Faculty - Auto-assigned student ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Student ID
              </label>
              <span className="text-[11px] font-medium text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-md">
                Auto-assigned
              </span>
            </div>
            <input
              type="text"
              value={currentStudentId}
              disabled
              readOnly
              className="w-full bg-[#dbe0e6]/70 border border-gray-300/80 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-mono cursor-not-allowed select-none focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Faculty
            </label>
            <input
              type="text"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              placeholder="e.g. Computer Engineering (IOE Pulchowk)"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Row 2: Full Name - Exact layout from Screenshot 5 */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Suman Thapa / Anisha Sharma"
            required
            className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
          />
        </div>

        {/* Row 3: Email & Contact No. - Exact layout from Screenshot 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@ioe.edu.np"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Contact No.
            </label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              placeholder="+977-9841234567"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Action Button - Exact 'Add Student' teal button from Screenshot 5 */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            className="text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
          >
            {isEditing ? 'Update Student' : 'Add Student'}
          </Button>

          {isEditing && onCancelEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancelEdit}
              className="rounded-xl"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

