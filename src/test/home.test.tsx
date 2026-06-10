import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Home page', () => {
  it('displays the correct annual dues amount', () => {
    render(<Home />);
    expect(screen.getByText('$110.00')).toBeInTheDocument();
  });

  it('displays the correct debit card fee', () => {
    render(<Home />);
    expect(screen.getByText('$1.00')).toBeInTheDocument();
  });

  it('displays the correct credit card fee', () => {
    render(<Home />);
    expect(screen.getByText('$4.00')).toBeInTheDocument();
  });

  it('lists each board member with their correct title', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 3, name: 'Leslie Hogan' })).toBeInTheDocument();
    expect(screen.getByText('President, Board of Directors')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 3, name: 'Josh Clark' })).toBeInTheDocument();
    expect(screen.getByText('Treasurer, Board of Directors')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 3, name: 'Derek Duderstadt' })).toBeInTheDocument();
    expect(screen.getByText('Secretary, Board of Directors')).toBeInTheDocument();
  });

  it('Pay Dues link opens securely in a new tab', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /secure payment portal/i });
    expect(link).toHaveAttribute('href', 'https://app.autobooks.co/pay/barry-brooke-homeowners-assoc');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Documents section links to the correct sub-pages', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Covenants & Restrictions' })).toHaveAttribute('href', '/documents/candr');
    expect(screen.getByRole('link', { name: 'Meeting Notes' })).toHaveAttribute('href', '/documents/meeting-notes');
  });
});
