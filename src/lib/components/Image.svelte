<script context="module">
	let loadingExists;
	let observer;
	if (typeof window !== 'undefined') {
		// check if lazy loading is native
		loadingExists = 'loading' in HTMLImageElement.prototype;

		if (!loadingExists) {
			// set up IntersectionObserver if loading doesn't exist natively
			observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(({ isIntersecting, target }) => {
						if (isIntersecting && target.src !== target.dataset.src) {
							target.src = target.dataset.src;
							target.srcset = target.dataset.srcset;
							observer.unobserve(target);
						}
					});
				},
				{ rootMargin: '200px 200px' }
			);
		}
	}
</script>

<!-- 
  @component A lazy-loading component that will load images as the user approaches them. The component defers to native lazy loading in a browser if supported.
 -->
<script>
	import { onMount } from 'svelte';

	/** @type {('lazy'|'eager')} [loading=lazy] - whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them */
	export let loading = 'lazy';

	/** @type {String} [alt=""] - alternative text for an image, displays if image is unaccessible for user */
	export let alt = '';

	/** @type {String} [placeholder='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg=='] - the placeholder until the image loads, if it is lazyloaded */
	export let placeholder =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg==';

	/** @type {String} [src="path/to/img.jpg"] - path to the image */
	export let src = placeholder;

	/** @type {Boolean|String} [srcset=path/to/image.jpg 600w] - An optional string following the HTMLImageElement.srcset format that is passed to the img srcset attribute */
	export let srcset = src;

	/** @type {Boolean|String} [sizes=(max-width: 600px) 600px, 800px] - Medica conditions that determine what image size would be best presented */
	export let sizes = '';

	/** @type {Boolean} [draggable=true] - whether the element can be dragged via native browser behavior or HTML Drag and Drop API */
	export let draggable = true;

	/** @type {('sync'|'async'|'auto')} [decoding=async] - whether or not the browser is allowed to try to parallelize loading your image */
	export let decoding = 'async';

	/** @type {String} [classes="w-4 border border-red"] - custom CSS classes to apply to the image */
	export let classes = '';

	/** @type {String} [width="100px"] - the width of the image in digital units of rem, px or percent */
	export let width = '100%';

	/** @type {String} [height="100px"] - the height of the image in digital units of rem, px or percent */
	export let height = '100%';

	let imgEl; // img node
	let isLoaded = false; // track if image is loaded

	// check for native lazy Load
	// if it exists, use it and run no code
	onMount(() => {
		if (loadingExists) {
			imgEl.src = imgEl.dataset.src;
			imgEl.srcset = imgEl.dataset.srcset;
			isLoaded = true;
		} else if (observer && loading === 'lazy') {
			observer.observe(imgEl);
		}
	});
</script>

<img
	class={classes}
	class:inactive={!isLoaded}
	src={loading === 'lazy' ? placeholder : src}
	srcset={loading === 'lazy' ? placeholder : srcset}
	{sizes}
	{alt}
	{height}
	{width}
	{loading}
	{decoding}
	{draggable}
	data-src={src}
	data-srcset={srcset || src}
	bind:this={imgEl}
	on:load={() => (isLoaded = true)}
/>

<style>
	img {
		transition-property: var(--transition-property, filter);
		transition-timing-function: var(--transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
		transition-duration: var(--transition-duration, 150ms);
	}
	img.inactive {
		filter: var(--filter, blur(10px));
	}
</style>
