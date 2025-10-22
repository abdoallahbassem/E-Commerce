import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import googlePlay from '../../../public/google-play.png';
import appleStore from "../../../public/applestore.jpg";
import Image from 'next/image';

export default function Footer() {
  return (
    <div className='w-full footer p-12  '>
        <h1 className='font-bold text-2xl my-2'>
        Get The FreshCart App
        </h1>
        <p className='text-gray-400'>
        We will send you a link, open it on your phone to download the app.
        </p>
        <div className='flex flex-col lg:flex-row gap-3 my-4'>
            <div className = " w-full lg:w-4/5 " >
                <Input type="text" placeholder="Email..." className='bg-white border-[0.5px] px-2 border-slate-400' />
            </div>
            <Button className='w-full lg:w-1/5 bg-green-600 hover:bg-green-700 cursor-pointer'>
                Share App Link
            </Button>
            
        </div>
        <div className='flex flex-col lg:flex-row justify-between border-[1px] border-e-0 border-s-0 border-gray-500 p-3'>
          <div className='flex flex-col lg:flex-row gap-3 items-center'>
            <p className='me-2 text-xl font-bold'>
            Payment Partners
            </p>
            <i class="fa-brands fa-amazon-pay text-xl cursor-pointer"></i>
            <i class="fa-brands fa-fedex text-xl cursor-pointer"></i>
            <i class="fa-brands fa-cc-mastercard text-xl cursor-pointer"></i>
            <i class="fa-brands fa-cc-paypal text-xl cursor-pointer"></i>
            <i class="fa-brands fa-cc-visa text-xl cursor-pointer"></i>
          </div>
          <div className='flex gap-3 items-center'>
            <p className='font-bold'>Get deliveries with FreshCart</p>
            <div className='flex flex-col md:flex-row'>
            <Image src={googlePlay} alt='' className='w-[120px] cursor-pointer ' />
            <Image src={appleStore} alt='' className='w-[120px] cursor-pointer ' />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between my-4'>
          <div>
          <p className='text-gray-400'>
          © 2022 - 2024 FreshCart e-Commerce HTML Template. All rights reserved.
          </p>
          <p className='text-gray-400'>
          Powered by <span className='text-green-600'>Codescandy</span>
          </p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-gray-400'>
            Follow us on
            </p>
            <i class="fa-brands fa-facebook cursor-pointer text-xl text-gray-400"></i>
            <i class="fa-brands fa-instagram cursor-pointer text-xl text-gray-400"></i>
            <i class="fa-brands fa-twitter cursor-pointer text-xl text-gray-400"></i>
          </div>
        </div>

    </div>
  )
}
