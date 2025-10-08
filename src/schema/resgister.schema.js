import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("this field can't be empty")
    .min(2, "min length is 2 chars")
    .max(10, "max length is 10 chars"),
  email : z.email().nonempty("this field can't be empty"),
  password : z.string().nonempty("this field can't be empty").min(6,"password must be 6 chars").max(6,"password must be 6 chars"),
  rePassword : z.string().nonempty("this field can't be empty"),
  phone : z.string().regex(/^01[0125][0-9]{8}$/)
}).refine((object)=>object.password === object.rePassword,{
    path:'rePassword',
    error:"password & rePassword not matched !"
})
