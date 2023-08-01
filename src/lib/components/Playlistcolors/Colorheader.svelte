<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { color_status } from '$lib/store.js';

	export let playlist_id, playlist_title;
	let info;

	onMount(async () => {
		let response = await fetch(`/api/info/${playlist_id}`);
		let status = response.status;

		if (status == 200) {
			info = await response.json();
			playlist_title = info.name;
		} else {
			$color_status = undefined;
			goto('/');
		}
	});
</script>

<div class="text-slate-500">
	<h1 class="text-3xl transition-opacity" style={`${!info?.name ? 'opacity: 0' : 'opacity: 100'}`}>
		{info?.name}
	</h1>
	<h2 class="text-lg transition-opacity" style={`${!info?.owner ? 'opacity: 0' : 'opacity: 100'}`}>
		By {info?.owner} on Spotify
	</h2>
</div>
