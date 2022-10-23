<script lang="ts">
    import { token } from "../stores";
    import { navigateTo } from 'svelte-router-spa'
    import { getSIOClient } from "../api/apiClient";
    import CreatePostBar from "../componets/CreatePostBar.svelte";
    import MessageList from "../componets/MessageList.svelte";

    if ($token == null) navigateTo("/");

    let socket = $token != null ? getSIOClient($token) : null;
</script>

{#if socket != null}
    <CreatePostBar {socket} />
    <MessageList {socket} />
{/if}