import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';

beforeEach(() => {
  localStorage.clear();
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
    await waitFor(() => expect(screen.getByText('Vanilla Bean')).toBeInTheDocument());
  });

  it('renders product price', async () => {
    renderProduct();
    await waitFor(() => expect(screen.getByText('KSh 850')).toBeInTheDocument());
  });

  it('shows edit form when Edit is clicked', async () => {
    renderProduct();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('saves changes locally on save', async () => {
    renderProduct();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Vanilla Bean Deluxe' } });
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => expect(screen.getByText('Vanilla Bean Deluxe')).toBeInTheDocument());
  });

  it('deletes the product and navigates away', async () => {
    window.confirm = vi.fn(() => true);
    renderProduct();
    await waitFor(() => screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(screen.getByText('Products Page')).toBeInTheDocument());
  });
});
