<script lang="ts">
    import { navigateTo, Route } from 'svelte-router-spa';
    import { tokenReadable, jwtDecode, deleteLocalstorageTokens } from '../api/apiClient';
    import BasicLayout from './BasicLayout.svelte';

    let user = jwtDecode($tokenReadable);

    if (user == null) {
        deleteLocalstorageTokens();
        navigateTo('/');
    }

    export let currentRoute;
    const params = {}
</script>

<BasicLayout>
    <div class="w-48 p-2 bg-slate-800 flex flex-col items-center text-white overflow-auto">
        <p class="font-bold text-md">Welcome: <br /> {user.username}</p>
        <div class="border border-white w-full h-0 mb-2" />

        <div>
            <a href="/pc" class="underline">Public chat</a>
            <br />
            <a href="/pm" class="underline">Private messenger</a>
            <br />
            <a href="/streamer" class="underline">YT Video streamer</a>
            <br />
            {#if user.admin}
                <a href="/admin" class="underline">Admin panel</a>
                <br />
            {/if}
        </div>
    </div>
    <div class="flex-1 p-2 text-white">
        <Route {currentRoute} {params} />
    </div>
</BasicLayout>