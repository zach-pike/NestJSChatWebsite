<script lang="ts">
    import { navigateTo, Route } from 'svelte-router-spa';
    import { tokenReadable, get_user } from '../api/apiClient';

    if ($tokenReadable == null) navigateTo("/");

    let user = get_user($tokenReadable);

    export let currentRoute;
    const params = {}
</script>

<div class="w-full h-screen flex justify-center items-center p-0 m-0">
    <div class="w-3/4 h-3/4 bg-gray-900 p-4 flex">
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
    </div>
</div>