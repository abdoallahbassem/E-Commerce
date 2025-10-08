"use server";
import { CheckoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilites/getMyToken";

export default async function offlineCheckout(
  cartId: string,
  values: CheckoutSchemaType
) {
    const token = await getMyToken()
    if(!token){
     throw new Error("error")
    }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddres: values }),
    }
  );
  const payload = await res.json();
  return payload;
}
