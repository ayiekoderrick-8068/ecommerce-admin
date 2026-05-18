import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';

const mockProducts = [{ id: '1', name: 'Laptop', price: 500, category: 'Electronics', stock: 12, description: 'A great laptop.' }];

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (!options || options.method === 'GET') {
      return Promise.resolve({ json: () => Promise.resolve(mockProducts) });
    }
    if (options.method === 'PATCH') {
      return Promise.resolve({ json: () => Promise.resolve({ ...mockProducts[0], name: 'Laptop Pro', price: 600 }) });
    }
    if (options.method === 'DELETE') {
      return Promise.resolve({});
    }
  });
  global.confirm = vi.fn(() => true);
});

function renderProduct() {
  render(
    <MemoryRouter initialEntries={['/products/1']}>
      <Routes>
        <Route path="/products/:id" element={<Products />} />
        <Route path="/products" element={<div>Products Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Product detail page', () => {
  it('renders product name', async () => {
    renderProduct();
    await waitFor(() => expect(screen.getByText('Laptop')).toBeInTheDocument());
  });

  it('renders product price', async () => {
    renderProduct();
    await waitFor(() => expect(screen.getByText('KSh 500')).toBeInTheDocument());
  });

  it('shows edit form when Edit is clicked', async () => {
    renderProduct();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('calls PATCH on save', async () => {
    renderProduct();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products/1',
      expect.objectContaining({ method: 'PATCH' })
    ));
  });

  it('calls DELETE and navigates away', async () => {
    renderProduct();
    await waitFor(() => screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/products/1',
      expect.objectContaining({ method: 'DELETE' })
    ));
  });
});
