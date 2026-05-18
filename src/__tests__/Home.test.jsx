import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

beforeEach(() => {
  // Mock both /products and /store_info endpoints
  global.fetch = vi.fn((url) => {
    if (url.includes('store_info')) {
      return Promise.resolve({ json: () => Promise.resolve([{ id: 1, name: 'Wetin-Mart' }]) });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});

describe('Home', () => {
  it('renders the dashboard heading', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByText('Welcome to Wetin-Mart')).toBeInTheDocument());
  });

  it('renders View Products link', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByText('View Products')).toBeInTheDocument());
  });

  it('renders Add Product link', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByText('+ Add Product')).toBeInTheDocument());
  });
});
