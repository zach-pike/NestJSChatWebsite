<script lang="ts">
  import * as api from "../api/apiClient";
  
  let username: string;
  let password: string;

  export let token: string;
  let show_prompt = false;

  async function login() {
    console.log({ username, password })
    token = await api.getToken(username, password);
    console.log(token);
    show_prompt = true;
  }
</script>

<h1>Login</h1>
<input type="text" bind:value={username} placeholder="username" />
<input type="text" bind:value={password} placeholder="password" />
<button on:click={() => login()}>Login</button>

{#if show_prompt == true}
  {#if token == null}
    <p>Incorrect password!</p>
  {:else}
    <p>{token}</p>
  {/if}
{/if}