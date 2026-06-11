import PageLayout from "@/components/PageLayout";
import { HOA_PAYMENT_URL } from "@/lib/constants";
import { Card } from "@/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faPeopleGroup, faCreditCard, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">A Welcome to our Community</h2>
        <FontAwesomeIcon icon={faHouseChimney} size="3x" className="text-brand" aria-hidden="true" />
      </div>
      <Card heading="Dear Neighbors," description="Welcome to our wonderful community! We are thrilled to have you as part of our homeowner's association. Together, we create a vibrant and friendly neighborhood where everyone can feel at home. We encourage you to get involved in community events, share your ideas, and connect with your neighbors. If you have any questions or need assistance, please don't hesitate to reach out. We look forward to working with you to maintain a welcoming and well-kept community." className="bg-brand" />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Meet our Board of Directors</h2>
        <FontAwesomeIcon icon={faPeopleGroup} size="3x" className="text-brand" aria-hidden="true" />
      </div>
      <section className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <Card
          heading="Leslie Hogan"
          description="President, Board of Directors"
          bio="Leslie is a dedicated Real Estate Broker Salesperson who is passionate about her community and family."
          className="bg-brand" italic />
        <Card
          heading="Josh Clark"
          description="Treasurer, Board of Directors"
          bio="When not working as an Industrial Electrician, Josh enjoys spending time traveling with his family."
          className="bg-brand" italic />
        <Card
          heading="Derek Duderstadt"
          description="Secretary, Board of Directors"
          bio="Derek is a professional Software Developer who is actively involved in his church and loves spending time with his family."
          className="bg-brand" italic />
      </section>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Pay Dues Online</h2>
        <FontAwesomeIcon icon={faCreditCard} size="3x" className="text-brand" aria-hidden="true" />
      </div>
      <div className="bg-brand p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
        <p>
          Conveniently pay your homeowner&apos;s association dues online through our <a href={HOA_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-white/70">secure payment portal</a> (opens in a new tab).
          We offer multiple payment options, including Apple Pay, bank account, and credit card, to accommodate your preferences.
          Please note that there are fees associated with each payment option, which are outlined below.
        </p>
        <p className="mt-4">
          If you want to support any particular fund, such as the &ldquo;Welcome Fund&rdquo; (which goes towards gifts for our new neighbors) add a note when making your payment.
          Thank you for your prompt payments and support of our community!
        </p>
        <h3 className="text-lg font-bold italic mt-4">Fee Schedule</h3>
        <ul className="list-disc ml-10">
          <li><span className="font-bold">$110.00</span> due annually (plus any <span className="text-red-600 font-bold text-outline-white">late fees</span>)</li>
          <li><span className="font-bold">$1.00</span> debit card/bank account fee</li>
          <li><span className="font-bold">$4.00</span> credit card fee</li>
        </ul>
      </div>

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
