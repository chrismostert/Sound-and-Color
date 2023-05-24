<script>
	import Colorheader from './Colorheader.svelte';
	import Colorview from './Colorview.svelte';
	import Options from './Options.svelte';

	let screenwidth;
	let height;

	$: height = (1 / 3) * screenwidth;

	export let playlist_id;
</script>

<div id="playlist-colors" class="w-full" bind:clientWidth={screenwidth}>
	<Colorheader {playlist_id} />
	<div class={`h-[${height}px] my-4`} bind:clientWidth={screenwidth}>
		<Colorview width={screenwidth} {height} {playlist_id} />
	</div>
	<Options />
</div>
