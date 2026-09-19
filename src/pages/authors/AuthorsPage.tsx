import React, { useState, useMemo } from 'react';
import { User } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { AuthorForm } from '../../components/authors/AuthorForm';
import { AuthorTable } from '../../components/authors/AuthorTable';
import { EditAuthorModal } from '../../components/authors/EditAuthorModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { SearchInput } from '../../components/common/SearchInput';
import { INITIAL_AUTHORS } from '../../constants/authors';
import { Author } from '../../types';

export const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>(INITIAL_AUTHORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authors;
    const query = searchQuery.toLowerCase();
    return authors.filter(
      (a) =>
        a.authorId.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query) ||
        a.bio.toLowerCase().includes(query)
    );
  }, [authors, searchQuery]);

  // Compute next auto-assigned author ID
  const nextAuthorId = useMemo(() => {
    const numericIds = authors
      .map((a) => parseInt(a.authorId, 10))
      .filter((n) => !isNaN(n));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : authors.length;
    return String(maxId + 1).padStart(3, '0');
  }, [authors]);

  const handleAddAuthor = (
    authorData: Omit<Author, 'id' | 'totalBooks' | 'status'>
  ) => {
    const newAuthor: Author = {
      id: `aut-${Date.now()}`,
      authorId: authorData.authorId || nextAuthorId,
      name: authorData.name,
      bio: authorData.bio,
      genre: authorData.genre || 'General',
      totalBooks: 0,
      status: 'Active',
    };
    setAuthors((prev) => [newAuthor, ...prev]);
  };

  const handleSaveEditedAuthor = (updatedAuthor: Author) => {
    setAuthors((prev) =>
      prev.map((a) => (a.id === updatedAuthor.id ? updatedAuthor : a))
    );
    setEditingAuthor(null);
  };

  const handleConfirmDelete = () => {
    if (authorToDelete) {
      setAuthors((prev) => prev.filter((a) => a.id !== authorToDelete.id));
      setAuthorToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header - Matching Screenshot 3 */}
      <PageHeader
        title="Author Info"
        icon={<User className="w-6 h-6 text-[#005b7f]" />}
      >
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search author..."
          />
        </div>
      </PageHeader>

      {/* Top Form Card - Matching Screenshot 3 */}
      <AuthorForm
        onAddAuthor={handleAddAuthor}
        autoAuthorId={nextAuthorId}
        isEditing={false}
      />

      {/* Bottom Table Card - Matching Screenshot 3 */}
      <AuthorTable
        authors={filteredAuthors}
        onEdit={(author) => setEditingAuthor(author)}
        onDelete={(author) => setAuthorToDelete(author)}
      />

      {/* Edit Author Modal with all editable fields */}
      <EditAuthorModal
        author={editingAuthor}
        isOpen={Boolean(editingAuthor)}
        onClose={() => setEditingAuthor(null)}
        onSave={handleSaveEditedAuthor}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(authorToDelete)}
        onClose={() => setAuthorToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Author"
        message={`Are you sure you want to delete author "${authorToDelete?.name}" (ID: ${authorToDelete?.authorId})? This action cannot be undone.`}
        confirmText="Delete Author"
      />
    </div>
  );
};
