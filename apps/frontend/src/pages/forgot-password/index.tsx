import { AuthProvider } from "../../views/auth/context";
import ForgotPasswordView from "../../views/auth/forgot";

const ForgotPassword = () => {
  return (
    <AuthProvider>
      <ForgotPasswordView />
    </AuthProvider>
  );
};

export default ForgotPassword;
