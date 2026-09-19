import React, { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StudentForm } from '../../components/members/StudentForm';
import { StudentTable } from '../../components/members/StudentTable';
import { StudentDetailsModal } from '../../components/members/StudentDetailsModal';
import { EditStudentModal } from '../../components/members/EditStudentModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { SearchInput } from '../../components/common/SearchInput';
import { INITIAL_MEMBERS } from '../../constants/members';
import { Member } from '../../types';

export const MembersPage: React.FC = () => {
  const [students, setStudents] = useState<Member[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState<Member | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Member | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Member | null>(null);
  const navigate = useNavigate();

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const query = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.studentId.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query) ||
        s.faculty.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.contactNo.includes(query)
    );
  }, [students, searchQuery]);

  // Compute next auto-assigned student ID
  const nextStudentId = useMemo(() => {
    const numericIds = students
      .map((s) => parseInt(s.studentId, 10))
      .filter((n) => !isNaN(n));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : students.length;
    return String(maxId + 1).padStart(3, '0');
  }, [students]);

  const handleAddStudent = (
    studentData: Omit<Member, 'id' | 'booksBorrowed' | 'dueBooks' | 'status' | 'registrationDate'>
  ) => {
    const newStudent: Member = {
      id: `mem-${Date.now()}`,
      studentId: studentData.studentId || nextStudentId,
      name: studentData.name,
      faculty: studentData.faculty,
      email: studentData.email,
      contactNo: studentData.contactNo,
      membershipType: studentData.membershipType || 'Student',
      booksBorrowed: 0,
      dueBooks: 0,
      status: 'Active',
      registrationDate: new Date().toISOString().split('T')[0],
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleSaveEditedStudent = (updatedStudent: Member) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    if (selectedStudent && selectedStudent.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
    setEditingStudent(null);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      setStudentToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header - Matching Screenshot 5 */}
      <PageHeader
        title="Add Students"
        icon={<GraduationCap className="w-6 h-6 text-[#005b7f]" />}
      >
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search student or faculty..."
          />
        </div>
      </PageHeader>

      {/* Top Form Card - Matching Screenshot 5 */}
      <StudentForm
        onAddStudent={handleAddStudent}
        autoStudentId={nextStudentId}
        isEditing={false}
      />

      {/* Bottom Table Card - Matching Screenshot 5 */}
      <StudentTable
        students={filteredStudents}
        onEdit={(student) => setEditingStudent(student)}
        onDelete={(student) => setStudentToDelete(student)}
        onView={(student) => setSelectedStudent(student)}
      />

      {/* Student Details Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        onEdit={(s) => {
          setSelectedStudent(null);
          setEditingStudent(s);
        }}
        onIssueBook={(s) => {
          setSelectedStudent(null);
          navigate(`/issuing?userId=${s.studentId}`);
        }}
      />

      {/* Edit Student Modal with all editable fields */}
      <EditStudentModal
        student={editingStudent}
        isOpen={Boolean(editingStudent)}
        onClose={() => setEditingStudent(null)}
        onSave={handleSaveEditedStudent}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(studentToDelete)}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message={`Are you sure you want to remove "${studentToDelete?.name}" (ID: ${studentToDelete?.studentId}) from the student registry?`}
        confirmText="Delete Student"
      />
    </div>
  );
};
