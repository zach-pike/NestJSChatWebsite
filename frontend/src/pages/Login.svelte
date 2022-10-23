<script lang="ts">
  import * as api from "../api/apiClient";
  import { token } from "../stores";
  import { navigateTo } from 'svelte-router-spa'
  
  let username: string;
  let password: string;
  let tok: string;

  let show_prompt = false;

  async function login() {
    tok = await api.getToken(username, password);
    show_prompt = true;

    if (tok != null) {
      token.set(tok);
      localStorage.setItem('token', tok);
      navigateTo("/home")
    }
  }
</script>

<div class="m-4 w-full h-screen flex justify-center items-center p-0 m-0">
  <div class="h-fit">
    <h1 class="text-2xl">Login</h1>
    <div class="w-80">
      <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="text" bind:value={username} placeholder="Username" />
      <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="password" bind:value={password} placeholder="Password" />
      <div class="flex items-center">
        <button class="px-3 py-1 border border-1 border-gray-700 rounded bg-gray-50 hover:bg-gray-100 mr-2" on:click={() => login()}>Login</button>
        <a href="/signup" class="underline">Sign up</a>
      </div>
      
    </div>
  </div>
</div>

{#if show_prompt == true}
  {#if token == null}
    <p>Incorrect password!</p>
  {:else}
    <p>{tok}</p>
  {/if}
{/if}