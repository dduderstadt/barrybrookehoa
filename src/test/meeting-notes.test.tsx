import { render, screen } from '@testing-library/react';
import MeetingNotesPage from '@/app/documents/meeting-notes/page';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Meeting Notes page', () => {
  it('applies encodeURIComponent to filenames with spaces in the href', () => {
    render(<MeetingNotesPage />);
    const link = screen.getByRole('link', { name: 'June 8th, 2026 Annual Meeting Notes' });
    expect(link).toHaveAttribute('href', '/assets/HOA%20Meeting%202026-06-08.pdf');
  });

  it('opens meeting note links in a new tab with secure rel attributes', () => {
    render(<MeetingNotesPage />);
    const link = screen.getByRole('link', { name: 'June 8th, 2026 Annual Meeting Notes' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('back arrow links to the Documents hub', () => {
    render(<MeetingNotesPage />);
    expect(screen.getByRole('link', { name: 'Back to Documents' })).toHaveAttribute('href', '/documents');
  });
});
