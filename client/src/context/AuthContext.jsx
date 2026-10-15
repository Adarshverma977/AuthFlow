
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const response = await getCurrentUser();

        if (isMounted) {
          const currentUser = response.data?.user ?? response.user ?? null;

          setUser(currentUser);
          setIsAuthenticated(Boolean(currentUser));
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  async function signup(userData) {
    const response = await registerUser(userData);
    const newUser = response.data?.user ?? response.user ?? null;

    if (newUser) {
      setUser(newUser);
      setIsAuthenticated(true);
    }

    return response;
  }

  async function login(credentials) {
    const response = await loginUser(credentials);
    const loggedInUser = response.data?.user ?? response.user ?? null;

    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAuthenticated(true);
    }

    return response;
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  const value = {
    user,
    setUser,
    isAuthenticated,
    isAuthLoading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
