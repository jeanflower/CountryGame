import { render, screen } from '@testing-library/react';
import App from './App';

test('expect to see text as Start and End on the screen', () => {
  render(<App />);
  const startElement = screen.getByText(/Start/i);
  expect(startElement).toBeInTheDocument();

  const endElement = screen.getByText(/End/i);
  expect(endElement).toBeInTheDocument();

});
