import { mock, waitFor, userEvent, within, renderRoute, router } from "#test-helpers";

test('Goto home page when correct ID/PW is provided', async () => {
  mock.server.use(
    mock.rest.post('/v1/login', (_req, res, ctx) => {
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
  within(getByRole('button', { name: 'Login' })).getByRole('img', { name: 'Trying login...' });

  await waitFor(() => expect(router.getLocation()).toEqual('/'));
});

export {};