import PageLayout from "@/components/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default function DocumentsPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Documents</h2>
        <FontAwesomeIcon icon={faFolderOpen} size="3x" className="text-brand" aria-hidden="true" />
      </div>
      <div className="bg-brand p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
        <ul className="list-disc ml-6">
          <li className="hover:underline"><a href="/documents/candr">Covenants &amp; Restrictions</a></li>
          <li className="hover:underline"><a href="/documents/meeting-notes">Meeting Notes</a></li>
        </ul>
      </div>
    </PageLayout>
  );
}
