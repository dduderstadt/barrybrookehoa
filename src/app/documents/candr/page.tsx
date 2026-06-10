"use client";
import dynamic from "next/dynamic";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilePdf } from "@fortawesome/free-solid-svg-icons";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function Documents() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/documents" aria-label="Back to Documents">
            <FontAwesomeIcon icon={faArrowLeft} size="2xl" className="text-brand hover:text-brand/70" aria-hidden="true" />
          </Link>
          <h2 className="text-2xl font-medium">Covenants &amp; Restrictions</h2>
        </div>
        <FontAwesomeIcon icon={faFilePdf} size="3x" className="text-brand" aria-hidden="true" />
      </div>
      <PdfViewer />
    </PageLayout>
  );
}
