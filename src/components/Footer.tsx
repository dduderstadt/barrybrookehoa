import { HOA_EMAIL } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center bg-brand text-white p-6 w-full">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <a className="hover:underline hover:underline-offset-4" href={`mailto:${HOA_EMAIL}`} rel="noopener noreferrer">{HOA_EMAIL}</a>
        </footer>
    );
}