// src/lib/stores/ui.js
import { writable } from 'svelte/store';

export const selectedChannel = writable('All');
export const searchQuery = writable('');
export const sortMode = writable('timestamp');
export const activeVideo = writable(null);