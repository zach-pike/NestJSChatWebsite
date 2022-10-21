<script lang="ts">
  import { onMount } from 'svelte';
  import { getMessageReadable } from '../api/apiClient';
  import type { Socket } from 'socket.io-client';

  export let socket: Socket;
  
  let messages = null;

  onMount(() => {
    messages = getMessageReadable(socket);
  })
</script>

{#if messages != null}
  {#each $messages as m}
    <p>By: {m.author}</p>
    <p>{m.content}</p>
  {/each}
{/if}