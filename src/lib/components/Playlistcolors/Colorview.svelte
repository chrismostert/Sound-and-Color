<script>
	export let playlist_id;

	const TRACKS_PER_CHUNK = 50;
	const ANIMATION_DELAY = 10;

	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { fullscreen, screenwidth } from '$lib/store.js';

	let colors = [];

	let total;
	let bar_width;

	$: bar_width = $screenwidth / total;

	onMount(async () => {
		let res = await fetch(`/api/colors/${playlist_id}/0`).then((res) => res.json());

		colors = res.colors;
		total = res.total;

		if (total > TRACKS_PER_CHUNK) {
			for (let offset = TRACKS_PER_CHUNK; offset < total; offset += TRACKS_PER_CHUNK) {
				let res = await fetch(`/api/colors/${playlist_id}/${offset}`).then((res) => res.json());
				colors = [...colors, ...res.colors];
			}
		}
	});
</script>

<div
	class={`flex flex-row shadow-lg my-4`}
	style={`height: ${$fullscreen ? '100%' : (1 / 3) * $screenwidth + 'px'}`}
>
	{#each colors as color, i (i)}
		<div
			in:slide={{
				delay: (i % TRACKS_PER_CHUNK) * ANIMATION_DELAY
			}}
			style={`background-color: rgb(${color[0]},${color[1]},${color[2]}); width: ${bar_width}px`}
		/>
	{/each}
</div>
