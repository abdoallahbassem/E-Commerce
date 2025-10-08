"use client";
import React, { useContext } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { checkoutSchema, CheckoutSchemaType } from "../../../schema/checkout.schema";
import onlineCheckout from "@/checkoutActions/onlineCheckout";
import offlineCheckout from "@/checkoutActions/cashOrder";
import toast from "react-hot-toast";
import { CartContext } from "@/context/cartContext";

export default function Checkout() {
  const { setnumOfCart } = useContext(CartContext);
  const router = useRouter();
  const { id }: { id: string } = useParams();

  const form = useForm<CheckoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleOnlinePayment(values: CheckoutSchemaType) {
    const res = await onlineCheckout(id, "http://localhost:3000", values);
    console.log(res);
    setnumOfCart(0);
    if (res.status === "success") {
      window.location.href = res.session.url; 
    }
  }

  async function handleOfflinePayment(values: CheckoutSchemaType) {
    const res = await offlineCheckout(id, values);
    console.log(res);
    if (res.status === "success") {
      toast.success("order created successfully");
      setnumOfCart(0);
      router.push(`/allorders/${res.data.user}`);
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input type="text" placeholder="details..." {...field} />
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
                    <Input type="tel" placeholder="phone..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input type="text" placeholder="city..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full my-3"
              onClick={form.handleSubmit(handleOnlinePayment)}
            >
              pay online
            </Button>

            <Button
              type="button"
              className="w-full my-3"
              onClick={form.handleSubmit(handleOfflinePayment)}
            >
              cash on delivery
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
