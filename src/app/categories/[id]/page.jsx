"use client"
import getSpecificCategory from "@/subCategoriesActions/getSpecificCategory";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import GetSpecificCategory from "@/categoryActions/GetSpecificCategory";
export default  function CtegoriesDetails() {
  const [specificCteg, setspecificCteg] = useState({});
  const [loading, setloading] = useState(false)
  const [items, setitems] = useState([])
    let {id}=useParams()
    async function specificCategory(){
      
        let res = await GetSpecificCategory(id);
        console.log(res);
        setspecificCteg(res.data)
        

    }
    useEffect(()=>{
        specificCategory();
    },[])

    async function getSubCategories() {
      setloading(true);
    let res = await getSpecificCategory(id);
    console.log(res);
    if(res.results>0)
    setitems(res.data);
    setloading(false);
    
    
  }
  useEffect(() => {
      getSubCategories();
  }, []);
    
  return (
      <>
    <div className='w-[40%] mx-auto my-14 '>
      <img src={specificCteg.image} alt="" className='w-1/2 mx-auto' />
      <p className='text-3xl text-green-600 font-bold my-3 text-center'>
        {specificCteg.name}
      </p>
      </div>
      <hr />

      <>
    {loading==true ? <div className=" h-screen flex items-center justify-center">
    <span className="loader "></span>
  </div> :
  <>
  <h1 className="font-bold text-3xl text-slate-900 text-center my-3 " >All Categories</h1>
  <div className="w-[80%] mx-auto flex flex-wrap gap-4 my-12 py-6 justify-center items-center">
      {items.map((item) => (
        <div className=" w-[90%] md:w-1/3 lg:w-1/5 mx-auto border-2 border-slate-900 rounded-4xl " key={item._id}>
        <p className="w-1/3 font-bold text-green-600 text-xl text-center mx-auto">
        {item.name}
        </p>
        </div>
      ))}
    </div>
  </>
  }
    </>

      </>
  )
}
