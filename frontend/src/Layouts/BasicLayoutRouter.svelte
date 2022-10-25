<script lang="ts">
    import BasicLayout from "./BasicLayout.svelte";
    import { Route } from "svelte-router-spa";

    export let currentRoute;
    const params = {}
</script>

<BasicLayout>
    <Route {currentRoute} {params} />
</BasicLayout>