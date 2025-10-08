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
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from './../../schema/login.schema';
import { signIn } from "next-auth/react";
export default function Regsiter() {
  let router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
     
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values) {
    let res = await signIn("credentials",{
      email: values.email,
      password : values.password,
      redirect: false,
    })
      console.log(res);
      if(res.ok){
        toast.success("you loged in successfully")
        window.location.href ="/";
      }
      else{
        toast.error("incorrect email or password")

      }
      
  }
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
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

            <Button className="w-full my-3">login</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
