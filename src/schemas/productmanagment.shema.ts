import { z } from "zod";

export  const productSchema = z.object({
  title: z.string({ required_error: "This field is required" }),
  category: z.string({ required_error: "Category is required" }),
  author: z.string({ required_error: "Author is required" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number({ required_error: "Price is required" })
  ),
  image: z
    .any({ required_error: "Image is required" })
    .refine((file) => file?.length > 0, {
      message: "Image is required",
    }).optional(),


  description: z.string({ required_error: "Description is required" }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number({ required_error: "Quantity is required" })
  ),
  inStock: z.boolean({ required_error: "Instock status is required" }),
});
