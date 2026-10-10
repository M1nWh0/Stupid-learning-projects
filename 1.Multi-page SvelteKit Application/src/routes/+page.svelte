<svelte:head>
	<title>Control Panel</title>
</svelte:head>

<div class="hero">
	<div class="card">
		<p class="eyebrow">Control Panel</p>
		<h1>Manage your application from one place.</h1>
		<a href="/dashboard">Go to Dashboard</a>
	</div>
</div>

<style>
	.hero {
		display: grid;
		place-items: center;
		min-height: 100vh;
		padding: 2rem;
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
	}

	.card {
		display: grid;
		gap: 1.25rem;
		max-width: 600px;
		padding: 3rem 2.5rem;
		text-align: center;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(147, 197, 253, 0.5);
		border-radius: 20px;
		box-shadow: 0 24px 50px rgba(37, 99, 235, 0.12);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #2563eb;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.1rem, 5vw, 3.6rem);
		line-height: 1.1;
	}

	a {
		justify-self: center;
		padding: 0.9rem 1.5rem;
		border-radius: 10px;
		background: #111827;
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
	}
</style>
