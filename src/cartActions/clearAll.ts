import getMyToken from "@/utilites/getMyToken";

export default async function clearAll() {
  const token = await getMyToken();
  if (!token) throw new Error("error");
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await res.json();
  return payload;
}
