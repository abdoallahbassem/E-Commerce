
export default async function getSpecificCategory(id: string) {
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
const payload = await res.json()
return payload;
}
