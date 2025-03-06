import React from "react";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-[#1492df] text-white py-3 px-4 flex items-center justify-between h-24">
            <Image src={`/header.png`} alt="Barry Brooke Homeowner's Association Logo" width="100" height="100" />
            <a className="font-bold text-xl tracking-tight text-left pl-8" href="/">Barry Brooke HOA</a>
            <div className="flex items-center">
                <a className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="/">Home</a>
                <a className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="/documents">Documents</a>
                <a className="text-sm px-4 py-2 leading-none rounded-full hover:bg-black" href="mailto:barrybrookehoa@gmail.com">Contact Us</a>
            </div>
        </nav>
    )
}