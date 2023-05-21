<script>
	import Colorheader from '$lib/components/Colorheader.svelte';
	import Colorview from '$lib/components/Colorview.svelte';
	import Options from '$lib/components/Options.svelte';

	import { fullscreen } from '$lib/store.js';

	let screenheight, screenwidth;
	export let data;
</script>

<Colorheader playlist_id={data.playlist_id} />
<div
	id="playlist-colors"
	class={`w-full ${$fullscreen ? 'h-4/6' : 'h-2/6'} mx-auto my-4`}
	bind:clientHeight={screenheight}
	bind:clientWidth={screenwidth}
>
	<Colorview width={screenwidth} height={screenheight} playlist_id={data.playlist_id} />
</div>
<Options />
