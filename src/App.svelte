<script>
  import { onMount } from 'svelte';

  // Components
  import VideoCard from './lib/components/VideoCard.svelte';
  import VideoModal from './lib/components/VideoModal.svelte';
  import ChannelChip from './lib/components/ChannelChip.svelte';
  import SearchBar from './lib/components/SearchBar.svelte';
  import SortBar from './lib/components/SortBar.svelte';

  // Stores
  import { videos } from './lib/stores/videos.js';
  import { stats } from './lib/stores/stats.js';
  import {
    selectedChannel,
    searchQuery,
    sortMode,
    activeVideo
  } from './lib/stores/ui.js';

  // Utils
  import { loadDashboardData } from './lib/utils/fetchData.js';
  import { filterVideos, sortVideos } from './lib/utils/filters.js';

  // Derived values
  let channels = [];
  let filteredVideos = [];
  let sortedVideos = [];

  // Load data
  onMount(async () => {
    const data = await loadDashboardData();
    videos.set(data.videos);
    stats.set(data.stats);
  });

  // Build channel list
  $: channels = ['All', ...new Set($videos.map(v => v.channelName))];

  // Filtering
  $: filteredVideos = filterVideos($videos, $selectedChannel, $searchQuery);

  // Sorting
  $: sortedVideos = sortVideos(filteredVideos, $sortMode);
</script>

<!-- Modal -->
{#if $activeVideo}
  <VideoModal
    video={$activeVideo}
    onClose={() => activeVideo.set(null)}
  />
{/if}

<!-- Channel Chips -->
<div class="channel-chip-row">
  {#each channels as ch}
    <ChannelChip
      label={ch}
      active={$selectedChannel === ch}
      onSelect={(label) => {
        selectedChannel.set(label);
        searchQuery.set('');
      }}
    />
  {/each}
</div>

<!-- Filters -->
<div class="filters">
  <SortBar
    value={$sortMode}
    onChange={(v) => sortMode.set(v)}
  />

  <SearchBar
    value={$searchQuery}
    onInput={(v) => searchQuery.set(v)}
  />
</div>

<!-- Video Grid -->
<div class="grid">
  {#each sortedVideos as video}
    <VideoCard
      {video}
      onOpenVideo={(v) => activeVideo.set(v)}
      onKeywordClick={(kw) => {
        searchQuery.set(kw);
        selectedChannel.set('All');
      }}
    />
  {/each}
</div>

<style>
  .filters {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .channel-chip-row {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0 20px;
  }
</style>