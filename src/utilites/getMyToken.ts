"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
try{
    const decodedToken = (await cookies()).get('next-auth.session-token')?.value|| (await cookies()).get('__Secure-next-auth.session-token')?.value;
    if(!decodedToken)return null
    const token =  await decode({token: decodedToken , secret: process.env.NEXTAUTH_SECRET !})
    return token?.token||null;
}
catch(err){
    return err
}
}
