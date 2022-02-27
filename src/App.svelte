<script lang="ts">
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<main>
	<Router {routes} />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
