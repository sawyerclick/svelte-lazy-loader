# svelte-lazy-loader

A component library for effortlessly loading media using a shared IntersectionObserver instance if native lazy-loading doesn't exist.

## Table of Contents
- [svelte-lazy-loader](#svelte-lazy-loader)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Components](#components)
    - [Image](#image)
      - [Usage](#usage)
      - [API](#api)
    - [Picture](#picture)
      - [Usage](#usage-1)
      - [API](#api-1)
  - [License](#license)

## Installation

```shell
npm i svelte-lazy-loader
```

## Components

### Image

An expansion of the HTMLImageElement that, if a browser cannot natively lazy-load, uses a shared IntersectionObserver instance to performantly lazy load images. This components takes several native attributes and passes them through to the underlying HTMLImageElement. A few component-specific props are available to facilitate lazy-loading.

The out-of-the-box implementation of this component features a blur transition effect. The CSS can be altered using [Svelte's style props](https://svelte.dev/docs#template-syntax-component-directives---style-props).

#### Usage

```html
<script>
	import { Image } from 'svelte-lazy-loader
</script>

<Image loading="lazy" src="path/to/image.jpg" alt="A description of the image" />
```

#### API

| Parameter | Default | Description |
| -------- | ------- | ----------- |
| src | `placeholder` | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src). The path to the image. Defaults to the `{placeholder}` prop. |
| srcset | `src` | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset). If passed, defines which images should be presented. Defaults to the `src` prop, which defaults to the `placeholder` prop. |
| loading | 'lazy' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading). If `lazy`, lazy-load image through native browser functionality if it exists or through IntersectionObserver if it doesn't. If `eager`, image is loaded immediately. |
| alt | ' ' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt). A description of the image. |
| draggable | false | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable). If `false`, the element can not be dragged. If `true`, the element can be dragged. |
| decoding | 'async' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding). If `async`, decode the image asynchronously to reduce delay in presenting other content. If `sync`, decode the image synchronously for atomic presentation with other content. If `default`, default mode, which indicates no preference for the decoding mode. The browser decides what is best for the user. |
| width | '100%' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/width). An integer value indicating the width of the image. |
| height | '100%' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/height). An integer value indicating the height of the image. |
| classes | ' ' | Additional classes to be added to the `<img>` element. |
| placeholder | 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg==' | If `loading='lazy'`, this value is the placeholder until the image is loaded. Accepts strings, including paths or base64 images such as the default. |
| on:load | event | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload). An event forwarded from the `<img/>` element when the image is loaded. |
| --transition | 'filter cubic-bezier(0.4, 0, 0.2, 1) 300ms' | The CSS transition that occurs on image load. |
| --filter | 'blur(2px)' | The filter to apply to the image when unloaded. Transitions out when image is loaded. |

### Picture

#### Usage

Similarly to the above Image component, this component uses a shared IntersectionObserver instance to performantly lazy-load images if native lazy-loading doesn't exist. Sources can be passed through a default [slot](https://svelte.dev/tutorial/slots) while `<img/>` attributes are passed as props using the API below. `<source>` elements' `srcset` attributed should be set at `data-srcset`.

Similar to above, the out-of-the-box implementation of this component features a blur transition effect. The CSS can be altered using [Svelte's style props](https://svelte.dev/docs#template-syntax-component-directives---style-props).

This example uses [vite-imagetools](https://www.npmjs.com/package/vite-imagetools) create images at compile-time via [sharp](https://sharp.pixelplumbing.com/).

*Note: The `srcset` attribute for `<source>` elements should be set at data-srcset for lazyloading to work properly.*

```html
<script>
	import { Picture } from 'svelte-lazy-loader';

	import blurred from '$lib/site/san-felipe-del-morro-castle.jpg?w=100&jpg&blur=10'
	import sources from '$lib/site/san-felipe-del-morro-castle.jpg?format=webp;avif;jpg&metadata'
</script>

<Picture placeholder={blurred} src="images/san-felipe-del-morro-castle.jpg" alt="A few tourists walk up the lawn to the side of the old stone San Felipe del Morro Castle in San Juan, Puerto Rico">
	{#each sources as { src, format }}
		<source data-srcset={src} type="image/{format}"/>
	{/each}
</Picture>
```

<Picture placeholder={blurred} src="images/san-felipe-del-morro-castle.jpg" alt="A few tourists walk up the lawn to the side of the old stone San Felipe del Morro Castle in San Juan, Puerto Rico">
	{#each sources as { src, format }}
		<source data-srcset={src} type="image/{format}"/>
	{/each}
</Picture>

#### API

| Parameter | Default | Description |
| -------- | ------- | ----------- |
| src | `placeholder` | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src). The path to the image. Defaults to the `{placeholder}` prop. |
| loading | 'lazy' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading). If `lazy`, lazy-load image through native browser functionality if it exists or through IntersectionObserver if it doesn't. If `eager`, image is loaded immediately. |
| alt | ' ' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt). A description of the image. |
| draggable | false | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable). If `false`, the element can not be dragged. If `true`, the element can be dragged. |
| decoding | 'async' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding). If `async`, decode the image asynchronously to reduce delay in presenting other content. If `sync`, decode the image synchronously for atomic presentation with other content. If `default`, default mode, which indicates no preference for the decoding mode. The browser decides what is best for the user. |
| width | '100%' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/width). An integer value indicating the width of the image. |
| height | '100%' | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/height). An integer value indicating the height of the image. |
| classes | ' ' | Additional classes to be added to the `<picture>` element. |
| placeholder | 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+fOvJAAI7AMKHxaZiQAAAABJRU5ErkJggg==' | If `loading='lazy'`, this value is the placeholder until the image is loaded. Accepts strings, including paths or base64 images such as the default. |
| on:load | event | [Defined as usual](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload). An event forwarded from the `<img/>` element inside the `<picture>` element when the image is loaded. |
| --transition | 'filter cubic-bezier(0.4, 0, 0.2, 1) 300ms' | The CSS transition that occurs on image load. |
| --filter | 'blur(2px)' | The filter to apply to the image when unloaded. Transitions out when image is loaded. |

## License

[MIT](https://github.com/sawyerclick/svelte-lazy-loader/blob/master/LICENSE)
