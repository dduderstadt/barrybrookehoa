import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow grid gap-8 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 content-start">
        <div>
          <h2 className="text-2xl font-light inline">A Welcome to our Community</h2>{" "}
          <i className="fa-solid fa-house-chimney fa-2xl text-brand" aria-hidden="true"></i>
        </div>
        <Card heading="Dear Neighbors," description="Welcome to our wonderful community! We are thrilled to have you as part of our homeowner's association. Together, we create a vibrant and friendly neighborhood where everyone can feel at home. We encourage you to get involved in community events, share your ideas, and connect with your neighbors. If you have any questions or need assistance, please don't hesitate to reach out. We look forward to working with you to maintain a welcoming and well-kept community." className="bg-brand" />
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <h2 className="text-2xl font-light inline">Meet our Board of Directors</h2> {" "}
          <i className="fa-solid fa-people-group fa-2xl text-brand" aria-hidden="true"></i>
        </div>
        <section className="grid gap-8 grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
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
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <h2 className="text-2xl font-light inline">Pay Dues Online</h2>{" "}
          <i className="fa-solid fa-money-bill-wave fa-2xl text-green-500" aria-hidden="true"></i>
          <div className="bg-brand mt-4 p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
            <p>
              Conveniently pay your homeowner&apos;s association dues online through our <a href="https://app.autobooks.co/pay/barry-brooke-homeowners-assoc" target="_blank" rel="noopener noreferrer" className="underline font-bold">secure payment portal</a> (opens in a new tab).
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
        </div>
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <h2 className="text-2xl font-light inline"><Link href="/documents">Documents</Link></h2>{" "}<i className="fa-solid fa-file-pdf fa-2xl" aria-hidden="true"></i>
          <div className="bg-brand mt-4 p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8">
            <ul className="list-disc ml-6">
              <li className="hover:underline"><a href="/documents">Covenant Restrictions and Bylaws</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div >
  );
}
