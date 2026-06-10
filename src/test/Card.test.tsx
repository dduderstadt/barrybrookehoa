import { render, screen } from "@testing-library/react";
import { Card } from "@/components/Card";

describe('Card', () => {
    it('applies bold italic styling to description when italic is true', () => {
        render(<Card heading="Name" description="President" className="bg-brand" italic />);
        expect(screen.getByText('President')).toHaveClass('font-bold', 'italic');
    });

    it('uses normal font weight for description by default', () => {
        render(<Card heading="Name" description="President" className="bg-brand" />);
        expect(screen.getByText('President')).not.toHaveClass('italic');
    });

    it('renders bio as a separate element from description', () => {
        render(<Card heading="Name" description="Title" className="bg-brand" bio="Board member since 2022." />);
        const description = screen.getByText('Title');
        const bio = screen.getByText('Board member since 2022.');
        expect(bio).not.toBe(description);
    });

    it('does not render a bioparagraph when bio is omitted', () => {
        render(<Card heading="Name" description="Title" className="bg-brand" />);
        expect(screen.queryByText('Board member since 2022.')).not.toBeInTheDocument();
    });

    it('renders heading at the correct semantic level', () => {
        render(<Card heading="Tommy Lee Jones" description="Treasurer" className="bg-brand" />);
        expect(screen.getByRole('heading', { level: 3, name: 'Tommy Lee Jones' })).toBeInTheDocument();
    });
});