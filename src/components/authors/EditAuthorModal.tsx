import React, { useState, useEffect } from 'react';
import { X, User, Save } from 'lucide-react';
import { Author } from '../../types/author';
import { Button } from '../ui/Button';

interface EditAuthorModalProps {
  author: Author | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAuthor: Author) => void;
}

export const EditAuthorModal: React.FC<EditAuthorModalProps> = ({
  author,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Author | null>(null);

  useEffect(() => {
    if (author) {
      setFormData({ ...author });
    }
  }, [author]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Author, value: any) => {
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
              <User size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Edit Author</h2>
              <p className="text-xs text-gray-500 font-mono">Author ID: {formData.authorId}</p>
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
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Author ID
              </label>
              <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                Auto-assigned
              </span>
            </div>
            <input
              type="text"
              value={formData.authorId}
              disabled
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 font-mono cursor-not-allowed select-none focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Author Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Bio
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              required
              placeholder="Author biography or background..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all resize-none"
            />
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
              Update Author
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
