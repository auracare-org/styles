<script lang="ts">
	/**
	 * Button Component
	 * Single Responsibility: Renders a button with variants
	 * Open/Closed: Extensible through props without modification
	 * Dependency Inversion: Depends on CSS variable abstractions
	 */
	import type { ButtonProps } from './types.js';
	import '../../styles/components/button.css';

	let {
		variant = 'primary',
		size = 'medium',
		disabled = false,
		fullWidth = false,
		children,
		class: className = '',
		...restProps
	}: ButtonProps = $props();

	// Compute class names based on props
	const computedClass = $derived(
		[
			'button',
			`button--${variant}`,
			`button--${size}`,
			fullWidth && 'button--full-width',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button class={computedClass} {disabled} {...restProps}>
	{@render children()}
</button>
