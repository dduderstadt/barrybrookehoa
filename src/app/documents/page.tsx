import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow grid gap-8 grid-cols-1 bg-white p-3 sm:p-8 content-start">
        <div>
          <h2 className="text-2xl font-light inline">Documents</h2>{" "}
          <FontAwesomeIcon icon={faFolder} size="2xl" aria-hidden="true" />
        </div>
        <div className="bg-brand p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
          <ul className="list-disc ml-6">
            <li className="hover:underline"><a href="/documents/candr">Covenants &amp; Restrictions</a></li>
            <li className="hover:underline"><a href="/documents/meeting-notes">Meeting Notes</a></li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
