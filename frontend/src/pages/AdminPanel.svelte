<script lang="ts">
  import UserList from "../componets/UserList.svelte";


</script>

<div class="text-white w-full flex flex-col overflow-hidden">
    <p>Admin panel</p>
    <div class="border border-white h-0 w-full"></div>

    <div class="overflow-auto m-1">
        <UserList />
    </div>
</div>

<style>
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>