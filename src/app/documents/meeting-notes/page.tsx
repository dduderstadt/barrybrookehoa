import PageLayout from "@/components/PageLayout";
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
    <PageLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/documents" aria-label="Back to Documents">
            <FontAwesomeIcon icon={faArrowLeft} size="2xl" className="text-brand hover:text-brand/70" aria-hidden="true" />
          </Link>
          <h2 className="text-2xl font-medium">Meeting Notes</h2>
        </div>
        <FontAwesomeIcon icon={faFileLines} size="3x" className="text-brand" aria-hidden="true" />
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
    </PageLayout>
  );
}
