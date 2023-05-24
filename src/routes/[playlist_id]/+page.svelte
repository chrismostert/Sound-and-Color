<script>
	import Playlistcolors from '$lib/components/Playlistcolors/Playlistcolors.svelte';

	export let data;
</script>

<Playlistcolors playlist_id={data.playlist_id} />
