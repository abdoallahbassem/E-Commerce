"use client";
import Image from "next/image";
import img1 from "../../public/slide1.jpeg";
import img2 from "../../public/bread.jpg";
import img3 from "../../public/lemon.webp";
import img4 from "../../public/products.jpg";
import img5 from "../../public/slide2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CategSlider from './_components/categslider/CategSlider';
import AllProducts from './_components/allproducts/AllProducts';

export default function Home() {
  return (
    <>
    <div className="w-[80%] h-[170px] md:h-[300px] lg:h-[450px] mx-auto flex mb-12 ">
      <div className="w-3/4 h-full  swiper "> 
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay ={{delay:2000}}
          
        > 
          <SwiperSlide>
            <Image alt="" className=" w-full h-full  " src={img1} />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="" src={img2} className=" w-full h-full  " />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="" src={img3} className="  w-full h-full  " />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className=" w-1/4 flex flex-col h-full  ">
      <Image alt="" className="h-1/2   " src={img4} />
      <Image alt="" className=" h-1/2 " src={img5} />

      </div>
    </div>
    <CategSlider/>
    <AllProducts/>
    </>


  );
}
