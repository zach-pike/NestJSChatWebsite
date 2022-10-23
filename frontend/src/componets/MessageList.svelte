<script lang="ts">
  import { onMount } from 'svelte';
  import { getMessageReadable } from '../api/apiClient';
  import type { Socket } from 'socket.io-client';
  import ChatMessage from './ChatMessage.svelte';

  export let socket: Socket;
  
  let messages = null;

  onMount(() => {
    messages = getMessageReadable(socket);
  })
</script>

{#if messages != null}
  {#each $messages as m}
    <ChatMessage {...m} />
  {/each}
{/if}