import BBForm from "@/components/form/BBForm";
import BBInput from "@/components/form/BBInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userEmail: "adminlast1@gmail.com",
  //     password: "admin12345",
  //   },
  // });

  const defaultValues = {
    userEmail: "adminlast1@gmail.com",
    password: "admin12345",
  }

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
    <div className="flex justify-center items-center h-screen p-8">
      <BBForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BBInput type="email" name="userEmail" label="Email" />
        <BBInput type="password" name="password" label="Password" />
        <Button
          type="submit"
          className="w-full  bg-blue-600 text-white py-3 rounded-md"
        >
          Login
        </Button>
      </BBForm>
    </div>
  );
};

export default Login;
