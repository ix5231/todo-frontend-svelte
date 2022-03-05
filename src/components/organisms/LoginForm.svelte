<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import { Diamonds } from 'svelte-loading-spinners';

    export let loginInProgress: boolean = false;
    
    const dispatch = createEventDispatcher<{ login: undefined }>();
</script>

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
            on:click={() => dispatch("login")}
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