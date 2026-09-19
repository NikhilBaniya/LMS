import React from 'react';
import { SquarePen, Trash2, Eye } from 'lucide-react';
import { Member } from '../../types';

export interface StudentTableProps {
  students: Member[];
  onEdit: (student: Member) => void;
  onDelete: (student: Member) => void;
  onView: (student: Member) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 tracking-tight">
        Student Lists
      </h3>

      <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          {/* Header matching Screenshot 5 */}
          <thead>
            <tr className="bg-[#56595d] text-white text-xs sm:text-sm font-semibold divide-x divide-gray-400/40">
              <th className="py-3 px-4 sm:px-5">StudentID</th>
              <th className="py-3 px-4 sm:px-5 min-w-[160px]">Name</th>
              <th className="py-3 px-4 sm:px-5 min-w-[180px]">Faculty</th>
              <th className="py-3 px-4 sm:px-5">Email</th>
              <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Contact No.</th>
              <th className="py-3 px-4 sm:px-5 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-800">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">
                  No students found in the directory.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors divide-x divide-gray-200"
                >
                  <td className="py-3 px-4 sm:px-5 font-semibold text-gray-900 whitespace-nowrap">
                    {student.studentId}
                  </td>
                  <td className="py-3 px-4 sm:px-5 font-medium text-gray-900">
                    <button
                      onClick={() => onView(student)}
                      className="text-left hover:text-[#005b7f] hover:underline cursor-pointer"
                    >
                      {student.name}
                    </button>
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-gray-700">{student.faculty}</td>
                  <td className="py-3 px-4 sm:px-5 text-gray-600 font-mono text-xs">
                    {student.email}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-gray-700 whitespace-nowrap font-mono text-xs">
                    {student.contactNo}
                  </td>
                  <td className="py-3 px-4 sm:px-5">
                    {/* Action icons matching Screenshot 5 */}
                    <div className="flex items-center justify-center gap-3 text-[#005b7f]">
                      <button
                        onClick={() => onView(student)}
                        title="View Details"
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-[#005b7f] transition-colors cursor-pointer"
                        aria-label="View Details"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => onEdit(student)}
                        title="Edit Student"
                        className="p-1 rounded-md hover:bg-gray-100 text-[#005b7f] hover:text-[#00425c] transition-colors cursor-pointer"
                        aria-label="Edit Student"
                      >
                        <SquarePen size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(student)}
                        title="Delete Student"
                        className="p-1 rounded-md hover:bg-red-50 text-[#005b7f] hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Delete Student"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
