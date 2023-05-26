import { AuthProvider } from "../views/auth/context";
import SignupView from "../views/auth/signup";

const Signup = () => {
  return (
    <AuthProvider>
      <SignupView />
    </AuthProvider>
  );
};

export default Signup;
