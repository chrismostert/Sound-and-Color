<script>
	import Colorview from '$lib/components/Colorview.svelte';
	let screenheight, screenwidth;
	let playlist_id;

	let textinput;
	//let playlist_id = '6UeSakyzhiEt4NB3UAd6NQ';
</script>

<div class="h-screen w-screen flex items-center justify-center">
	{#if playlist_id}
		<div class="w-10/12 h-2/6" bind:clientHeight={screenheight} bind:clientWidth={screenwidth}>
			<Colorview width={screenwidth} height={screenheight} {playlist_id} />
		</div>
	{:else}
		<input
			on:keypress={(e) => {
				if (e.keyCode === 13) {
					playlist_id = textinput;
				}
			}}
			type="text"
			class="w-3/4 max-w-4xl p-4 border-gray-200 border-2"
			bind:value={textinput}
			placeholder="Spotify playlist ID"
		/>
		<button
			class="bg-blue-400 text-white rounded-tr-md rounded-br-md p-4 border-r-2 border-t-2 border-b-2 border-blue-300"
			on:click={() => (playlist_id = textinput)}>Go!</button
		>
	{/if}
</div>
