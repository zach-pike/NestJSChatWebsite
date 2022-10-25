<style global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
  

<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes';

  // if (window.location.pathname == '/' && initTokenFromLocalStorage()) {
  //     window.location = "/home";
  // }
</script>

<Router {routes} />
