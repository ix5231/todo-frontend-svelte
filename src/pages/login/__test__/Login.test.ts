import { render } from "@testing-library/svelte";
import Login from '../Login.svelte';

test('Shows login form', () => {
  const { getByText, getByPlaceholderText, getByRole } = render(Login);

  expect(getByText('Todo keeper')).toBeInTheDocument();

  expect(getByPlaceholderText('ID')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();

  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
})

export {};