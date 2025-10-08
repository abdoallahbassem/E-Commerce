import * as z from "zod";

export const checkoutSchema = z.object({

  details : z.string().nonempty("this field can't be empty"),
  phone : z.string().nonempty("this field can't be empty").regex(/^01[0125][0-9]{8}$/,"invalid phone number"),
  city : z.string().nonempty("this field can't be empty"),
})

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>