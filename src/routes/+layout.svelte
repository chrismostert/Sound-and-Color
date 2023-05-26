<script>
	import '../app.postcss';
	import { fullscreen, screenwidth } from '$lib/store.js';
</script>

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
