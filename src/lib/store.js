import { writable } from 'svelte/store';

export const fullscreen = writable(false);
export const screenwidth = writable();

export const color_status = writable();
export const progress_percentage = writable(0);
