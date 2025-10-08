
export default async function getSpecificBrand(id:string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`,{
      method:"GET",
    })
    const payload = await res.json();
    return payload;
}
