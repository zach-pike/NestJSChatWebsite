<style global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
  

<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes';

  // let socket: Socket;
  // let token: string;
  
  // $: {
  //   if (token != null && socket == null) {
  //     socket = api.getSIOClient(token);
  //   }
  // }
  import { token } from "./stores";

</script>

<!-- {#if socket != null}
  <CreatePostBar socket={socket} />
  <MessageList socket={socket} />
{/if}

{#if token == null}
  <Login bind:token={token} />
{/if} -->

<Router {routes} />
