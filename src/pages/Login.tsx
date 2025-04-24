import BBForm from "@/components/form/BBForm";
import BBInput from "@/components/form/BBInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const defaultValues = {
    userEmail: "adminlast1@gmail.com",
    password: "admin12345",
    // userEmail: "user4@gmail.com",
    // password: "user1234567",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        email: data.userEmail,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });

      // navigate(`/${user.role}/dashboard`);
      navigate(from, { replace: true }); 
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h1>

        <BBForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BBInput type="email" name="userEmail" label="Email" />
          <BBInput type="password" name="password" label="Password" />

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md"
          >
            Login
          </Button>
        </BBForm>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
