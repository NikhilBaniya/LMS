import { Building, CheckCircle, Clock, Save, Settings, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'loan' | 'profile' | 'security'>('library');
  const [savedMessage, setSavedMessage] = useState(false);

  // Library Settings State
  const [libraryName, setLibraryName] = useState('HCC Central Library');
  const [institution, setInstitution] = useState('Hetauda City College (TU Affiliated)');
  const [contactEmail, setContactEmail] = useState('library@hcc.edu.np');
  const [phone, setPhone] = useState('+977-1-4330834');
  const [address, setAddress] = useState('Kirtipur-02, Kathmandu, Bagmati Province, Nepal');

  // Loan Policies State
  const [loanPeriodDays, setLoanPeriodDays] = useState('14');
  const [maxBooksPerStudent, setMaxBooksPerStudent] = useState('5');
  const [finePerDay, setFinePerDay] = useState('5.00');
  const [gracePeriodDays, setGracePeriodDays] = useState('2');
  const [reservationExpiryDays, setReservationExpiryDays] = useState('3');

  // Profile Settings
  const [adminName, setAdminName] = useState('Roshan Adhikari');
  const [adminEmail, setAdminEmail] = useState('roshan.adhikari@hcc.edu.np');
  const [adminRole, setAdminRole] = useState('Chief Librarian');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Settings & System Configuration"
        icon={<Settings className="w-6 h-6 text-[#005b7f]" />}
        subtitle="Manage HCC Library preferences, loan circulation rules, and admin credentials"
      />

      {savedMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600" /> Settings updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'library'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Building size={14} /> Library Profile
        </button>
        <button
          onClick={() => setActiveTab('loan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'loan'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock size={14} /> Loan & Fine Policies
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User size={14} /> Admin Account
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#005b7f] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Shield size={14} /> Security
        </button>
      </div>

      <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
        <form onSubmit={handleSave} className="space-y-4">
          {activeTab === 'library' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Institution & Organization Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Library Name
                  </label>
                  <input
                    type="text"
                    value={libraryName}
                    onChange={(e) => setLibraryName(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Parent Institution
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Helpline / Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Physical Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f]"
                />
              </div>
            </div>
          )}

          {activeTab === 'loan' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Borrowing & Fine Rules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Loan Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={loanPeriodDays}
                    onChange={(e) => setLoanPeriodDays(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Max Books / Student
                  </label>
                  <input
                    type="number"
                    value={maxBooksPerStudent}
                    onChange={(e) => setMaxBooksPerStudent(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Daily Fine Rate (Rs.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={finePerDay}
                    onChange={(e) => setFinePerDay(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Grace Period (Days)
                  </label>
                  <input
                    type="number"
                    value={gracePeriodDays}
                    onChange={(e) => setGracePeriodDays(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Reservation Hold Expiry (Days)
                  </label>
                  <input
                    type="number"
                    value={reservationExpiryDays}
                    onChange={(e) => setReservationExpiryDays(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Administrator Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={adminRole}
                    onChange={(e) => setAdminRole(e.target.value)}
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Security & Authentication
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#005b7f]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              icon={<Save size={16} />}
              className="text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
