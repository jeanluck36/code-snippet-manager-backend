// src/__tests__/home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the Next.js logo', () => { // Changed description
    render(<Home />);
    // screen.debug(); // You can keep this line if you want to see the DOM output

    // This queries for an image element by its 'alt' text
    const nextjsLogo = screen.getByAltText('Next.js logo');
    expect(nextjsLogo).toBeInTheDocument();
  });

  // You could also add another test for text content if you wish, e.g.:
  it('renders "Get started by editing..." text', () => {
    render(<Home />);
    const getStartedText = screen.getByText(/Get started by editing/i); // Using regex for partial match, case-insensitive
    expect(getStartedText).toBeInTheDocument();
  });
});