import { render, userEvent, waitFor } from '#test-helpers';
import LoginForm from '../LoginForm.svelte';

test('Shows login form', () => {
  const { getByText, getByPlaceholderText, getByRole } = render(LoginForm);

  expect(getByText('Todo keeper')).toBeInTheDocument();

  expect(getByPlaceholderText('ID')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();

  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('When the login button is clicked without ID, shows error', async () => {
  const { getByRole, getByPlaceholderText } = render(LoginForm);

  await userEvent.type(getByPlaceholderText('Password'), 'password');

  await waitFor(() => expect(getByRole('alert', { name: 'You need ID and Password to login.' })));

  await waitFor(() => expect(getByRole('button', { name: 'Login' })).toBeEnabled());
});

test('When the login button is clicked without Password, shows error', async () => {
  const { getByRole, getByPlaceholderText } = render(LoginForm);

  await userEvent.type(getByPlaceholderText('ID'), 'loginId');

  await waitFor(() => expect(getByRole('alert', { name: 'You need ID and Password to login.' })));

  await waitFor(() => expect(getByRole('button', { name: 'Login' })).toBeEnabled());
});

export {};
