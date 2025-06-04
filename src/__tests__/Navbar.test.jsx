import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

beforeEach(() => {
  localStorage.clear();
});

describe('Navbar', () => {
  test('renders login and sign-up links when no user session is stored', () => {
    expect(localStorage.getItem('isLoggedIn')).toBe(null);
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^log in$/i })).toBeInTheDocument();
  });
});
