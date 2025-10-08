
export default async function GetSpecificCategory(id:string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,{
      method:"GET",
    })
    const payload = await res.json();
    return payload;
}
