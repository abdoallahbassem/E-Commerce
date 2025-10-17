"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import AddBtn from "../addBtn/AddBtn";
import addToWishList from "@/wishListActions/addToWishList";
import toast from "react-hot-toast";

// 🟢 تعريف نوع المنتج
type Product = {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
  ratingsAverage: number;
};

// 🟢 نوع نتيجة API الويش ليست
type WishListResponse = {
  status: "success" | "unauthorized" | "error";
};

export default function AllProducts() {
  // 🟢 أنواع الـ useState
  const [data, setData] = useState<Product[]>([]);
  const [loadingWish, setLoadingWish] = useState<string | null>(null);
  const [wishListItems, setWishListItems] = useState<string[]>([]);

  // 🟢 جلب المنتجات
  async function getcateg(): Promise<Product[]> {
    let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    let json = await response.json();
    return json.data;
  }

  useEffect(() => {
    getcateg().then((res) => setData(res));

    // 🟢 تحميل wishlist من localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishListItems(JSON.parse(storedWishlist));
    }
  }, []);

  // 🟢 حفظ أي تعديل في localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishListItems));
  }, [wishListItems]);

  async function addItemToWishList(id: string): Promise<void> {
    setLoadingWish(id);

    let res: WishListResponse = await addToWishList(id);

    if (res.status === "success") {
      toast.success("Item added to wishlist successfully ❤");
      setWishListItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else if (res.status === "unauthorized") {
      toast.error("Login first to add item to wishlist!");
    } else {
      toast.error("Something went wrong!");
    }

    setLoadingWish(null);
  }

  return (
    <div className="w-[80%] mx-auto flex flex-wrap gap-4 my-12 py-6">
      {data.map((product) => (
        <div className="w-[90%] md:w-1/3 lg:w-1/5 mx-auto" key={product.id}>
          <Card className="p-2 shadow-xl hover:scale-105 duration-200 overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                    width={500}
                    height={500}
                  />
                </CardTitle>
                <CardDescription>
                  <div className="text-green-600 font-bold">
                    {product.category.name}
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xl">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </p>
              </CardContent>

              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-700">{product.price} EGP</span>
                  <span className="text-gray-700">
                    {product.ratingsAverage}
                    <i className="fa-solid text-yellow-500 fa-star ms-1"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>

            <div className="flex p-3 justify-between items-center">
              <div className="w-3/4">
                <AddBtn id={product.id} />
              </div>

              <button
                onClick={() => addItemToWishList(product.id)}
                disabled={loadingWish === product.id}
                className="w-1/4 flex justify-center items-center"
              >
                {loadingWish === product.id ? (
                  <i className="fas fa-spinner fa-spin text-2xl text-gray-600"></i>
                ) : (
                  <i
                    className={`fa-solid fa-heart text-3xl duration-300 cursor-pointer transition-colors ${
                      wishListItems.includes(product.id)
                        ? "text-red-500"
                        : "hover:text-red-500 text-slate-900"
                    }`}
                  ></i>
                )}
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
