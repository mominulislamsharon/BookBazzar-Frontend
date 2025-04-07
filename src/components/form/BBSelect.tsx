import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

type BBSelectProps = {
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  label?: string;
};

const BBSelect = ({ name, options, label }: BBSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="my-5">
      {label && (
        <label className="block text-base font-semibold mb-2">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <SelectTrigger className="border-2 hover:border-blue-500 w-full p-3 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder={`Select a ${label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default BBSelect;
