<script lang="ts">
    import * as api from "../api/apiClient"

    let username: string = "";
    let real_name: string = "";
    let password_1: string = "";
    let password_2: string = "";

    async function sign_up() {
        if (password_1 == password_2) {
            await api.register_user(username, real_name, password_1);
        }
    }

</script>

<div class="w-full h-screen flex justify-center items-center p-0 m-0">
    <div class="h-fit">
      <h1 class="text-2xl">Sign up</h1>
      <div class="w-80">
        <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="text" placeholder="Username" bind:value={username} />
        <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="text" placeholder="Real name" bind:value={real_name}/>
        <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="password" placeholder="Password" bind:value={password_1} />
        <input class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" type="password" placeholder="Password again" bind:value={password_2} />
        
        <div class="flex items-center">
          <button class="px-3 py-1 border border-1 border-gray-700 rounded bg-gray-50 hover:bg-gray-100 mr-2" on:click={() => sign_up()}>Sign up</button>
          <a href="/" class="underline">Login</a>
        </div>
        
      </div>
    </div>
</div>