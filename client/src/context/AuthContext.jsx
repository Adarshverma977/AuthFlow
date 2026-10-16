
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
        const currentUser =
          response.data?.user ?? response.user ?? null;

        if (isMounted) {
          setUser(currentUser);
          setIsAuthenticated(Boolean(currentUser));
        }
      } catch {
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

  // Signup creates an account; it does NOT log the user in.
  async function signup(userData) {
    return await registerUser(userData);
  }

  // Only successful login authenticates the user.
  async function login(credentials) {
    const response = await loginUser(credentials);
    const loggedInUser =
      response.data?.user ?? response.user ?? null;

    if (!loggedInUser) {
      throw new Error("Login succeeded but no user data was returned.");
    }

    setUser(loggedInUser);
    setIsAuthenticated(true);

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
