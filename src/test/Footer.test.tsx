import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe('Footer', () => {
    it('contact link has the correct mailto href', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /barrybrookehoa@gmail\.com/i});
        expect(link).toHaveAttribute('href', 'mailto:barrybrookehoa@gmail.com');
    });

    it('displays the HOA email address as the link text', () => {
        render(<Footer />);
        expect(screen.getByText('barrybrookehoa@gmail.com')).toBeInTheDocument();
    });
});