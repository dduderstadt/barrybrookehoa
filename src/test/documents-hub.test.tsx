import { render, screen } from '@testing-library/react';
import DocumentsPage from '@/app/documents/page';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Documents hub page', () => {
  it('links to the C&Rs sub-page', () => {
    render(<DocumentsPage />);
    expect(screen.getByRole('link', { name: 'Covenants & Restrictions' })).toHaveAttribute('href', '/documents/candr');
  });

  it('links to the Meeting Notes sub-page', () => {
    render(<DocumentsPage />);
    expect(screen.getByRole('link', { name: 'Meeting Notes' })).toHaveAttribute('href', '/documents/meeting-notes');
  });
});
