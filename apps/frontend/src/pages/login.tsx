import { AuthProvider } from "../views/auth/context";
import LoginView from "../views/auth/login";

const Login = () => {
  return (
    <AuthProvider>
      <LoginView />
    </AuthProvider>
  );
};

export default Login;
