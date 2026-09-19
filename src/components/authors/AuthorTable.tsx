import React from 'react';
import { Author } from '../../types';
import { Button } from '../ui/Button';

export interface AuthorTableProps {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
  onView?: (author: Author) => void;
}

export const AuthorTable: React.FC<AuthorTableProps> = ({
  authors,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 tracking-tight">
        Author Details
      </h3>

      <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          {/* Header matching Screenshot 3: Dark grey with white text */}
          <thead>
            <tr className="bg-[#56595d] text-white text-xs sm:text-sm font-semibold divide-x divide-gray-400/40">
              <th className="py-3 px-4 sm:px-6 w-28">Author ID</th>
              <th className="py-3 px-4 sm:px-6 w-48">Name</th>
              <th className="py-3 px-4 sm:px-6 min-w-[200px]">Bio</th>
              <th className="py-3 px-4 sm:px-6 text-center w-48">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-800">
            {authors.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500 font-medium">
                  No authors found in the system.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr
                  key={author.id}
                  className="hover:bg-gray-50 transition-colors divide-x divide-gray-200"
                >
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900 whitespace-nowrap">
                    {author.authorId}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                    <button
                      onClick={() => onView && onView(author)}
                      className="text-left hover:text-[#005b7f] hover:underline cursor-pointer"
                    >
                      {author.name}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-gray-600 line-clamp-2 leading-relaxed">
                    {author.bio || 'No biography available.'}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    {/* Action buttons matching Screenshot 3: Edit (yellow/olive) & Delete (red) */}
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="edit"
                        size="sm"
                        onClick={() => onEdit(author)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="delete"
                        size="sm"
                        onClick={() => onDelete(author)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs"
                      >
                        Delete
                      </Button>
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
