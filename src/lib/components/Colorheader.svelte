<script>
	import { onMount } from 'svelte';

	export let playlist_id;
	let info;

	onMount(async () => {
		info = await fetch(`/api/info/${playlist_id}`).then((res) => res.json());
	});
</script>

<div>
	<h1 class="text-3xl">{info?.name}</h1>
	<h2 class="text-lg">By {info?.owner} on Spotify</h2>
</div>
