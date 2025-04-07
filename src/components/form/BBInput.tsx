import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  accept?: string;
};

const BBInput = ({ type, name, label, accept }: TInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col mb-5 w-full">
      {label && (
        <label className="mb-2 text-base font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              type={type}
              id={name}
              accept={accept}
              className="border-2 hover:border-blue-500 w-full p-3 text-lg font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...field}
              value={field.value || ""}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default BBInput;
