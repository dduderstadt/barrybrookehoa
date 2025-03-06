import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Documents() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Navbar />
            <h1 className="text-center text-2xl font-semibold pt-10">Documents</h1>
            <Footer />
        </div>
    )
}