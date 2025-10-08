export default async function getAllBrands() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,{
      method:"GET",
    })
    const payload = await res.json();
    return payload;
}
