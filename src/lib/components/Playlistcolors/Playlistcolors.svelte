<script>
	import Colorheader from './Colorheader.svelte';
	import Colorview from './Colorview.svelte';
	import Options from './Options.svelte';

	export let playlist_id;
</script>

<div class="flex flex-col h-full justify-center" id="playlist-colors">
	<Colorheader {playlist_id} />
	<Colorview {playlist_id} />
	<Options />
</div>
