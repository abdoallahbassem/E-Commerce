import  {User} from "next-auth";

declare module "next-auth" {
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
      id: string;
    };
    token: string;
  }

  interface Session {
    user: User["user"];
  }
}




declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string
  }
}