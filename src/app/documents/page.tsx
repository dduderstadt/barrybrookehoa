"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Documents() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)] header-min-height">
            <Navbar />
            <h1 className="text-center text-2xl font-semibold pt-10">Documents</h1>
            <div>
                <h2 className="text-center text-xl font-semibold">Covenant &amp; Restrictions</h2>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                    <div>
                        <Viewer fileUrl="/assets/2025candr.pdf" plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </Worker>
            </div>
            <Footer />
        </div>
    )
}