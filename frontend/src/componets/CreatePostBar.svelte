<script lang="ts">
  import { Socket } from 'socket.io-client';
  import * as api from '../api/apiClient';
  
  export let socket: Socket;

  let text_v: string;
  function submit() {
    api.sendMessage(socket, text_v);
    text_v = "";
  }
</script>

<input type="text" bind:value={text_v} />
<button on:click={submit}>Send</button>