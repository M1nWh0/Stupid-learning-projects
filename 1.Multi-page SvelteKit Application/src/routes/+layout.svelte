<script>
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	const navItems = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Users', href: '/users' },
		{ label: 'Settings', href: '/settings' }
	];

	const currentPath = $derived(page.url.pathname);

	/** @param {string} path */
	function isActive(path) {
		if (path === '/users') {
			return currentPath === '/users' || currentPath.startsWith('/users/');
		}

		return currentPath === path;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if currentPath === '/'}
	{@render children()}
{:else}
	<div class="app-shell">
		<header class="topbar">
			<div class="brand">Control Panel</div>
			<nav class="nav" aria-label="Main navigation">
				{#each navItems as item}
					<a
						class:active={isActive(item.href)}
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</header>

		<main class="content">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', sans-serif;
		background: #f3f4f6;
		color: #111827;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app-shell {
		max-width: 1100px;
		margin: 24px auto;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid #e5e7eb;
		background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
	}

	.brand {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.nav a {
		padding: 0.55rem 0.9rem;
		border-radius: 10px;
		color: #374151;
		text-decoration: none;
		font-weight: 600;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.nav a:hover {
		background: #f3f4f6;
	}

	.nav a.active {
		background: #dbeafe;
		color: #1d4ed8;
	}

	.content {
		padding: 2rem 1.5rem 2.5rem;
	}

	@media (max-width: 640px) {
		.app-shell {
			margin: 0;
			border-radius: 0;
			min-height: 100vh;
		}

		.topbar {
			flex-direction: column;
			align-items: flex-start;
		}

		.nav {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr;
		}

		.nav a {
			text-align: center;
		}
	}
</style>
