<svelte:head>
	<title>Settings</title>
</svelte:head>

<section class="page">
	<h1>Settings</h1>

	<div class="settings-group">
		<h2>Account</h2>
		<div class="row">
			<span>Name</span>
			<strong>Minou</strong>
		</div>
	</div>

	<div class="settings-group">
		<h2>Preferences</h2>
		<div class="row">
			<span>Theme</span>
			<strong>System</strong>
		</div>
		<div class="row">
			<span>Language</span>
			<strong>English</strong>
		</div>
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

	.settings-group {
		display: grid;
		gap: 0.75rem;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background: #f9fafb;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid #e5e7eb;
	}

	.row:last-child {
		border-bottom: none;
	}

	span {
		color: #4b5563;
	}
</style>
