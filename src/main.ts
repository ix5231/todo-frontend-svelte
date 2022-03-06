import axios from 'axios';
import App from './App.svelte';

axios.defaults.baseURL = 'http://127.0.0.1:4010';

const app = new App({
  target: document.body,
});

export default app;
