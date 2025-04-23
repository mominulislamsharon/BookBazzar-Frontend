import BBForm from "@/components/form/BBForm";
import BBInput from "@/components/form/BBInput";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "@/redux/features/admin/userManagment.api";
import { useState } from "react";

const Register = () => {
  const [userRegister] = useCreateUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    try {
      const res = await userRegister(data).unwrap();
      toast.success("Registered successfully!", { id: toastId });
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <BBForm onSubmit={onSubmit}>
          <BBInput
            type="text"
            name="name"
            label="Full Name"
            validation={{ required: "Name is required" }}
          />
          <BBInput
            type="email"
            name="email"
            label="Email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
          />
          <BBInput
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            showToggle
            toggleValue={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-4"
          >
            Register
          </Button>
        </BBForm>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
