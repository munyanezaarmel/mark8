import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setisPending] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded:User = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setUser(decoded);
          } else {
            
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
          }
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
      setisPending(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isPending, user };
}
