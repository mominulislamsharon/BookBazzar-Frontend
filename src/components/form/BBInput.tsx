// import { Controller, useFormContext } from "react-hook-form";
// import { Input } from "../ui/input";

// type TInputProps = {
//   type: string;
//   name: string;
//   label?: string;
//   accept?: string;
// };

// const BBInput = ({ type, name, label, accept }: TInputProps) => {
//   const { control } = useFormContext();

//   return (
//     <div className="flex flex-col mb-5 w-full">
//       {label && (
//         <label className="mb-2 text-base font-medium" htmlFor={name}>
//           {label}
//         </label>
//       )}
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             <Input
//               type={type}
//               id={name}
//               accept={accept}
//               className="border-2 hover:border-blue-500 w-full p-3 text-lg font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               {...field}
//               value={field.value || ""}
//             />
//             {error && <p className="text-red-500">{error.message}</p>}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// export default BBInput;


import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface BBInputProps {
  label: string;
  name: string;
  type: string;
  validation?: object;
  showToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
}

const BBInput = ({
  label,
  name,
  type,
  validation,
  showToggle = false,
  toggleValue,
  onToggle,
}: BBInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          {...register(name, validation)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {showToggle && (
          <div
            onClick={onToggle}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {toggleValue ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default BBInput;
