<script lang="ts">
    import { delete_public_post, tokenReadable, get_user } from "../api/apiClient"

    export let author: string;
    export let content: string;
    export let id: string = "";

    let tbd = false;

    let user = get_user($tokenReadable);
  
    async function delete_post() {
        tbd = true;
        await delete_public_post($tokenReadable, id);
        tbd = false;
    }
</script>

<div class="flex items-center {tbd ? 'opacity-50' : ''}">
    {#if user.admin}
      <button class="py-1 px-5 m-2 border border-black border-2 rounded-md text-xs hover:bg-gray-100" on:click={() => delete_post()}>🗑️</button>
    {/if}
    <p><span class="font-bold">{author}</span>: {content} </p>
</div>