import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../Components/NavBar';

describe('NavBar', () => {
  it('renders all navigation links', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('Home link points to /', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('Products link points to /products', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
  });
});
