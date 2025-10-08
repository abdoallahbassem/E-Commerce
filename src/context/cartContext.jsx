"use client"

import getUserCart from "@/cartActions/getUserCart";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()
export default function CartContextProvider ({children}){
    const [numOfCart, setnumOfCart] = useState(0)
    async function getCart(){
        try {
            let res = await getUserCart()
            console.log(res);
            
            if(res.status === "success"){
                let sum = 0 
                res.data.products.forEach((product)=>{
                    sum+=product.count
                })
                setnumOfCart(sum);
            }
            
        }
        catch(err) {
            console.log("error");
            
        }
    
    }
    useEffect(() => {
        getCart();
      }, []);
    return(
        
        <CartContext.Provider value={{numOfCart,setnumOfCart}}>
            {children}
        </CartContext.Provider>
     
    )
}