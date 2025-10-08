"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default  function CategSwiper({data}) {
console.log(data);
    
  return (
    <>
    <div className='w-[80%] mx-auto my-5'>
    <h1 className='font-bold text-2xl mb-3'>Ctegory slider</h1>
    <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay ={{delay:2000}}
      > 
        {data.map((categ)=>(<SwiperSlide key={categ.id}>
          <div className='h-[150px]'>
          <img alt="" className=" w-full object-cover " src={categ.image} />
          </div>
          <p className='font-bold  mx-1'>
          {categ.name}
          </p>
        </SwiperSlide>))}
      </Swiper>
    </div>
  </>
  )
}
