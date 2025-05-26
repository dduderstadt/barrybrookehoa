import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-[#1492df] text-white py-3 flex items-center justify-between h-24">
            <Image src={`/header.png`} alt="Barry Brooke Homeowner's Association Logo" width="100" height="100" className="ml-0" />
            <Link className="font-bold text-xl tracking-tight text-center pl-8" href="/">Barry Brooke HOA</Link>
            <div className="flex items-center">
                <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="/">Home</Link>
                <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="/documents">C&amp;Rs</Link>
                <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="mailto:barrybrookehoa@gmail.com">Contact Us</Link>
            </div>
        </nav>
    )
}