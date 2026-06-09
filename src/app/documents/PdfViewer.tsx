"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfjsLib.GlobalWorkerOptions as any).isEvalSupported = false;

export default function PdfViewer() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div style={{ height: "60vh" }}>
            <Worker workerUrl="/pdf.worker.js">
                <Viewer
                    fileUrl="/assets/2025candr.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
}
