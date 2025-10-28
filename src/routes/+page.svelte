<script lang="ts">
	import { Button, Surface } from '$lib';
</script>

<div class="demo-container">
	<header class="demo-header">
		<h1 style="color: var(--color-text-header-primary); margin-bottom: var(--spacing-xs);">
			Component Library Demo
		</h1>
		<p style="color: var(--color-text-body-secondary); margin-bottom: var(--spacing-xxxl);">
			Demonstrating SOLID principles with design tokens
		</p>
	</header>

	<!-- Button Components Section -->
	<section class="demo-section">
		<h2 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-lg);">
			Button Component
		</h2>

		<Surface padding="large" style="margin-bottom: var(--spacing-lg);">
			<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-md);">
				Primary Buttons
			</h3>
			<div class="button-row">
				<Button variant="primary" size="small">Small Primary</Button>
				<Button variant="primary" size="medium">Medium Primary</Button>
				<Button variant="primary" size="large">Large Primary</Button>
				<Button variant="primary" disabled>Disabled</Button>
			</div>
		</Surface>

		<Surface padding="large" style="margin-bottom: var(--spacing-lg);">
			<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-md);">
				Secondary Buttons
			</h3>
			<div class="button-row">
				<Button variant="secondary" size="small">Small Secondary</Button>
				<Button variant="secondary" size="medium">Medium Secondary</Button>
				<Button variant="secondary" size="large">Large Secondary</Button>
				<Button variant="secondary" disabled>Disabled</Button>
			</div>
		</Surface>

		<Surface padding="large">
			<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-md);">
				Full Width Button
			</h3>
			<Button variant="primary" fullWidth>Full Width Button</Button>
		</Surface>
	</section>

	<!-- Surface Components Section -->
	<section class="demo-section">
		<h2 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-lg);">
			Surface Component
		</h2>

		<div class="surface-grid">
			<Surface padding="medium">
				<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-xs);">
					Default Surface
				</h3>
				<p style="color: var(--color-text-body-primary);">
					Basic surface with medium padding
				</p>
			</Surface>

			<Surface variant="raised" padding="medium">
				<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-xs);">
					Raised Surface
				</h3>
				<p style="color: var(--color-text-body-primary);">
					Elevated with shadow effect
				</p>
			</Surface>

			<Surface interactive padding="medium" onclick={() => alert('Surface clicked!')}>
				<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-xs);">
					Interactive Surface
				</h3>
				<p style="color: var(--color-text-body-primary);">
					Click me to trigger an action
				</p>
			</Surface>
		</div>

		<h3
			style="color: var(--color-text-header-secondary); margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md);"
		>
			Different Padding Sizes
		</h3>
		<div class="surface-grid">
			<Surface padding="small">
				<p style="color: var(--color-text-body-primary);">Small Padding</p>
			</Surface>
			<Surface padding="medium">
				<p style="color: var(--color-text-body-primary);">Medium Padding</p>
			</Surface>
			<Surface padding="large">
				<p style="color: var(--color-text-body-primary);">Large Padding</p>
			</Surface>
		</div>
	</section>

	<!-- Complex Example Section -->
	<section class="demo-section">
		<h2 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-lg);">
			Complex Example
		</h2>

		<Surface variant="raised" padding="large">
			<h3 style="color: var(--color-text-header-primary); margin-bottom: var(--spacing-s);">
				User Profile Card
			</h3>
			<p
				style="color: var(--color-text-body-secondary); margin-bottom: var(--spacing-lg); line-height: 1.6;"
			>
				This demonstrates how components can be composed together following the Open/Closed Principle.
				Each component is extensible without modification.
			</p>
			<div class="button-row">
				<Button variant="primary">Edit Profile</Button>
				<Button variant="secondary">View Details</Button>
			</div>
		</Surface>
	</section>

	<!-- Design Tokens Section -->
	<section class="demo-section">
		<h2 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-lg);">
			Design Tokens
		</h2>

		<Surface padding="large">
			<h3 style="color: var(--color-text-header-secondary); margin-bottom: var(--spacing-md);">
				Color Palette
			</h3>
			<div class="color-grid">
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-bg-button-primary-default);"></div>
					<p style="color: var(--color-text-body-primary); font-size: 12px;">Primary</p>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-bg-button-secondary-default);"></div>
					<p style="color: var(--color-text-body-primary); font-size: 12px;">Secondary</p>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-bg-surface-raised);"></div>
					<p style="color: var(--color-text-body-primary); font-size: 12px;">Surface</p>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-border-focus);"></div>
					<p style="color: var(--color-text-body-primary); font-size: 12px;">Focus</p>
				</div>
			</div>
		</Surface>
	</section>
</div>

<style>
	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-xxxl) var(--spacing-lg);
		background-color: var(--color-bg-surface-default);
		min-height: 100vh;
	}

	.demo-header {
		text-align: center;
		margin-bottom: var(--spacing-xxxl);
	}

	.demo-section {
		margin-bottom: var(--spacing-xxxl);
	}

	.button-row {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		align-items: center;
	}

	.surface-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: var(--spacing-md);
	}

	.color-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.color-swatch {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		border: 1px solid var(--color-border-default);
	}
</style>
