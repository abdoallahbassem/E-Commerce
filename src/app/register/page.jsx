"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/schema/resgister.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Regsiter() {
  let router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values) {
    let res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        if (res.data.message === "success")
      {toast.success("account created successfully ");
        router.push("/login");}
      })
      .catch((err) => {
        if (err.response.data.message === "Account Already Exists")
          toast.error("email already exists");
      });
  }
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="email..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="password..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="rePassword..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="phone number..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full my-3">register</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
