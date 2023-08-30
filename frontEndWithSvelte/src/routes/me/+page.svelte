<script>
  export let data;
</script>

{#if data.props}
  <main>
    <h1>Welcome {data.props.user.FirstName}!</h1>
    <p>Here is your full payload:</p>
    {#each Object.keys(data.props.user) as key}
      <p>{key}: {data.props.user[key]}</p>
    {/each}
    <a href="/" class="block">View Todos</a>
    <a href="/sign-out">Log Out</a>
  </main>
{/if}
