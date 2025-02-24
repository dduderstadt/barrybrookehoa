import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* TODO nav bar */}
      <main>
        {/* TODO background image of green space/entrance with overlay */}
        {/* TODO intro/welcome to our community */}
      </main>
      <section>
        {/* TODO tiles/cards of each board member */}
      </section>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xl font-semibold"
          href="mailto:barrybrookehoa@gmail.com"
          rel="noopener noreferrer"
        > Contact Us
        </a>
      </footer>
    </div>
  );
}
