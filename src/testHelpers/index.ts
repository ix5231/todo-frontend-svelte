import { rest } from 'msw';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { render } from '@testing-library/svelte';
import { replace, location } from 'svelte-spa-router';
import App from '#src/App.svelte';
import server from './mock/server';

export async function renderRoute(route: string): Promise<ReturnType<typeof render>> {
  replace(route);
  const args = render(App);
  await tick();
  await tick();
  await tick();
  return args;
}

export const router = {
  getLocation(): string {
    return get(location);
  },
};

export const mock = {
  server,
  rest,
};

export * from '@testing-library/svelte';
export { within } from '@testing-library/dom';
export { default as userEvent } from '@testing-library/user-event';
