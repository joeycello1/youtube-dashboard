<script>
  export let value = 'timestamp';
  export let onChange;

  const options = [
    { value: 'timestamp', label: 'Newest by Timestamp' },
    { value: 'firstSeen', label: 'Newest by First Seen' },
    { value: 'views', label: 'Most Views' },
    { value: 'category', label: 'Newest by Category' },
    { value: 'mostViral48h', label: 'Most Viral (48h)' }
  ];
</script>

<select
  bind:value={value}
  on:change={(e) => onChange(e.target.value)}
>
  {#each options as opt}
    <option value={opt.value}>{opt.label}</option>
  {/each}
</select>

<style>
  select {
    padding: 8px;
    font-size: 1rem;
    background: #1a1a1a;
    color: #eee;
    border: 1px solid #444;
    border-radius: 6px;
  }

  select:focus {
    outline: 2px solid #7a6a4f;
  }
</style>