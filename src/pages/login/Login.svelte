<script lang="ts">
	import axios from "axios";
	import { push } from "svelte-spa-router";
	import LoginForm from "#components/organisms/LoginForm.svelte";
	
	let loginInProgress = false;
	
	async function login() {
		loginInProgress = true;
		const res = await axios.post("/v1/login", {
			loginId: 'testid',
			password: 'hi',
		});
		if (res.status === 200) {
			loginInProgress = false;
			push("/");
		}
	}
</script>

<main class="flex justify-center items-center h-screen">
	<LoginForm {loginInProgress} on:login={login} />
</main>
