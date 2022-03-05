<script lang="ts">
	import axios from "axios";
	import { Diamonds } from 'svelte-loading-spinners';
	import { push } from "svelte-spa-router";
	
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
	<article class="border-2 p-8 shadow-md">
		<h1 class="text-4xl font-bold text-center mb-4">Todo keeper</h1>

		<div class="flex flex-col space-y-4">
			<input class="shadow-inner p-2 border-2 border-transparent transition-[border] focus:outline-none focus:border-black" type="text" placeholder="ID" />
			<input class="shadow-inner p-2 border-2 border-transparent transition-[border] focus:outline-none focus:border-black" type="password" placeholder="Password" />
			<button
				aria-label="Login"
				class="
					shadow-md h-10
					transition-colors cursor-pointer
					hover:bg-black hover:text-white
					disabled:text-white disabled:bg-gray-600 disabled:cursor-progres
				"
				disabled={loginInProgress}
				on:click={login}
			>
				{#if loginInProgress}
					<div class="flex justify-center" role="img" aria-label="Trying login...">
						<Diamonds color="#FFFFFF" />
					</div>
				{:else}
					Login
				{/if}
			</button>
		</div>
	</article>
</main>
