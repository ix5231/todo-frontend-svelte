import {
  mock, waitFor, userEvent, within, renderRoute, router,
} from '#test-helpers';
import { def } from '#api';

async function renderAndLogin(id: string, pw: string) {
  const utils = await renderRoute('/login');

  await userEvent.type(utils.getByPlaceholderText('ID'), id);
  await userEvent.type(utils.getByPlaceholderText('Password'), pw);
  await userEvent.click(utils.getByRole('button', { name: 'Login' }));

  await waitFor(() => {
    expect(utils.getByRole('button', { name: 'Login' })).toBeDisabled();
  });
  within(utils.getByRole('button', { name: 'Login' })).getByRole('img', { name: 'Trying login...' });

  return utils;
}

test('Goto home page when correct ID/PW is provided', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => res(ctx.status(200))),
  );

  await renderAndLogin('loginId', 'password');

  await waitFor(() => expect(router.getLocation()).toEqual('/'));
});

test('When the login button is clicked without correct ID/PW, shows incorrect ID/PW error', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => res(
      ctx.status(401),
      ctx.json(def.paths['/login'].post.responses[401].content['application/json'].examples['Bad Login Credentials'].value),
    )),
  );

  const { getByRole } = await renderAndLogin('badLoginId', 'badPassword');

  await waitFor(() => expect(getByRole('alert')).toHaveTextContent(/^Incorrect login ID or Password.$/));
  expect(getByRole('button', { name: 'Login' })).toBeEnabled();

  await waitFor(() => expect(router.getLocation()).toEqual('/login'));
});

test('When the server respond with validation error, shows incorrect ID/PW error', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => res(
      ctx.status(400),
      ctx.json(def.paths['/login'].post.responses[400].content['application/json'].examples['Validation Error'].value),
    )),
  );

  const { getByRole } = await renderAndLogin('badLoginId', 'badPassword');

  await waitFor(() => expect(getByRole('alert')).toHaveTextContent(/^Incorrect login ID or Password.$/));
  expect(getByRole('button', { name: 'Login' })).toBeEnabled();

  await waitFor(() => expect(router.getLocation()).toEqual('/login'));
});

test.each([
  [500, def.paths['/login'].post.responses[500].content['application/json'].examples['Internal Server Error'].value],
  [400, { /* none */ }],
  [201, { /* none */ }],
])(
  'When unexpected response came on login, shows error indicates unknown error occured: Case $#',
  async (code, resBody) => {
    mock.server.use(
      mock.rest.post('/v1/login', (_req, res, ctx) => res(
        ctx.status(code),
        ctx.json(resBody),
      )),
    );

    const { getByRole } = await renderAndLogin('badLoginId', 'badPassword');

    await waitFor(() => expect(getByRole('alert')).toHaveTextContent(/^Unknown error occured. Please Contact to Support.$/));
    expect(getByRole('button', { name: 'Login' })).toBeEnabled();

    await waitFor(() => expect(router.getLocation()).toEqual('/login'));
  },
);

export {};
