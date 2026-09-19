import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookLogo } from '../../components/common/BookLogo';
import { ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <div className="p-8 sm:p-12 flex flex-col justify-center items-center text-center bg-white col-span-1 md:col-span-2 max-w-md mx-auto w-full">
        <div className="mb-4">
          <BookLogo variant="black" size={64} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Reset Password
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 mb-6">
          Enter your registered email address to receive password reset instructions.
        </p>

        {submitted ? (
          <div className="w-full space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl">
              Password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#005b7f] hover:underline"
            >
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-5 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/login"
                className="text-xs text-gray-600 hover:text-[#005b7f] flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back
              </Link>
              <button
                type="submit"
                className="bg-[#005b7f] hover:bg-[#004d6b] text-white font-medium text-sm px-6 py-2 rounded-full transition-all shadow-sm cursor-pointer"
              >
                Send Instructions
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
