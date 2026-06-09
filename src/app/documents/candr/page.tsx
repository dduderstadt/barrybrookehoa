"use client";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function Documents() {
    return (
        <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
            <Navbar />
            <main className="flex-grow grid gap-8 grid-cols-1 bg-white p-3 sm:p-8 content-start">
                <div>
                  <Link href="/documents" aria-label="Back to Documents">
                    <FontAwesomeIcon icon={faArrowLeft} size="2xl" className="text-brand hover:text-brand/70" aria-hidden="true" />
                  </Link>
                </div>
                <h2 className="text-center text-2xl font-light">Covenants &amp; Restrictions</h2>
                <PdfViewer />
            </main>
            <Footer />
        </div>
    );
}
