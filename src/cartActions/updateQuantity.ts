"use server"
import getMyToken from "@/utilites/getMyToken"

export default async function updateQuantity(id:string , count :string)
{ 

    const token = await getMyToken();
    if(!token) throw new Error("error")
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "PUT",
        headers:{
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({count})
    });
    const payload = await res.json();
    return payload;
    
}
