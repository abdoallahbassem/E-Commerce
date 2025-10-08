import React from "react";
import CategSwiper from "../categswiper/CategSwiper";

import { useEffect, useState } from "react";


export default function CategSlider() {
  const [data, setData] = useState([]);

  async function getcateg() {
    let response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    let { data } = await response.json();
    return data;
  }

  useEffect(() => {
    getcateg().then((res) => {
      setData(res);
    });
  }, []);
  console.log(data);

  return (
    <>
      <CategSwiper data={data} />
    </>
  );
}
