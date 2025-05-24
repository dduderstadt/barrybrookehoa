import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="grid gap-8 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 sm:p-8 content-start">
        <div>
          <h2 className="text-2xl font-light inline">A Welcome to our Community</h2>{" "}<i className="fa-solid fa-house-chimney fa-2xl"></i>
        </div>
        <Card heading="Dear Neighbors," description="Welcome to our wonderful community! We are thrilled to have you as part of our homeowner's association. Together, we create a vibrant and friendly neighborhood where everyone can feel at home. We encourage you to get involved in community events, share your ideas, and connect with your neighbors. If you have any questions or need assistance, please don't hesitate to reach out. Here's to building lasting friendships and a thriving community!" className="bg-[#1492df]" italic="font-normal" />
        <div>
          <h2 className="text-2xl font-light inline">Meet our Board of Directors</h2> {" "}
          <i className="fa-solid fa-people-group fa-2xl"></i>
        </div>
        <section className="grid gap-8 grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
          <Card heading="Leslie Hogan" description="President, Board of Directors" className="bg-[#1492df]" italic="italic" />
          <Card heading="Josh Clark" description="Treasurer, Board of Directors" className="bg-[#1492df]" italic="italic" />
          <Card heading="Derek Duderstadt" description="Secretary, Board of Directors" className="bg-[#1492df]" italic="italic" />
        </section>
        <Link href="/documents"><h2 className="text-2xl font-light inline">Documents</h2>{" "}<i className="fa-solid fa-file-pdf fa-2xl"></i></Link>
        <ul className="list-disc ml-10">
          <li className="hover:underline"><a href="/documents">Covenant Restrictions and Bylaws</a></li>
        </ul>
        <Footer />
      </main>
    </div >
  );
}
