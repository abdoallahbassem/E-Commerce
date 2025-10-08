
export default async function getAllCategories() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,{
      method:"GET",
    })
    const payload = await res.json();
    return payload;
}
