import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow bg-white p-4 sm:p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
