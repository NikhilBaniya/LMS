import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Modal } from './Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (adminData: { email: string; name: string; role: string }) => void;
}

export const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Librarian');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !name) return;

    if (onSuccess) {
      onSuccess({ email, name, role });
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setEmail('');
      setName('');
      setPassword('');
      setRole('Librarian');
      onClose();
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Admin"
      icon={<Users className="w-5 h-5 text-[#005b7f]" />}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {isSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium text-center">
            Admin account created successfully!
          </div>
        )}

        {/* Email Field */}
        <div>
          <Input
            variant="outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-400/80 rounded-xl"
          />
        </div>

        {/* Name Field */}
        <div>
          <Input
            variant="outline"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-gray-400/80 rounded-xl"
          />
        </div>

        {/* Password & Role on 2 columns - Matching Image 1 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              variant="outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-400/80 rounded-xl"
            />
          </div>
          <div>
            <Input
              variant="outline"
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border-gray-400/80 rounded-xl"
            />
          </div>
        </div>

        {/* Actions - Sign Up and Sign In buttons side by side - Matching Image 1 */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            className="rounded-xl font-bold text-gray-800"
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="rounded-xl font-bold"
          >
            Sign In
          </Button>
        </div>
      </form>
    </Modal>
  );
};
