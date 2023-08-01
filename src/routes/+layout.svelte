<script>
	import '../app.postcss';
	import { fullscreen, screenwidth, color_status, progress_percentage } from '$lib/store.js';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { RefreshCwIcon } from 'svelte-feather-icons';

	const percentage = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$: percentage.set($progress_percentage);
</script>

{#if $color_status && $progress_percentage != 100}
	<div class="bg-[#02AAB0] h-1 absolute top-0 left-0" style={`width: ${$percentage}%`} />
	<div class="absolute top-4 left-4 flex gap-x-4">
		<div class="animate-spin"><RefreshCwIcon /></div>
		<div class="font-semibold">{$color_status}</div>
	</div>
{/if}

<div
	class={`h-[100dvh] ${$fullscreen ? 'max-w-none' : 'max-w-[1600px]'} mx-auto flex flex-col p-4`}
>
	<main class="flex-1">
		<div class="h-full flex flex-col justify-center" bind:clientWidth={$screenwidth}>
			<slot />
		</div>
	</main>
	<footer class="flex justify-end items-center text-slate-400 gap-x-4 mt-4">
		<a>About</a>
		<div class="w-0 h-full border" />
		<div class="shrink">
			Made with <span class="opacity-40">❤️</span> by
			<a
				class="hover:underline hover:text-blue-600 text-blue-400"
				href="https://www.chrismostert.nl">Chris Mostert</a
			>
		</div>
	</footer>
</div>
