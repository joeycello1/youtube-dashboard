<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let videoId;
  
  const WATCHED_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyW29beQAqTydTpvRDH5t0tQgz5NE5q6-47roDvHRMYxU2InC6Q60hYjrO2-5TLb2A/exec";

  async function syncWatched(videoId) {
    fetch(`${WATCHED_WEBAPP_URL}?action=markWatched&videoId=${videoId}`);
  }

  let player;
  const dispatch = createEventDispatcher();

  // Called by YouTube API when ready
  function createPlayer() {
    player = new YT.Player('yt-player', {
      videoId,
      events: {
        onStateChange: handleStateChange,
        onError: handleError
      }
    });
  }

  function handleStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      syncWatched(videoId);
      dispatch('ended');
    }
  }

  function handleError(event) {
    console.warn("YouTube error:", event.data);
    syncWatched(videoId);
    dispatch('ended');
  }

  // Load new video when prop changes
  $: if (player && videoId) {
    Promise.resolve().then(() => {
      player.loadVideoById(videoId);
    });
  }

  onMount(() => {
    // If API is already loaded
    if (window.YT && YT.Player) {
      createPlayer();
    } else {
      // Wait for API to finish loading
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }
  });

  onDestroy(() => {
    if (player && player.destroy) {
      player.destroy();
    }
  });
</script>

<div class="player-wrapper">
  <div id="yt-player"></div>
</div>

<style>
  .player-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: black; /* optional, looks nicer before load */
  }

  #yt-player {
    width: 100%;
    height: 100%;
  }
</style>

