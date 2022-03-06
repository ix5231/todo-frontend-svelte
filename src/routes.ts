import Home from './pages/Home.svelte';
import Login from './pages/login/Login.svelte';
import NotFound from './pages/NotFound.svelte';

export default {
  '/login': Login,
  '/': Home,
  '*': NotFound,
};
