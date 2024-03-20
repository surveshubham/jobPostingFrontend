/** @format */

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";



const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const { push } = useRouter();

  const logins = async (e: any) => {
    e.preventDefault();

    
    if (email === "") {
      alert("email should not be empty");
      return;
    }

    if (password === "") {
      alert("password should not be empty");
      return;
    }

    const response = await fetch(`http://localhost:8080/api4/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const instr = await response.json();

    console.log(instr)

    if (instr.error) {
      alert(instr.error);
    }

    if (instr) {
      setEmail("");
      setPassword("");
      localStorage.setItem("email", instr.user[0].email);
      localStorage.setItem("type", instr.user[0].type);
      localStorage.setItem("canID", instr.user[0].candidateID);
      
    }

    if (instr.user[0].type == "Admin") {
      push(`/admin`);
    } else {
      push(`/candidate`);
    }
  };

  const forgotPass = async (e: any) => {
    e.preventDefault();

    if (email === "") {
      alert("email should not be empty");
      return;
    }

    const response = await fetch(`http://localhost:8080/api4/forgotPassUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const instr = await response.json();

    if (instr.error) {
      alert(instr.error);
    } else {
      alert("email has been sent");
    }
  };

  


  return (
    <div className="grid h-screen place-items-center">
      <div className=" py-10 gird place-items-center px-5 w-[500px]">
        <p className="pb-10 text-3xl">Login</p>
        <form className=" mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              password
            </label>
          </div>

          <div className="pt-5 ">
            <button className="bg-red-500 px-5 py-2 text-white font-bold" onClick={logins}>
              Login
            </button>
            <button className="bg-red-500 px-5 py-2 text-white font-bold ml-3" onClick={forgotPass}>
              Forgot Password
            </button>
          </div>
        </form>
      </div>


      
    </div>
  );
};

export default login;
