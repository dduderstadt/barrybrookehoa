import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

vi.mock('next/link', () => ({
    default: ({ href, children, ...props}:
        React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
            <a href={href} {...props}>{children}</a>
    ),
}));

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

it('home link points to /', () => {
    render(<Navbar />);
    expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveAttribute('href', '/');
});

it('documents link points to /documents', () => {
    render(<Navbar />);
    expect(screen.getAllByRole('link', { name: 'Documents' })[0]).toHaveAttribute('href', '/documents');
});

it('pay dues link points to the payment portal and opens securely in a new tab', () => {
    render(<Navbar />);
    const link = screen.getAllByRole('link', { name: 'Pay Dues Online' })[0];
    expect(link).toHaveAttribute('href', 'https://app.autobooks.co/pay/barry-brooke-homeowners-assoc');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

it('contact us link points to the HOA email', () => {
    render(<Navbar />);
    expect(screen.getAllByRole('link', { name: 'Contact Us' })[0]).toHaveAttribute('href', 'mailto:barrybrookehoa@gmail.com');
});