<script>
	import '../app.postcss';
	import { fullscreen, screenwidth, color_status, progress_percentage } from '$lib/store.js';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { RefreshCwIcon } from 'svelte-feather-icons';

	let show_progress = false;
	$: show_progress = $color_status && $progress_percentage != 100;

	const percentage = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$: percentage.set($progress_percentage);
</script>

<div
	class="bg-[#02AAB0] h-1 absolute top-0 transition-opacity"
	style={`width: ${$percentage}%; opacity: ${show_progress ? 1 : 0}`}
/>

<div
	class={`h-[100dvh] ${$fullscreen ? 'max-w-none' : 'max-w-[1600px]'} mx-auto flex flex-col p-4`}
>
	<div
		class={`transition-opacity mb-4 flex gap-x-4 ${show_progress ? 'opacity-100' : 'opacity-0'}`}
	>
		<div class="animate-spin"><RefreshCwIcon /></div>
		<div class="font-semibold">{$color_status || ''}</div>
	</div>

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
