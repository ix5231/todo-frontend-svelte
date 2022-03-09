import {
  mock, waitFor, userEvent, within, renderRoute, router,
} from '#test-helpers';
import { def } from '#api';

test('Goto home page when correct ID/PW is provided', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => res(ctx.status(200))),
  );

  const { getByRole, getByPlaceholderText } = await renderRoute('/login');

  await userEvent.type(getByPlaceholderText('ID'), 'userid');
  await userEvent.type(getByPlaceholderText('Password'), 'password');
  await userEvent.click(getByRole('button', { name: 'Login' }));

  await waitFor(() => {
    expect(getByRole('button', { name: 'Login' })).toBeDisabled();
  });
  within(getByRole('button', { name: 'Login' })).getByRole('img', { name: 'Trying login...' });

  await waitFor(() => expect(router.getLocation()).toEqual('/'));
});

test('When the login button is clicked without correct ID/PW, shows error', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => res(
      ctx.status(401),
      ctx.json(def.paths['/login'].post.responses[401].content['application/json'].examples['Bad Login Credentials'].value),
    )),
  );

  const { getByRole, getByPlaceholderText } = await renderRoute('/login');

  await userEvent.type(getByPlaceholderText('ID'), 'badUserid');
  await userEvent.type(getByPlaceholderText('Password'), 'badPassword');
  await userEvent.click(getByRole('button', { name: 'Login' }));

  await waitFor(() => {
    expect(getByRole('button', { name: 'Login' })).toBeDisabled();
  });
  within(getByRole('button', { name: 'Login' })).getByRole('img', { name: 'Trying login...' });

  await waitFor(() => expect(getByRole('alert')).toHaveTextContent(/^Incorrect login ID or Password.$/));
  expect(getByRole('button', { name: 'Login' })).toBeEnabled();

  await waitFor(() => expect(router.getLocation()).toEqual('/login'));
});

export {};
