import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="grid gap-8 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 content-start">
        <div>
          <h2 className="text-2xl font-light inline">A Welcome to our Community</h2>{" "}<i className="fa-solid fa-house-chimney fa-2xl"></i>
        </div>
        <Card heading="Dear Neighbors," description="Welcome to our wonderful community! We are thrilled to have you as part of our homeowner's association. Together, we create a vibrant and friendly neighborhood where everyone can feel at home. We encourage you to get involved in community events, share your ideas, and connect with your neighbors. If you have any questions or need assistance, please don't hesitate to reach out. Here's to building lasting friendships and a thriving community!" className="bg-[#1492df]" italic="font-normal" />
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <h2 className="text-2xl font-light inline">Meet our Board of Directors</h2> {" "}
          <i className="fa-solid fa-people-group fa-2xl"></i>
        </div>
        <section className="grid gap-8 grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
          <Card heading="Leslie Hogan" description="President, Board of Directors" className="bg-[#1492df]" italic="italic" />
          <Card heading="Josh Clark" description="Treasurer, Board of Directors" className="bg-[#1492df]" italic="italic" />
          <Card heading="Derek Duderstadt" description="Secretary, Board of Directors" className="bg-[#1492df]" italic="italic" />
        </section>
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <h2 className="text-2xl font-light inline">Pay Dues Online</h2>{" "}<i className="fa-solid fa-money-bill-wave fa-2xl"></i>
          <div className="bg-[#1492df] p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8" style={{ marginTop: '1rem' }}>
            <p>
              Conveniently pay your homeowner's association dues online through our <a href="https://app.autobooks.co/pay/barry-brooke-homeowners-assoc" target="_blank" rel="noopener noreferrer" className="underline font-bold">secure payment portal</a> (opens in a new tab).
              Simply click the secure payment portal link or "Pay Dues Online" at the top of the page to access the external payment page, where you can choose your preferred payment method and complete the transaction with ease.
              We offer multiple payment options, including apple pay, bank account, and credit card, to accommodate your preferences.
              Please note that there are fees associated with each payment method, which are outlined below.
              <br/><br/>If you want to support any particular fund, such as the "Welcome Fund" (which goes towards gifts for our new neighbors) add a note when making your payment.
              <br/><br/>Thank you for your prompt payments and support of our community!
            </p>
            <br/>
            <h3 className="text-lg font-bold italic">Fee Schedule</h3>
            <ul className="list-disc ml-10">
              <li><span style={{fontWeight: 'bold'}}>$110.00</span> due annually</li>
              <li><span style={{fontWeight: 'bold'}}>$1.00</span> debit card/bank account fee</li>
              <li><span style={{fontWeight: 'bold'}}>$4.00</span> credit card fee</li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-2" />
        <div>
          <Link href="/documents"><h2 className="text-2xl font-light inline">Documents</h2>{" "}<i className="fa-solid fa-file-pdf fa-2xl"></i></Link>
          <div className="bg-[#1492df] p-4 rounded-lg text-white text-[14px] md:text-[16px] leading-8" style={{ marginTop: '1rem' }}>
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
