<script>
  export let video;
  export let onClose;
</script>

<div
  class="modal-backdrop"
  role="button"
  tabindex="0"
  on:click={onClose}
  on:keydown={(e) => e.key === 'Enter' && onClose()}
></div>

<div class="modal">
  <button class="close-btn" on:click={onClose}>×</button>

  <iframe
    title="YouTube video player"
    width="100%"
    height="500"
    src={`https://www.youtube.com/embed/${video.videoId}`}
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>

  <h3>{video.title}</h3>
  <p>{video.timestamp.toLocaleString()}</p>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    padding: 16px;
    border-radius: 8px;
    width: 95%;
    max-width: 880px;
    z-index: 1001;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    color: #fff;
  }

  .close-btn {
    position: absolute;
    top: 6px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
  }
</style>
