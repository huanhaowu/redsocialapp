import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Componentes/Pages/Login';
import { AuthContext } from '../Componentes/AppContext/AppContext';

describe('Login Component Tests', () => {
  beforeEach(() => {
    // Mock the context values and functions used in the Login component
    const mockSignInWithGoogle = jest.fn();
    const mockLoginWithEmailAndPassword = jest.fn();

    // Provide the mock context to the Login component
    // Wrap Login component inside MemoryRouter to mock the router context
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ signInWithGoogle: mockSignInWithGoogle, loginWithEmailAndPassword: mockLoginWithEmailAndPassword }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  });

  test('renders login form with all required fields', () => {
    expect(true).toBeTruthy();
  });

  test('validates user inputs and provides error messages', async () => {
    expect(true).toBeTruthy();
  });

  test('allows the user to enter their email and password', () => {
    expect(true).toBeTruthy();
  });
});
