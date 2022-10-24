<script lang="ts">
  import type { Socket } from 'socket.io-client';
  import * as api from '../api/apiClient';
  
  export let socket: Socket;

  let text_v: string;
  function submit() {
    api.sendMessage(socket, text_v);
    text_v = "";
  }
</script>

<div class="flex mt-2">
  <input class="block p-2 w-96 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="text" placeholder="Message" bind:value={text_v} />
  <button class="px-3 py-1 border border-1 border-gray-700 rounded bg-gray-50 hover:bg-gray-100 m-1" on:click={submit}>Send</button>
</div>