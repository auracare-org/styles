<script lang="ts">
	/**
	 * Surface Component
	 * Single Responsibility: Renders a surface/card container
	 * Open/Closed: Extensible through props without modification
	 * Dependency Inversion: Depends on CSS variable abstractions
	 */
	import type { SurfaceProps } from './types.js';
	import '../../styles/components/surface.css';

	let {
		variant = 'default',
		padding = 'medium',
		interactive = false,
		children,
		class: className = '',
		...restProps
	}: SurfaceProps = $props();

	// Compute class names based on props
	const computedClass = $derived(
		[
			'surface',
			`surface--${variant}`,
			`surface--padding-${padding}`,
			interactive && 'surface--interactive',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

</script>

{#if interactive}
	<div class={computedClass} tabindex="0" role="button" {...restProps}>
		{@render children()}
	</div>
{:else}
	<div class={computedClass} {...restProps}>
		{@render children()}
	</div>
{/if}
