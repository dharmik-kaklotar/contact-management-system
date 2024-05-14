"use client"
import { Button } from "@/components/ui/button";
import contextProvider from "@/context/ContextProvider";
import { useState,useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("userInfo")) {
        router.push("/home");
      } else {
        router.push("/");
      }
    }, []);
  const [formData,setFormdata] = useState({
    email:"",
    password:""
  });
    const [loading, setLoading] = useState(false);



  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/user/login", formData);
        const data = await res.data;
        setLoading(false);

        // const res = await fetch("http://localhost:5000/api/user/login", {
        //   method: "POST", 
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });
        // const data = await res.json();

        if(data.success){
           toast.success(data.message);
           localStorage.setItem("userInfo",JSON.stringify(data.data));
          router.push("/home");
        }
        if(!data.success){  
            toast.error(data.message);
        }
        
    } catch (error) {
        toast.error(`Something Went Wrong ! ${error}`);
    }finally{
       setLoading(false);
    }
  }

  return (
   
      <section className="bg-gray-50 dark:bg-gray-900">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => {
                      setFormdata({ ...formData, email: e.target.value });
                    }}
                    value={formData.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => {
                      setFormdata({ ...formData, password: e.target.value });
                    }}
                    value={formData.password}
                  />
                </div>

                <Button
                  disabled={loading ? true : false}
                  className="w-full cursor-pointer"
                >
                  {loading ? "Loading....." : "Login"}
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    // <Button>Hello</Button>
  );
}
