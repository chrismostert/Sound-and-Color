<script>
	import { DownloadIcon, Maximize2Icon, Minimize2Icon } from 'svelte-feather-icons';
	import { fullscreen } from '$lib/store.js';
	import domtoimage from 'dom-to-image';
	import { saveAs } from 'file-saver';

	function saveImage() {
		let output = document.getElementById('playlist-colors');
		domtoimage.toBlob(output).then((blob) => {
			window.saveAs(blob, 'playlist-colors.png');
		});
	}
</script>

<div class="flex justify-between">
	<div class="text-slate-400">Made</div>
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
</div>
