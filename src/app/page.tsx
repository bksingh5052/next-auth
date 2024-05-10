import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex h-screen w-full flex-col justify-center items-center">
    <Link className="bg-blue-500 py-2 px-3 rounded-md mt-2" href={'/login'}>Login Please</Link>
   </div>
  );
}
