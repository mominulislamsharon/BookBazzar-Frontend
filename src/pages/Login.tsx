import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userEmail: "mon2@gmail.com",
      password: "mondf4d3f4d3fd",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.userEmail,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.token);
    dispatch(setUser({ user: user, token: res.data.token }));
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
