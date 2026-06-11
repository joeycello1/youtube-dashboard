<script>
  export let value = '';
  export let onInput;
</script>

<div class="search-wrapper">
  <input
    type="text"
    placeholder="Search keywords..."
    bind:value={value}
    on:input={(e) => onInput(e.target.value)}
  />

  {#if value}
    <button class="clear-btn" on:click={() => onInput('')}>×</button>
  {/if}
</div>

<style>
  .search-wrapper {
    position: relative;
    display: inline-block;
  }

  input {
    padding: 8px;
    padding-right: 28px;
    font-size: 1rem;
  }

  .clear-btn {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: #fff;
  }

  .clear-btn:hover {
    color: #ccc;
  }
</style>