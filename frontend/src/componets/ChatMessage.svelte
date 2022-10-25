<script lang="ts">
    import { tokenReadable, jwtDecode, deleteLocalstorageTokens } from "../api/apiClient"
    import { deletePublicPost } from "../api/adminApi"
  import { navigateTo } from "svelte-router-spa";

    export let author: string;
    export let content: string;
    export let id: string = "";

    let tbd = false;

    let user = jwtDecode($tokenReadable);
  
    async function delete_post() {
        tbd = true;
        let err = await deletePublicPost($tokenReadable, id);
        if (err) {
            deleteLocalstorageTokens();
            navigateTo('/');
        }
        tbd = false;
    }
</script>

<div class="flex items-center {tbd ? 'opacity-50' : ''}">
    {#if user.admin}
      <button class="py-1 px-5 m-2 border border-black border-2 rounded-md text-xs hover:bg-gray-100" on:click={() => delete_post()}>🗑️</button>
    {/if}
    <p><span class="font-bold">{author}</span>: {content} </p>
</div>