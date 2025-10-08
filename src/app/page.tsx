"use client";
import Image from "next/image";
import img1 from "../../public/fruit-og-jcnp4h14m2mh5t9.jpg";
import img2 from "../../public/bread.jpg";
import img3 from "../../public/lemon.webp";
import img4 from "../../public/products.jpg";
import img5 from "../../public/bread2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CategSlider from './_components/categslider/CategSlider';
import AllProducts from './_components/allproducts/AllProducts';

export default function Home() {
  return (
    <>
    <div className="w-[80%] mx-auto flex ">
      <div className="w-3/4 h-[400px] swiper "> 
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay ={{delay:2000}}
        > 
          <SwiperSlide>
            <Image alt="" className=" w-full h-full object-cover " src={img1} />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="" src={img2} className=" w-full h-full object-fill " />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="" src={img3} className="  w-full h-full object-cover " />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className=" w-1/4 flex flex-col h-[200px] ">
      <Image alt="" className=" w-full h-full  object-cover " src={img4} />
      <Image alt="" className="  object-cover w-full h-full " src={img5} />

      </div>
    </div>
    <CategSlider/>
    <AllProducts/>
    </>


  );
}
