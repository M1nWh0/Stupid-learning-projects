<script>
	import { users } from '#lib/data/users.js';
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<section class="page">
	<h1>Users</h1>

	<div class="user-list" aria-label="List of users">
		{#each users as user}
			<a class="user-row" href={`/users/${user.id}`}>
				<span>{user.name}</span>
				<span>{user.role}</span>
				<span class="link-text">View</span>
			</a>
		{/each}
	</div>
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

	.user-list {
		display: grid;
		gap: 0.75rem;
	}

	.user-row {
		display: grid;
		grid-template-columns: 1.4fr 1fr auto;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background: #f9fafb;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.2s ease, transform 0.2s ease;
	}

	.user-row:hover {
		border-color: #93c5fd;
		transform: translateY(-1px);
	}

	.link-text {
		color: #2563eb;
		font-weight: 600;
	}

	@media (max-width: 640px) {
		.user-row {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}
	}
</style>
