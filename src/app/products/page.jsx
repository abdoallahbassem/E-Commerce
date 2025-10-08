import React from "react";

import AllProducts from "../_components/allproducts/AllProducts";

export default async function products() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  let { data } = await response.json();
  console.log(data);

  return (
    <AllProducts/>
  );
}
