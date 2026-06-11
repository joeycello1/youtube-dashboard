<script>
  export let label;
  export let active = false;
  export let onSelect;
</script>

<div
  class="chip {active ? 'active' : ''}"
  role="button"
  tabindex="0"
  on:click={() => onSelect(label)}
  on:keydown={(e) => e.key === 'Enter' && onSelect(label)}
>
  {label}
</div>

<style>
  .chip {
    padding: 6px 14px;
    background: #2f2f2f;
    color: #adadad;
    border-radius: 16px;
    font-size: 0.85rem;
    cursor: pointer;
    user-select: none;
    border: 1px solid #444;
    transition: background 0.15s, color 0.15s, transform 0.1s;
  }

  .chip:hover {
    background: #3a3a3a;
  }

  .chip:active {
    transform: scale(0.96);
  }

  .chip.active {
    background: #7a6a4f;
    color: white;
    border-color: #007bff;
  }
</style>
