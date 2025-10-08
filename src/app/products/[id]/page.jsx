import React from 'react'
import ProductDetails from '../../_components/details/page';
import relatedProducts from "@/productCategActions/relatedProducts";
import RelatedProducts from '../../_components/relatedProducts/page';

export default async function page({params}) {
    let {id} = await params
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    let {data} = await res.json();
    console.log(data);
    if(!data) return <div>no products to show!</div>

    let related = await relatedProducts(data.category._id);
    console.log(related);
    
    
  return (
    <>
    <ProductDetails data={data} />
    <p className='text-center text-green-600 text-2xl my-3 font-bold'>
      related products 
    </p>
    <RelatedProducts data = {related.data}/>
    </>
  )
}
