"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-brand text-white" aria-label="Main navigation">
            <div className="flex items-center justify-between h-24">
                <div className="flex items-center gap-4">
                    <Image src="/header.png" alt="Barry Brooke Homeowner's Association Logo" width={100} height={100} />
                    <Link className="font-bold text-xl tracking-tight" href="/">Barry Brooke HOA</Link>
                </div>
                <button
                    className="mr-6 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="xl" aria-hidden="true" />
                </button>
                <div className="hidden md:flex items-center mr-6">
                    <Link className="text-base px-4 py-2 leading-none rounded-full hover:bg-white hover:text-brand" href="/">Home</Link>
                    <Link className="text-base px-4 py-2 leading-none rounded-full hover:bg-white hover:text-brand" href="/documents">C&amp;Rs</Link>
                    <Link className="text-base px-4 py-2 leading-none rounded-full hover:bg-white hover:text-brand" href="https://app.autobooks.co/pay/barry-brooke-homeowners-assoc" target="_blank" rel="noopener noreferrer">Pay Dues Online</Link>
                    <Link className="text-base px-4 py-2 leading-none rounded-full hover:bg-white hover:text-brand" href="mailto:barrybrookehoa@gmail.com">Contact Us</Link>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col pb-4">
                    <Link className="text-base px-6 py-3 w-full text-center hover:bg-white hover:text-brand" href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link className="text-base px-6 py-3 w-full text-center hover:bg-white hover:text-brand" href="/documents" onClick={() => setIsOpen(false)}>C&amp;Rs</Link>
                    <Link className="text-base px-6 py-3 w-full text-center hover:bg-white hover:text-brand" href="https://app.autobooks.co/pay/barry-brooke-homeowners-assoc" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Pay Dues Online</Link>
                    <Link className="text-base px-6 py-3 w-full text-center hover:bg-white hover:text-brand" href="mailto:barrybrookehoa@gmail.com" onClick={() => setIsOpen(false)}>Contact Us</Link>
                </div>
            )}
        </nav>
    );
}
