<script lang="ts">
	import axios from 'axios';
	import { push } from 'svelte-spa-router';
	import LoginForm from '#components/organisms/LoginForm.svelte';
	import { isValidationError } from '#root/src/utils';

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
				push('/');
			} else {
				apiError = 'Unknown error occured. Please Contact to Support.';
			}
			loginInProgress = false;
		} catch (e) {
			if (
				axios.isAxiosError(e) &&
				(isValidationError(e) || e.response?.status === 401)
			) {
				apiError = 'Incorrect login ID or Password.';
			} else {
				apiError = 'Unknown error occured. Please Contact to Support.';
			}
			loginInProgress = false;
		}
	}
</script>

<main class="flex justify-center items-center h-screen">
	<LoginForm {loginInProgress} on:login={login} {apiError} />
</main>
