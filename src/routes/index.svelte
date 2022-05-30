<script lang="ts">
  import { entries } from '$lib/stores';
  import format from 'date-fns/format';

  let value = '';

  function handleAdd() {
    entries.create(value);
    value = '';
  }

  function handleEntryClicked() {}
</script>

<svelte:head>
  <title>Dear Dumb Diary</title>
  <meta name="description" content="Dear dumb diary" />
</svelte:head>

<section>
  <div class="container">
    <textarea class="editor" {value} on:keyup={(e) => (value = e.currentTarget.value)} />
    <button on:click={handleAdd}>Add Entry</button>
  </div>
  <hr />
  {#each $entries as entry}
    <h3>{format(entry.date, 'yyyy-MM-dd @ HH:mm')}</h3>
    <button class="entry-button" on:click={handleEntryClicked}><pre>{entry.text}</pre></button>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .container {
    width: var(--page-width);
    max-width: calc(100% - 40px);
    margin: 0 20px;
    text-align: center;
  }

  .editor {
    width: 100%;
    height: 100px;
    padding: 20px;
  }

  .entry-button {
    border: 0;
    background: none;
    text-align: left;
  }

  pre {
    width: var(--page-width);
    white-space: pre-wrap;
  }

  h3 {
    width: var(--page-width);
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: normal;
    color: var(--light-text-color);
  }
</style>
