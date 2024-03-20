import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-black">
    <main
      className={`grid grid-cols-2 grid-rows-1 max-w-7xl mx-auto place-items-center   min-h-screen  bg-black  ${inter.className}`}
    >
      <Link href='/login'>
      <div className="h-48 w-[400px] bg-white grid place-items-center cursor-pointer  rounded-lg">
              <p  className="text-2xl font-bold">Login</p>
      </div>
      </Link>
      <Link href='/signup'>
      <div className="h-48 w-[400px] bg-white grid place-items-center cursor-pointer  rounded-lg">
              <p className="text-2xl font-bold">Signup</p>
      </div>
      </Link>
    </main>
    </div>
  );
}
