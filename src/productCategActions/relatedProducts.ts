"use server"
export default async function relatedProducts(id:string) {

    const res =  await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
    const payload = await res.json();
    return payload;
}
