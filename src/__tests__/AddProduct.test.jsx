import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddProduct from '../pages/AddProduct';

beforeEach(() => {
  localStorage.clear();
});

describe('AddProduct', () => {
  it('renders the form fields', () => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price (KSh)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });

  it('submits the form and saves the product locally', async () => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: 'Tablet' } });
    fireEvent.change(screen.getByPlaceholderText('Price (KSh)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Category (e.g. Electronics)'), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByPlaceholderText('Stock quantity'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Product description'), { target: { value: 'A new tablet.' } });
    fireEvent.change(screen.getByPlaceholderText('Image URL (optional)'), { target: { value: 'https://example.com/tablet.png' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));

    await waitFor(() => {
      expect(screen.getByText('Product added successfully!')).toBeInTheDocument();
      const storedProducts = JSON.parse(localStorage.getItem('addedProducts'));
      expect(storedProducts).toHaveLength(1);
      expect(storedProducts[0]).toMatchObject({ name: 'Tablet', category: 'Electronics', price: 200, stock: 5, image: 'https://example.com/tablet.png' });
    });
  });
});
