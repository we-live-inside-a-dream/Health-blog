import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAPI } from "./APIContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const apiContext = useAPI();
  const { authAPI } = apiContext;
  const [user, setUser] = useState({ loading: true });
  const authListener = authAPI.getAuthListener();
  useEffect(() => {
    authListener(setUser);
  }, [authListener]);
  const auth = useMemo(
    () => ({
      user,
      login: authAPI.login,
      logout: authAPI.logout,
      register: authAPI.register,
      resetPassword: authAPI.resetPassword,
      updatePassword: authAPI.updatePassword,
      updateEmail: authAPI.updateEmail
    }),
    [user, authAPI, apiContext]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
