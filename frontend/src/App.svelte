<script lang="ts">
  import Login from './componets/Login.svelte';
  import MessageList from './componets/MessageList.svelte';
  import CreatePostBar from './componets/CreatePostBar.svelte';
  import * as api from './api/apiClient';
  
  import type { Socket } from 'socket.io-client';

  let socket: Socket;
  let token: string;
  
  $: {
    if (token != null && socket == null) {
      socket = api.getSIOClient(token);
    }
  }
</script>

{#if socket != null}
  <CreatePostBar socket={socket} />
  <MessageList socket={socket} />
{/if}

{#if token == null}
  <Login bind:token={token} />
{/if}