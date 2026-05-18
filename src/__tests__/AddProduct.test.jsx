import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddProduct from '../pages/AddProduct';

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );
});

describe('AddProduct', () => {
  it('renders the form fields', () => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price (KSh)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });

  it('submits the form and calls fetch with POST', async () => {
    render(<MemoryRouter><AddProduct /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: 'Tablet' } });
    fireEvent.change(screen.getByPlaceholderText('Price (KSh)'), { target: { value: '200' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/products',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });
});
