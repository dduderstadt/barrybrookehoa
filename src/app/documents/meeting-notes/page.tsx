import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface MeetingNotesEntry {
  date: string;
  label: string;
  file: string;
}

const meetingNotes: MeetingNotesEntry[] = [
  { date: "2026-06-08", label: "June 8th, 2026 Annual Meeting Notes", file: "HOA Meeting 2026-06-08.pdf" },
];

export default function MeetingNotesPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow grid gap-8 grid-cols-1 bg-white p-3 sm:p-8 content-start">
        <div>
          <Link href="/documents" aria-label="Back to Documents">
            <FontAwesomeIcon icon={faArrowLeft} size="2xl" className="text-brand hover:text-brand/70" aria-hidden="true" />
          </Link>
          <h2 className="text-2xl font-light inline">Meeting Notes</h2>{" "}
          <FontAwesomeIcon icon={faFileLines} size="2xl" aria-hidden="true" />
        </div>
        <div className="bg-brand p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
          <ul className="list-disc ml-6">
            {meetingNotes.map((entry) => (
              <li key={entry.date} className="hover:underline">
                <a
                  href={`/assets/${encodeURIComponent(entry.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
