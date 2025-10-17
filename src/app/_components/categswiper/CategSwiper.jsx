"use client";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function CategSwiper({ data }) {
  return (
    <>
      <div className="w-[80%] mx-auto my-5">
        <h1 className="font-bold text-2xl mb-3">Category Slider</h1>
        <Swiper
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            0: {
              slidesPerView: 1, // موبايل
            },
            640: {
              slidesPerView: 2, // تابلت صغير
            },
            1024: {
              slidesPerView: 4, // لابتوب
            },
            1280: {
              slidesPerView: 7, // شاشات كبيرة
            },
          }}
        >
          {data.map((categ) => (
            <SwiperSlide key={categ.id}>
              <div className="h-[150px]">
                <img
                  alt={categ.name}
                  className="w-1/2 mx-auto lg:w-full  h-full object-cover rounded-xl"
                  src={categ.image}
                />
              </div>
              <p className="font-bold mx-1 text-center mt-1">{categ.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
