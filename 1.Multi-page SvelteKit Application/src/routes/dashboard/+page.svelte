<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<section class="page">
	<h1>Dashboard</h1>
	<p class="welcome">Welcome back.</p>

	<div class="stats-grid">
		<article class="stat-card">
			<span class="label">Users</span>
			<strong>128</strong>
		</article>
		<article class="stat-card">
			<span class="label">Active Users</span>
			<strong>96</strong>
		</article>
		<article class="stat-card">
			<span class="label">System Status</span>
			<strong>Operational</strong>
		</article>
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

	.welcome {
		margin: 0;
		font-size: 1.1rem;
		color: #4b5563;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.stat-card {
		display: grid;
		gap: 0.45rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
	}

	.label {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #6b7280;
	}

	strong {
		font-size: clamp(1.4rem, 2vw, 2rem);
	}

	@media (max-width: 640px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
