<script>
	import '../app.postcss';
	import { fullscreen } from '$lib/store.js';
</script>

<div
	class={`h-screen ${
		$fullscreen ? 'max-w-none' : 'max-w-[1600px]'
	} mx-auto my-auto flex flex-col justify-center px-8`}
>
	<slot />
</div>
