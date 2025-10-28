/**
 * Button Component Types
 * Interface Segregation Principle: Focused, specific interfaces for Button component
 */

import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button component properties
 * Extends native button attributes for full HTML compatibility
 */
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'class'> {
	/**
	 * Visual variant of the button
	 * @default 'primary'
	 */
	variant?: ButtonVariant;

	/**
	 * Size of the button
	 * @default 'medium'
	 */
	size?: ButtonSize;

	/**
	 * Whether the button is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the button should take full width of container
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Button content (children)
	 */
	children: Snippet;

	/**
	 * Additional CSS classes
	 */
	class?: string;
}
