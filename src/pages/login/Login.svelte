<script lang="ts">
	import axios from 'axios';
	import { push } from 'svelte-spa-router';
	import LoginForm from '#components/organisms/LoginForm.svelte';

	let loginInProgress = false;
	let apiError = '';

	async function login() {
	  loginInProgress = true;
		try {
			const res = await axios.post('/v1/login', {
				loginId: 'testid',
				password: 'hi',
			});
			if (res.status === 200) {
				loginInProgress = false;
				push('/');
			}
		} catch {
			loginInProgress = false;
			apiError = 'Incorrect login ID or Password.';
		}
	}
</script>

<main class="flex justify-center items-center h-screen">
	<LoginForm {loginInProgress} on:login={login} {apiError} />
</main>
