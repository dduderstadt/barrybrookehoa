import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="grid gap-8 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 sm:p-8">
        {/* TODO background image of green space/entrance with overlay */}
        {/* TODO intro/welcome to our community */}
        <h1 className="text-2xl font-semibold underline">A Welcome to our Community</h1>
        <Card heading="Dear Neighbors," description="Welcome to our wonderful community! We are thrilled to have you as part of our homeowner's association. Together, we create a vibrant and friendly neighborhood where everyone can feel at home. We encourage you to get involved in community events, share your ideas, and connect with your neighbors. If you have any questions or need assistance, please don't hesitate to reach out.Here's to building lasting friendships and a thriving community!" className="bg-[#1492df]" italic="font-normal" />
      </main>
      <section className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 bg-white p-3 sm:p-8">
        <h1 className="text-2xl font-semibold underline">Meet our Board of Directors</h1>
      </section>
      <section className="grid gap-8 grid-cols-3 md:grid-cols-3 xl:grid-cols-3 bg-white p-3 sm:p-8">
        {/* TODO tiles/cards of each board member */}
        <Card heading="Leslie Hogan" description="President, Board of Directors" className="bg-[#1492df]" italic="italic" />
        <Card heading="Josh Clark" description="Treasurer, Board of Directors" className="bg-[#1492df]" italic="italic" />
        <Card heading="Derek Duderstadt" description="Secretary, Board of Directors" className="bg-[#1492df]" italic="italic" />
      </section>
      <Footer />
    </div>
  );
}
