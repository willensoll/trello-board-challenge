import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders trello board', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trello Board!/i);
  expect(linkElement).toBeInTheDocument();
});
