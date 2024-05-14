"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


const signupPage = () => {
  const router = useRouter();
useEffect(() => {
  if (localStorage.getItem("userInfo")) {
    router.push("/home");
  } 
}, []);
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
  });
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading , setLoading] = useState(false);



  const submitHandler = async (e) => {
      function isNumber(input) {
        return /^[0-9]+$/.test(input);
      }
    e.preventDefault();
    if(formData.password !== confirmPassword){

        toast.error("Password And Confirm Password Not same!");
        return;
    }
    if (!isNumber(formData.number)) {
        toast.error(" Please Enter The Digit Only In Phone Number!");
      return;
    }
    if (formData.number.length != 10) {
        toast.error("Please Enter The 10 Digit Valid Phone Number!");
      return;
    }

    try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/user/register", formData);
        const data = await res.data;
        setLoading(false);
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


  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Signup To get Started
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your User Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User name"
                  required
                  onChange={(e) => {
                    setFormdata({ ...formData, name: e.target.value });
                  }}
                  value={formData.name}
                />
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                  onChange={(e) => {
                    setFormdata({ ...formData, number: e.target.value });
                  }}
                  value={formData.phone}
                />
              </div>

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

              <div>
                <label
                  htmlFor="cpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  value={confirmPassword}
                />
              </div>

              <Button
                disabled={loading ? true : false}
                className="w-full cursor-pointer"
             
              >
                {loading ? "Loading....." : "SignUp"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                DoAlready have an account ?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default signupPage;
