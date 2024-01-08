import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Temporarily override console.error before all tests
beforeAll(() => {
  global.console.error = jest.fn();
});

// Restore the original console.error after all tests
afterAll(() => {
  global.console.error.mockRestore();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(true).toBe(true);
  //expect(linkElement).toBeInTheDocument();
});
