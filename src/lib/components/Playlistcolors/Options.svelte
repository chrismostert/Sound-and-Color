<script>
	import { DownloadIcon, Maximize2Icon, Minimize2Icon } from 'svelte-feather-icons';
	import { fullscreen } from '$lib/store.js';
	import domtoimage from 'dom-to-image';
	import { saveAs } from 'file-saver';

	let options_hidden = false;

	function saveImage() {
		options_hidden = true;
		let output = document.getElementById('playlist-colors');
		domtoimage.toBlob(output).then((blob) => {
			window.saveAs(blob, 'playlist-colors.png');
			options_hidden = false;
		});
	}
</script>

<div class="flex justify-between">
	<div class="-mt-2 text-slate-300">Created @ soundandcolor.chrismostert.nl</div>
	{#if !options_hidden}
		<div class="flex gap-x-4">
			<button on:click={() => saveImage()} class="hover:opacity-100 opacity-50 transition-opacity">
				<DownloadIcon />
			</button>
			<button
				on:click={() => ($fullscreen = !$fullscreen)}
				class="hover:opacity-100 opacity-50 transition-opacity"
			>
				{#if !$fullscreen}
					<Maximize2Icon />
				{:else}
					<Minimize2Icon />
				{/if}
			</button>
		</div>
	{/if}
</div>
