// src/lib/utils/filters.js

export function filterVideos(videos, selectedChannel, searchQuery) {
  const q = searchQuery.toLowerCase();

  return videos.filter(v => {
    const matchesChannel =
      selectedChannel === 'All' || v.channelName === selectedChannel;

    const matchesSearch =
      v.title.toLowerCase().includes(q) ||
      v.summary.toLowerCase().includes(q) ||
      v.keywords.some(k => k.toLowerCase().includes(q));

    return matchesChannel && matchesSearch;
  });
}

export function sortVideos(videos, sortMode) {
  let arr = [...videos];

  switch (sortMode) {
    case 'timestamp':
      arr.sort((a, b) => b.timestamp - a.timestamp);
      break;

    case 'firstSeen':
      arr.sort((a, b) => b.firstSeen - a.firstSeen);
      break;

    case 'views':
      arr.sort((a, b) => b.views - a.views);
      break;

    case 'category':
      arr.sort((a, b) => {
        if (a.videoCategory === b.videoCategory) {
          return b.timestamp - a.timestamp;
        }
        return a.videoCategory.localeCompare(b.videoCategory);
      });
      break;

    case 'mostViral48h':
      arr.sort((a, b) => (b.viewsPerHour48 || 0) - (a.viewsPerHour48 || 0));
      arr = arr.slice(0, 6);
      break;
  }

  return arr;
}