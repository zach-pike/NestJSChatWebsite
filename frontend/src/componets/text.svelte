<script lang="ts">
    export let t: any;

    $: {
        console.log(t)
    }
</script>

<p>{t}</p>