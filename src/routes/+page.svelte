<script>
	import { goto } from '$app/navigation';
	import { fullscreen } from '$lib/store.js';
	$fullscreen = false;

	let textinput;
	let playlist_id;
	//let playlist_id = '6UeSakyzhiEt4NB3UAd6NQ';

	$: if (playlist_id) {
		goto(`/${playlist_id}`);
	}
</script>

<div class="text-slate-600 mb-6">
	<h1 class="text-7xl mb-2">Sound and color</h1>
	<div class="max-w-prose">
		Let your music paint a picture! Enter a Spotify playlist ID and watch the dominant colors of
		each album cover fill the canvas.
	</div>
</div>
<div class="flex">
	<input
		on:keypress={(e) => {
			if (textinput && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
				playlist_id = textinput;
			}
		}}
		type="text"
		class="w-6/12 min-w-fit p-4 border-gray-200 border-2"
		bind:value={textinput}
		placeholder="Spotify playlist ID"
	/>
	<button
		class={`transition-opacity w-1/12 min-w-fit bg-blue-400 text-white rounded-tr-md rounded-br-md p-4 border-r-2 border-t-2 border-b-2 border-blue-300 ${
			!textinput ? 'disabled opacity-50 cursor-not-allowed' : ''
		}`}
		on:click={() => (playlist_id = textinput)}>Go!</button
	>
</div>
