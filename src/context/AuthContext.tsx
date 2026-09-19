import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserAccount {
  username: string;
  password: string;
  name: string;
  role: string;
  email: string;
}

export const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    username: 'admin',
    password: 'admin123',
    name: 'Roshan Adhikari',
    role: 'Chief Librarian',
    email: 'admin@hcc.edu.np',
  },
  {
    username: 'librarian',
    password: 'admin123',
    name: 'Suman Shrestha',
    role: 'Assistant Librarian',
    email: 'librarian@hcc.edu.np',
  },
];

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserAccount | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  register: (account: UserAccount) => { success: boolean; error?: string };
  accounts: UserAccount[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('hcc_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_ACCOUNTS;
      }
    }
    return DEFAULT_ACCOUNTS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('hcc_is_authenticated') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('hcc_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('hcc_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const login = (u: string, p: string) => {
    const enteredUser = u.trim().toLowerCase();
    const matched = accounts.find(
      (acc) => acc.username.toLowerCase() === enteredUser && acc.password === p
    );

    if (matched) {
      setIsAuthenticated(true);
      setCurrentUser(matched);
      localStorage.setItem('hcc_is_authenticated', 'true');
      localStorage.setItem('hcc_current_user', JSON.stringify(matched));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials! Login is only permitted with demo credentials (admin / admin123) or a registered account.',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('hcc_is_authenticated');
    localStorage.removeItem('hcc_current_user');
  };

  const register = (newAcc: UserAccount) => {
    const trimmedUsername = newAcc.username.trim();
    if (
      accounts.some(
        (a) => a.username.toLowerCase() === trimmedUsername.toLowerCase()
      )
    ) {
      return { success: false, error: `Username "${trimmedUsername}" is already taken.` };
    }

    const updated = [...accounts, newAcc];
    setAccounts(updated);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        register,
        accounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
