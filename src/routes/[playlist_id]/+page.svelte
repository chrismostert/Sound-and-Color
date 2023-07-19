<script>
	import Playlistcolors from '$lib/components/Playlistcolors/Playlistcolors.svelte';

	export let data;

	let page_title = 'Sound and Color';
	let playlist_title;

	$: if (playlist_title) {
		page_title = `${page_title} | ${playlist_title}`;
	}
</script>

<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<Playlistcolors playlist_id={data.playlist_id} bind:playlist_title />
