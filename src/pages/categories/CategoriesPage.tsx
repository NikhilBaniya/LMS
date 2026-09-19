import React, { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EditCategoryModal } from '../../components/categories/EditCategoryModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { SearchInput } from '../../components/common/SearchInput';
import { Button } from '../../components/ui/Button';
import { INITIAL_CATEGORIES } from '../../constants/categories';
import { Category } from '../../types';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const nextCategoryCode = useMemo(() => {
    return `CAT-${String(categories.length + 1).padStart(3, '0')}`;
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      code: nextCategoryCode,
      name: name.trim(),
      description: description.trim(),
      totalBooks: 0,
      availableBooks: 0,
      status: 'Active',
    };
    setCategories((prev) => [newCategory, ...prev]);

    setName('');
    setDescription('');
  };

  const handleSaveEditedCategory = (updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    setEditingCategory(null);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <PageHeader
        title="Category Management"
        icon={<Layers className="w-6 h-6 text-[#005b7f]" />}
      >
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search category or code..."
          />
        </div>
      </PageHeader>

      {/* Top Form Card */}
      <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Category Code
                </label>
                <span className="text-[11px] font-medium text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-md">
                  Auto-assigned
                </span>
              </div>
              <input
                type="text"
                value={nextCategoryCode}
                disabled
                readOnly
                className="w-full bg-[#dbe0e6]/70 border border-gray-300/80 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-mono cursor-not-allowed select-none focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nepali Literature"
                required
                className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Description / Dewey Scope
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Classic and Contemporary Nepali Literature, Poetry, Dramas"
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              className="text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom Table Card */}
      <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 tracking-tight">
          Category Lists
        </h3>

        <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#56595d] text-white text-xs sm:text-sm font-semibold divide-x divide-gray-400/40">
                <th className="py-3 px-4 sm:px-6 w-32">Code</th>
                <th className="py-3 px-4 sm:px-6 w-56">Category Name</th>
                <th className="py-3 px-4 sm:px-6 min-w-[200px]">Description</th>
                <th className="py-3 px-4 sm:px-6 text-center w-28">Total Books</th>
                <th className="py-3 px-4 sm:px-6 text-center w-36">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-800">
              {filteredCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50 transition-colors divide-x divide-gray-200"
                >
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900 font-mono">
                    {cat.code}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                    {cat.name}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                    {cat.description}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-center font-bold text-[#005b7f]">
                    {cat.totalBooks}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="edit"
                        size="sm"
                        onClick={() => setEditingCategory(cat)}
                        className="px-3 py-1 rounded-lg text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="delete"
                        size="sm"
                        onClick={() => setCategoryToDelete(cat)}
                        className="px-3 py-1 rounded-lg text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Category Modal */}
      <EditCategoryModal
        category={editingCategory}
        isOpen={Boolean(editingCategory)}
        onClose={() => setEditingCategory(null)}
        onSave={handleSaveEditedCategory}
      />

      <ConfirmationModal
        isOpen={Boolean(categoryToDelete)}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete category "${categoryToDelete?.name}"?`}
        confirmText="Delete Category"
      />
    </div>
  );
};
