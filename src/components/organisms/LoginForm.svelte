<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Diamonds } from "svelte-loading-spinners";

  export let loginInProgress: boolean = false;
  export let apiError: string = "";

  let id = "";
  let password = "";
  let error = "";
  let badId = false;
  let badPassword = false;

  const inputClasses = "shadow-inner p-2 border-2 transition-[border] border-transparent focus:outline-none";
  const inputNormalClasses = `${inputClasses} focus:border-black`;
  const inputErrorClasses = `${inputClasses} bg-red-200 focus:border-rose-500`;

  const dispatch = createEventDispatcher<{ login: undefined }>();

  function onLogin() {
    badId = id === "";
    badPassword = password === "";
    if (!badId && !badPassword) {
      error = "";
      dispatch("login");
    } else {
      error = "You need ID and Password to login.";
    }
  }

  $: showError = error != '' ? error : apiError;
</script>

<article class="border-2 p-8 shadow-md w-96">
  <h1 class="text-4xl font-bold text-center mb-4">Todo keeper</h1>

  <div class="flex flex-col space-y-4">
    {#if showError != ''}
      <div id="loginErrorMessages" class="bg-red-200 px-5 py-3 text-center border-rose-500 border-2">
        <p role="alert" class="text-red-700">{showError}</p>
      </div>
    {/if}
    <input
      required
      bind:value={id}
      class={!badId ? inputNormalClasses : inputErrorClasses}
      type="text"
      placeholder="ID"
      aria-describedby={!badId ? undefined : "loginErrorMessages"}
    />
    <input
      required
      bind:value={password}
      class="shadow-inner p-2 border-2 border-transparent transition-[border] focus:outline-none focus:border-black"
      type="password"
      placeholder="Password"
      aria-describedby={!badPassword ? undefined : "loginErrorMessages"}
    />
    <button
      aria-label="Login"
      class="
        shadow-md h-10
        transition-colors cursor-pointer
        hover:bg-black hover:text-white
      disabled:text-white disabled:bg-gray-600 disabled:cursor-progres
      "
      disabled={loginInProgress}
      on:click={onLogin}
    >
      {#if loginInProgress}
        <div
          class="flex justify-center"
          role="img"
          aria-label="Trying login..."
        >
          <Diamonds color="#FFFFFF" />
        </div>
      {:else}
        Login
      {/if}
    </button>
  </div>
</article>
