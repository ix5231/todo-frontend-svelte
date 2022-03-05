import { server, render, waitFor, userEvent, within, renderRoute, getLocation, rest } from "#test-helpers";

import Login from '../Login.svelte';

test('Shows login form', () => {
  const { getByText, getByPlaceholderText, getByRole } = render(Login);

  expect(getByText('Todo keeper')).toBeInTheDocument();

  expect(getByPlaceholderText('ID')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();

  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('Goto home page when correct ID/PW is provided', async () => {
  server.use(
    rest.post('/v1/login', (_req, res, ctx) => {
      ctx.delay(2000);
      ctx.status(200);
      return res();
    })
  );
  
  const { getByRole, getByPlaceholderText } = await renderRoute("/login");

  await userEvent.type(getByPlaceholderText('ID'), 'userid');
  await userEvent.type(getByPlaceholderText('Password'), 'password');
  await userEvent.click(getByRole('button', { name: 'Login' }));

  await waitFor(() => {
    expect(getByRole('button', { name: 'Login' })).toBeDisabled();
  });
  await waitFor(() => {
    within(getByRole('button', { name: 'Login' })).getByRole('img', { name: 'Trying login...' });
  });

  await waitFor(() => expect(getLocation()).toEqual('/'));
});

test.todo('When the login button is clicked without ID, login API is not called and shows ');

export {};