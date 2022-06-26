import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

test("renders learn react link", () => {
  render(<App />);
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
});
