import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../Components/SearchBar';

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar search="" setSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('calls setSearch when user types', () => {
    const setSearch = vi.fn();
    render(<SearchBar search="" setSearch={setSearch} />);
    fireEvent.change(screen.getByPlaceholderText('Search products...'), {
      target: { value: 'Laptop' },
    });
    expect(setSearch).toHaveBeenCalledWith('Laptop');
  });
});
