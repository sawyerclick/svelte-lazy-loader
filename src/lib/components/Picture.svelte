<script context="module">
	let loadingExists;
	let observer;

	const loadAttributes = (el) => {
		// assign src to image
		const imgEl = el.querySelector('img');
		imgEl.src = imgEl.dataset.src;

		// loop through child source tags
		const sourceEls = el.querySelectorAll('source');
		sourceEls.forEach((sourceEl) => (sourceEl.srcset = sourceEl.dataset.srcset));

		// flip loaded Boolean
		el.dataset.loaded = true;
	};

	if (typeof window !== 'undefined') {
		// check if lazy loading is native
		loadingExists = 'loading' in HTMLImageElement.prototype;

		if (!loadingExists) {
			// set up IntersectionObserver if loading doesn't exist natively
			observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(({ isIntersecting, target }) => {
						if (isIntersecting) {
							loadAttributes(target);
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

	/** @type {('lazy'|'eager')} [loading="lazy"] - whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them */
	export let loading = 'lazy';

	/** @type {String} [alt=""] - alternative text for an image, displays if image is unaccessible for user */
	export let alt = '';

	/** @type {String} [placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg=="] - the placeholder until the image loads, if it is lazyloaded */
	export let placeholder =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg==';

	/** @type {String} [src="path/to/img.jpg"] - path to the image */
	export let src = placeholder;

	/** @type {Boolean} [draggable="true"] - whether the element can be dragged via native browser behavior or HTML Drag and Drop API */
	export let draggable = true;

	/** @type {('sync'|'async'|'auto')} [decoding=async] - whether or not the browser is allowed to try to parallelize loading your image */
	export let decoding = 'async';

	/** @type {String} [classes=""] - custom CSS classes to apply to the picture element */
	export let classes = '';

	/** @type {String} [width="100%"] - the width of the image in digital units of rem, px or percent */
	export let width = '100%';

	/** @type {String} [height="100%"] - the height of the image in digital units of rem, px or percent */
	export let height = '100%';

	/** @type {Element} [bind:this={el}] - the picture element, which can be binded */
	export let el = undefined;

	// check for native lazy Load
	// if it exists, use it and run no code
	onMount(() => {
		if (loadingExists) loadAttributes(el);
		else if (observer && loading === 'lazy') observer.observe(el);
	});
</script>

<picture class={classes} data-loaded="false" bind:this={el}>
	<slot />
	<img
		src={loading === 'lazy' ? placeholder : src}
		{alt}
		{height}
		{width}
		{loading}
		{decoding}
		{draggable}
		data-src={src}
		on:load
	/>
</picture>

<style>
	picture {
		transition: var(--transition, filter cubic-bezier(0.4, 0, 0.2, 1) 300ms);
	}
	picture[data-loaded='false'] {
		-webkit-filter: var(--filter, blur(10px));
		filter: var(--filter, blur(10px));
	}
</style>
