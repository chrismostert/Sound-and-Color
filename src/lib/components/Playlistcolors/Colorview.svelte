<script>
	export let playlist_id;

	const TRACKS_PER_CHUNK = 50;
	const ANIMATION_DELAY = 10;

	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { fullscreen, screenwidth, color_status, progress_percentage } from '$lib/store.js';

	let colors = [];

	let total;
	let bar_width;

	let in_progress = false;

	$: bar_width = $screenwidth / total;

	onMount(async () => {
		in_progress = true;
		$color_status = 'Begin fetching colors...';
		$progress_percentage = 0;

		let res = await fetch(`/api/colors/${playlist_id}/0`);
		let status = res.status;

		if (status == 200) {
			res = await res.json();
			colors = res.colors;
			total = res.total;

			const total_chunks = total / TRACKS_PER_CHUNK;
			$progress_percentage = (1 / total_chunks) * 100;

			if (total > TRACKS_PER_CHUNK) {
				for (let offset = TRACKS_PER_CHUNK; offset < total; offset += TRACKS_PER_CHUNK) {
					if (!in_progress) {
						break;
					}
					const cur_chunk = (offset + TRACKS_PER_CHUNK) / TRACKS_PER_CHUNK;
					$color_status = `Fetching colors ${cur_chunk}/${total_chunks}...`;
					console.log($color_status);

					let res = await fetch(`/api/colors/${playlist_id}/${offset}`);
					let status = res.status;

					if (status == 200) {
						res = await res.json();
						colors = [...colors, ...res.colors];
					}

					$progress_percentage = (cur_chunk / total_chunks) * 100;
				}
			}
		}
	});

	onDestroy(() => {
		$color_status = undefined;
		in_progress = false;
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
