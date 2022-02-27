<script>
	import '../app.css';

	export let title = 'svelte-lazy-loader';
	export let description =
		"A component library for effortlessly loading media using a shared IntersectionObserver instance if native lazy-loading doesn't exist.";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<slot />
