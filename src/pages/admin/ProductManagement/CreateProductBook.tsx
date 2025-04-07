import { Controller } from "react-hook-form";
import BBForm from "@/components/form/BBForm";
import BBInput from "@/components/form/BBInput";
import BBSelect from "@/components/form/BBSelect";
import { Button } from "@/components/ui/button";
import { cateGoryOptions } from "@/constants/product";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas/productmanagment.shema";
import { useCreateProductsMutation } from "@/redux/features/admin/productBookManajment.api";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import { useRef } from "react";

const CreateProductBook = () => {
  const [addProduct] = useCreateProductsMutation();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    formData.append("file", data.image?.[0]);

    try {
      const res = (await addProduct(formData)) as TResponse;
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Product Created Successfully", { id: toastId });

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <BBForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
      <BBInput type="text" name="title" label="Title" />
      <BBInput type="text" name="author" label="Author" />
      <BBInput type="number" name="price" label="Price" />
      <BBSelect
        name="category"
        options={cateGoryOptions}
        label="Book Category"
      />
      <BBInput type="text" name="description" label="Description" />
      <BBInput type="number" name="quantity" label="Quantity" />
      <Controller
        name="image"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col mb-5 w-full">
            <label className="mb-2 text-base font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => field.onChange(e.target.files)}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="inStock"
        defaultValue={false}
        render={({ field }) => (
          <div className="flex items-center space-x-2 mb-2">
            <input type="checkbox" {...field} />
            <label>In Stock</label>
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </BBForm>
  );
};

export default CreateProductBook;
