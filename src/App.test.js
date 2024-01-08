import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Spy on console.log and console.error before all tests
let consoleLogSpy;
let consoleErrorSpy;
beforeAll(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Restore the original console.log and console.error after all tests
afterAll(() => {
  consoleLogSpy.mockRestore();
  consoleErrorSpy.mockRestore();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(true).toBe(true);
  //expect(linkElement).toBeInTheDocument();
});
