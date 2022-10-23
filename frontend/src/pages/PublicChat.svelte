<script lang="ts">
    import { token } from "../stores";
    import { getSIOClient } from "../api/apiClient";
  import MessageList from "../componets/MessageList.svelte";
  import CreatePostBar from "../componets/CreatePostBar.svelte";
  import { navigateTo } from 'svelte-router-spa'

    let socket = $token != null ? getSIOClient($token) : null;
</script>

{#if socket != null}
    <div class="p-2">
      <div class="flex justify-center">
        <p class="text-2xl w-fit">Public chat</p>
        <button class="ml-auto px-3 py-1 border border-1 border-gray-700 rounded bg-gray-50 hover:bg-gray-100 m-1" on:click={() => navigateTo("/home")}>Go back</button>
      </div>
      <div class="border border-black w-full h-0" />
      <CreatePostBar {socket} />
      <MessageList {socket} />
    </div>
{/if}