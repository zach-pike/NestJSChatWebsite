<style global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
  

<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes';
</script>

<Router {routes} />
