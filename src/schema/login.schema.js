import * as z from "zod";

export const loginSchema = z.object({

  email : z.email().nonempty("this field can't be empty"),
  password : z.string().nonempty("this field can't be empty").min(6,"password must be 6 chars").max(6,"password must be 6 chars"),
})

