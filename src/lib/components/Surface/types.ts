/**
 * Surface Component Types
 * Interface Segregation Principle: Focused, specific interfaces for Surface component
 */

import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type SurfaceVariant = 'default' | 'raised';
export type SurfacePadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Surface component properties
 * Extends native div attributes for full HTML compatibility
 */
export interface SurfaceProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
	/**
	 * Visual variant of the surface
	 * @default 'default'
	 */
	variant?: SurfaceVariant;

	/**
	 * Padding size
	 * @default 'medium'
	 */
	padding?: SurfacePadding;

	/**
	 * Whether the surface is interactive/clickable
	 * @default false
	 */
	interactive?: boolean;

	/**
	 * Surface content (children)
	 */
	children: Snippet;

	/**
	 * Additional CSS classes
	 */
	class?: string;
}
