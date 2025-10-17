"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GetSpecificCategory from "@/categoryActions/GetSpecificCategory";
import getSpecificCategory from "@/subCategoriesActions/getSpecificCategory";
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
import AddBtn from "../../_components/addBtn/AddBtn";
import addToWishList from "@/wishListActions/addToWishList";
import toast from "react-hot-toast";

// 🟢 أنواع البيانات
type Product = {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string };
  ratingsAverage: number;
};

type Category = {
  name: string;
  image: string;
};

type WishListResponse = {
  status: "success" | "unauthorized" | "error";
};

export default function CtegoriesDetails() {
  const { id } = useParams();

  const [specificCteg, setspecificCteg] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingWish, setLoadingWish] = useState<string | null>(null);
  const [wishListItems, setWishListItems] = useState<string[]>([]);

  // 🟢 جلب بيانات الفئة المحددة
  async function specificCategory(): Promise<void> {
    const res = await GetSpecificCategory(id as string);
    setspecificCteg(res.data);
  }

  // 🟢 جلب المنتجات
  async function getProducts(): Promise<void> {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    const json = await response.json();
    setProducts(json.data);
  }

  useEffect(() => {
    Promise.all([specificCategory(), getProducts()]).then(() => setLoading(false));

    // تحميل wishlist من localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishListItems(JSON.parse(storedWishlist));
    }
  }, []);

  // حفظ التعديلات في localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishListItems));
  }, [wishListItems]);

  // 🟢 إضافة / إزالة من wishlist
  async function addItemToWishList(id: string): Promise<void> {
    setLoadingWish(id);
    const res: WishListResponse = await addToWishList(id);

    if (res.status === "success") {
      if (wishListItems.includes(id)) {
        setWishListItems((prev) => prev.filter((item) => item !== id));
        toast.success("Item removed from wishlist 💔");
      } else {
        setWishListItems((prev) => [...prev, id]);
        toast.success("Item added to wishlist ❤");
      }
    } else if (res.status === "unauthorized") {
      toast.error("Login first to add item to wishlist!");
    } else {
      toast.error("Something went wrong!");
    }

    setLoadingWish(null);
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (prod) => prod.category.name === specificCteg?.name
  );

  return (
    <>
      {specificCteg && (
        <div className="w-[40%] mx-auto my-14 text-center">
          <img
            src={specificCteg.image}
            alt={specificCteg.name}
            className="w-1/2 mx-auto"
          />
          <p className="text-3xl text-green-600 font-bold my-3">
            {specificCteg.name}
          </p>
        </div>
      )}

      <hr />

      <h1 className="font-bold text-3xl text-slate-900 text-center my-6">
        All Products
      </h1>

      <div className="w-[80%] mx-auto flex flex-wrap gap-4 my-12 py-6">
        {filteredProducts.map((product) => (
          <div
            className="w-[90%] md:w-1/3 lg:w-1/5 mx-auto"
            key={product.id}
          >
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
                    <span className="text-gray-700">
                      {product.price} EGP
                    </span>
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
    </>
  );
}
