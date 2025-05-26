"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Documents() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pdfjsLib.GlobalWorkerOptions as any).isEvalSupported = false;
    // Disable the use of eval to address security concerns

    return (
        <div id="docs-container" className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
            <Navbar />
            <main className="grid gap-8 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 sm:p-8 content-start">
                <h2 className="text-center text-2xl font-light pt-10">Covenants &amp; Restrictions</h2>
                <div style={{ height: '60vh' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                        <Viewer
                            fileUrl="/assets/2025candr.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
                <Footer />
            </main>
        </div>
    )
}