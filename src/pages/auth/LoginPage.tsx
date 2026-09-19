import { AlertCircle, CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookLogo } from '../../components/common/BookLogo';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useAuth();

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState<'login' | 'register'>(
    location.pathname === '/register' ? 'register' : 'login'
  );

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Sync mode with route if needed
  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // Login form state - pre-filled with dummy credentials
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state - pre-filled with dummy data
  const [regName, setRegName] = useState('Roshan Adhikari');
  const [regEmail, setRegEmail] = useState('roshan.admin@hcc.edu.np');
  const [regRole, setRegRole] = useState('Assistant Librarian');
  const [regUsername, setRegUsername] = useState('roshan_admin');
  const [regPassword, setRegPassword] = useState('admin123');
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const result = login(username, password);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setLoginError(result.error || 'Invalid credentials!');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(null);

    const result = register({
      username: regUsername.trim(),
      password: regPassword,
      name: regName.trim(),
      role: regRole.trim() || 'Librarian',
      email: regEmail.trim(),
    });

    if (!result.success) {
      setRegisterError(result.error || 'Registration failed');
      return;
    }

    setRegisterSuccess('Account registered successfully! You can now log in.');
    setUsername(regUsername.trim());
    setPassword(regPassword);

    setTimeout(() => {
      setMode('login');
      setRegisterSuccess(null);
    }, 1200);
  };

  return (
    <>
      {/* Left Panel: Either Login Form or Register Form */}
      <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center text-center bg-white transition-all duration-300">
        <div className="mb-3">
          <BookLogo variant="black" size={64} />
        </div>

        {mode === 'login' ? (
          /* LOGIN FORM */
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
              HCC Library Management
              <br />
              System
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 mb-4">
              Please enter your credential
            </p>

            {/* Error Message if credentials do not match */}
            {loginError && (
              <div className="w-full max-w-xs mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2 text-left animate-in fade-in duration-200">
                <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3.5">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  required
                  className={`w-full bg-[#dbe0e6] border rounded-full px-5 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    loginError
                      ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
                      : 'border-gray-300/80 focus:ring-[#005b7f]/20 focus:border-[#005b7f]'
                  }`}
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  required
                  className={`w-full bg-[#dbe0e6] border rounded-full px-5 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    loginError
                      ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
                      : 'border-gray-300/80 focus:ring-[#005b7f]/20 focus:border-[#005b7f]'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-xs px-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('admin');
                    setPassword('admin123');
                    setLoginError(null);
                  }}
                  className="text-[11px] text-[#005b7f] hover:text-[#004d6b] bg-blue-50/80 hover:bg-blue-100/80 px-2 py-0.5 rounded-md font-mono transition-colors cursor-pointer"
                  title="Click to fill demo credentials"
                >
                  Demo: admin / admin123
                </button>
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-600 hover:text-[#005b7f] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  type="submit"
                  className="bg-[#005b7f] hover:bg-[#004d6b] text-white font-medium text-sm px-8 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
          </>
        ) : (
          /* REGISTER FORM (when in Register Mode) */
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
              Create Admin Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-4">
              Enter your details to register as library staff
            </p>

            {registerSuccess && (
              <div className="mb-3 w-full max-w-xs p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2 text-left">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>{registerSuccess}</span>
              </div>
            )}

            {registerError && (
              <div className="mb-3 w-full max-w-xs p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2 text-left">
                <AlertCircle size={16} className="shrink-0 text-red-500" />
                <span>{registerError}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-5 py-2 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-5 py-2 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-4 py-2 text-xs text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Role (e.g. Librarian)"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    required
                    className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-4 py-2 text-xs text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
                  />
                </div>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Create Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  className="w-full bg-[#dbe0e6] border border-gray-300/80 rounded-full px-5 py-2 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
                />
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  type="submit"
                  className="bg-[#005b7f] hover:bg-[#004d6b] text-white font-medium text-sm px-8 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  Register Account
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Right Panel: Welcome Container that toggles between Switch to Register / Switch to Login */}
      <div className="bg-[#005b7f] text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center rounded-3xl md:rounded-l-3xl md:rounded-r-none relative overflow-hidden transition-all duration-300">
        <div className="mb-4">
          <BookLogo variant="white" size={80} />
        </div>

        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-wider uppercase font-sans drop-shadow-sm">
            HCC
          </h2>
          <h3 className="text-2xl sm:text-3xl font-light tracking-wide drop-shadow-sm">
            Library
          </h3>
        </div>

        {mode === 'login' ? (
          /* Switch to Register Prompt */
          <>
            <p className="text-sm text-cyan-100 mb-6 font-normal max-w-xs">
              New to our platform?
              <br />
              Register Now
            </p>

            <button
              type="button"
              onClick={() => {
                setLoginError(null);
                setMode('register');
              }}
              className="bg-[#d1d5db] hover:bg-[#e5e7eb] text-gray-900 font-semibold text-sm px-10 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
            >
              Register
            </button>
          </>
        ) : (
          /* Switch to Login Prompt */
          <>
            <p className="text-sm text-cyan-100 mb-6 font-normal max-w-xs">
              Already have an account?
              <br />
              Log In to your portal
            </p>

            <button
              type="button"
              onClick={() => {
                setRegisterError(null);
                setRegisterSuccess(null);
                setMode('login');
              }}
              className="bg-[#d1d5db] hover:bg-[#e5e7eb] text-gray-900 font-semibold text-sm px-10 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </>
  );
};



