<script lang="ts">
    export let uuid: string;
    export let username: string;
    export let real_name: string;
    export let admin: boolean;
</script>

<div>
    <p>{username}: AKA {real_name}</p>
</div>