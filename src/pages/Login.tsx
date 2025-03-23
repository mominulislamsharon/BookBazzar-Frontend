import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userEmail: "adminlast1@gmail.com",
      password: "admin12345",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data : FieldValues) => {
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
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="border-2 border-blue-600"
          type="email"
          id="email"
          {...register("userEmail")}
        />
      </div>
      <div>
        <label htmlFor="id">Password:</label>
        <input
          className="border-2"
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button type="submit" className="bg-white text-black">
        Login
      </Button>
    </form>
  );
};

export default Login;
