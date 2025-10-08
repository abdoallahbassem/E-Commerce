"use server"
import getMyToken from "@/utilites/getMyToken";


export default async function addToCart(id: string) {
  try{
    const token = await getMyToken();
  if (!token) throw new Error("please login first to be able to add products to the cart ! ");
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const payload = await res.json();
  return payload;
  }
  catch(err){
    console.log(err);
    return err ;
  }
}
