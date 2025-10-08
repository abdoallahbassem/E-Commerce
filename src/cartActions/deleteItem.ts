"use server"
import getMyToken from "@/utilites/getMyToken"

export default async function deleteItem(id:string){
   const token = await getMyToken()
   if(!token){
    throw new Error("error")
   }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method: "DELETE",
      headers:{
        token,
        "Content-Type": "application/json",
      }
    })
    const payload = res.json();
    return payload;
  }