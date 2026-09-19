import React, { useState } from 'react';
import { Author } from '../../types';
import { Button } from '../ui/Button';

export interface AuthorFormProps {
  onAddAuthor: (author: Omit<Author, 'id' | 'totalBooks' | 'status'>) => void;
  autoAuthorId?: string;
  initialValues?: Partial<Author>;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({
  onAddAuthor,
  autoAuthorId = '001',
  initialValues,
  isEditing = false,
  onCancelEdit,
}) => {
  const currentAuthorId = initialValues?.authorId || autoAuthorId;
  const [name, setName] = useState(initialValues?.name || '');
  const [bio, setBio] = useState(initialValues?.bio || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddAuthor({
      authorId: currentAuthorId,
      name: name.trim(),
      bio: bio.trim(),
      genre: initialValues?.genre || 'General Literature',
    });

    if (!isEditing) {
      setName('');
      setBio('');
    }
  };

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author ID field - Auto-assigned and uneditable */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800">
              Author ID
            </label>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-md">
              Auto-assigned
            </span>
          </div>
          <input
            type="text"
            value={currentAuthorId}
            disabled
            readOnly
            className="w-full bg-[#dbe0e6]/70 border border-gray-300/80 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-mono cursor-not-allowed select-none focus:outline-none"
          />
        </div>

        {/* Author Name field */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Author Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Laxmi Prasad Devkota"
            required
            className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
          />
        </div>

        {/* Bio field */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Bio
          </label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Brief biography or background"
            className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
          />
        </div>

        {/* Action Button - Exact teal 'ADD AUTHOR' from Screenshot 3 */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            className="text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
          >
            {isEditing ? 'UPDATE AUTHOR' : 'ADD AUTHOR'}
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

