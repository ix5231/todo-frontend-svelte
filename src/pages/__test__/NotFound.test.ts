import { renderRoute } from "#root/src/testHelpers";

it('Shows on invalid URL', async () => {
  const { getByText } = await renderRoute('/invalid/url/here');
  
  getByText('Not found');
})

export {};