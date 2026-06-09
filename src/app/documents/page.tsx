"use client";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function Documents() {
    return (
        <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
            <Navbar />
            <main className="flex-grow grid gap-8 grid-cols-1 bg-white p-3 sm:p-8 content-start">
                <h2 className="text-center text-2xl font-light pt-10">Covenants &amp; Restrictions</h2>
                <PdfViewer />
            </main>
            <Footer />
        </div>
    );
}
