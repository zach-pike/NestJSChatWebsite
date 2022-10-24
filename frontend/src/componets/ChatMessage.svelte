<script lang="ts">
    import * as api from "../api/apiClient"
    import { token, user_object } from "../stores"

    export let author: string;
    export let content: string;
    export let id: string = "";

    async function delete_post() {
        await api.delete_public_post($token, id);
    }
</script>

<div class="flex items-center">
    {#if $user_object.admin == true}
    <button class="py-1 px-5 m-2 border border-black border-2 rounded-md text-xs hover:bg-gray-100" on:click={() => delete_post()}>🗑️</button>
    {/if}
    <p><span class="font-bold">{author}</span>: {content} </p>
</div>