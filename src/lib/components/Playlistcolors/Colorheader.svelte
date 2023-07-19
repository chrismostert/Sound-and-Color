<script>
	import { onMount } from 'svelte';

	export let playlist_id, playlist_title;
	let info;

	onMount(async () => {
		info = await fetch(`/api/info/${playlist_id}`).then((res) => res.json());
		playlist_title = info.name;
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
