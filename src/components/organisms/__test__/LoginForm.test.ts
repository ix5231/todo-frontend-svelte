import { render } from "#test-helpers";
import LoginForm from '../LoginForm.svelte';

test('Shows login form', () => {
  const { getByText, getByPlaceholderText, getByRole } = render(LoginForm);

  expect(getByText('Todo keeper')).toBeInTheDocument();

  expect(getByPlaceholderText('ID')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();

  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

export {};