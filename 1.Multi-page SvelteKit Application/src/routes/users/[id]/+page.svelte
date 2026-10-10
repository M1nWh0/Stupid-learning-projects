<script>
	import { page } from '$app/state';
	import { users } from '#lib/data/users.js';

	const userId = $derived(Number(page.params.id));
	const user = $derived(users.find((entry) => entry.id === userId));
</script>

<svelte:head>
	<title>{user ? `User: ${user.name}` : 'User Details'}</title>
</svelte:head>

<section class="page">
	{#if user}
		<h1>User Details</h1>
		<dl class="details">
			<div>
				<dt>ID:</dt>
				<dd>{user.id}</dd>
			</div>
			<div>
				<dt>Name:</dt>
				<dd>{user.name}</dd>
			</div>
			<div>
				<dt>Role:</dt>
				<dd>{user.role}</dd>
			</div>
		</dl>
		<a class="back-link" href="/users">Back to Users</a>
	{:else}
		<h1>User Details</h1>
		<p>No user found for ID {page.params.id}.</p>
		<a class="back-link" href="/users">Back to Users</a>
	{/if}
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 3vw, 2.8rem);
	}

	.details {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background: #f9fafb;
	}

	.details div {
		display: grid;
		grid-template-columns: 90px 1fr;
		gap: 0.75rem;
		align-items: center;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
	}

	.back-link {
		justify-self: start;
		padding: 0.75rem 1rem;
		border-radius: 10px;
		background: #111827;
		color: #fff;
		text-decoration: none;
		font-weight: 600;
	}
</style>
