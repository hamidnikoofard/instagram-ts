import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { getToken } from "../../utils/manageToken";
import { getUser } from "../../utils/manageUser&Id";

interface AuthContextType {
  userName: string | null;
  isUserLogin: boolean;
  setUserName: Dispatch<SetStateAction<string | null>>;
  setIsUserLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = getUser();
    const token = getToken();
    if (storedUser && token) {
      setUserName(storedUser);
      setIsUserLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userName, isUserLogin, setUserName, setIsUserLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
