<script>
	import '../app.postcss';
	import { fullscreen } from '$lib/store.js';
</script>

<div
	class={`h-[100dvh] ${
		$fullscreen ? 'max-w-none' : 'max-w-[1600px]'
	} mx-auto my-auto flex flex-col justify-between px-8`}
>
	<header />
	<main>
		<slot />
	</main>
	<footer class="flex justify-end items-center p-4 text-slate-400 gap-x-4">
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
