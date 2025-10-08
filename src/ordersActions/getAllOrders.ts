
export  default async function getAllOrders(id:string) {
 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,{
    method:"GET",
 })
    const payload = await res.json()
    return payload;
}
