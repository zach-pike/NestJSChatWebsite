<script lang="ts">
  import { navigateTo } from "svelte-router-spa";
    import { getAllUsers }  from "../api/adminApi";
    import { tokenReadable } from "../api/apiClient";
  import UserItem from "./UserItem.svelte";
    let users = [];

    async function fetchUsers() {
        let [ err, users_list ] = await getAllUsers($tokenReadable);
        if (err) navigateTo('/');
        users = users_list
    }
</script>

<div class="h-full">
    <button on:click={() => fetchUsers()}>Fetch users</button>

    <div>
        {#each users as user}
            <UserItem {...user} />
        {/each}
    </div>
</div>