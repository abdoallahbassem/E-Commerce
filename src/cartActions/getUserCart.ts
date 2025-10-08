import getMyToken from "@/utilites/getMyToken";

export default async function getUserCart() {
  const token =  await getMyToken();
  if (!token) throw new Error("error");
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
    method:"GET",
    headers:{
        token ,
        "Content-Type": "application/json",
    }
  })
  const payload = await res.json();
  return payload;
}
