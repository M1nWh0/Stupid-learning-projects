<script>
	import { onMount } from 'svelte';
	import UserForm from '#lib/components/UserForm.svelte';
	import DeleteDialog from '#lib/components/DeleteDialog.svelte';
	import { initialUsers } from '#lib/mockUsers.js';

	const defaultFormValues = Object.freeze({
		name: '',
		email: '',
		role: 'Viewer',
		status: 'Active'
	});

	let users = $state(initialUsers.map((user) => ({ ...user })));
	let selectedUserId = $state(null);
	let currentView = $state('list');
	let formMode = $state('create');
	let formValues = $state({ ...defaultFormValues });
	let deletingUserId = $state(null);
	let isLoading = $state(true);
	let appError = $state(null);

	onMount(() => {
		const timer = setTimeout(() => {
			isLoading = false;
		}, 500);

		return () => clearTimeout(timer);
	});

	let selectedUser = $derived(users.find((user) => user.id === selectedUserId) ?? null);
	let userToDelete = $derived(users.find((user) => user.id === deletingUserId) ?? null);

	function resetError() {
		appError = null;
	}

	function openList() {
		resetError();
		selectedUserId = null;
		deletingUserId = null;
		currentView = 'list';
	}

	function openCreateForm() {
		resetError();
		formMode = 'create';
		formValues = { ...defaultFormValues };
		currentView = 'form';
	}

	function openDetail(user) {
		resetError();
		selectedUserId = user.id;
		currentView = 'detail';
	}

	function openEdit(user) {
		resetError();
		selectedUserId = user.id;
		formMode = 'edit';
		formValues = { ...user };
		currentView = 'form';
	}

	function handleFormSubmit(payload) {
		if (formMode === 'edit' && selectedUserId !== null) {
			users = users.map((user) =>
				user.id === selectedUserId ? { ...user, ...payload } : user
			);
		} else {
			const nextId =
				users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
			users = [...users, { id: nextId, ...payload }];
		}

		formValues = { ...defaultFormValues };
		selectedUserId = null;
		currentView = 'list';
		appError = null;
	}

	function handleFormCancel() {
		formValues = { ...defaultFormValues };
		currentView = selectedUserId ? 'detail' : 'list';
	}

	function openDeleteDialog(user) {
		resetError();
		deletingUserId = user.id;
		currentView = 'delete';
	}

	function confirmDelete() {
		if (deletingUserId === null) return;

		users = users.filter((user) => user.id !== deletingUserId);

		if (selectedUserId === deletingUserId) {
			selectedUserId = null;
		}

		deletingUserId = null;
		currentView = 'list';
	}

	function cancelDelete() {
		deletingUserId = null;
		currentView = selectedUserId ? 'detail' : 'list';
	}

	function simulateError() {
		appError = {
			title: 'Something went wrong.',
			message: "We couldn't save this user."
		};
		currentView = 'list';
	}

	function handleRetry() {
		appError = null;
		currentView = 'list';
	}

	function restoreUsers() {
		users = initialUsers.map((user) => ({ ...user }));
		openList();
	}
</script>

<main class="page-shell">
	<div class="app-card">
		<header class="topbar">
			<div>
				<p class="eyebrow">Admin workspace</p>
				<h1>Users</h1>
			</div>

			<div class="header-actions">
				<button type="button" class="secondary" on:click={restoreUsers}>Reset</button>
				<button type="button" class="secondary" on:click={simulateError}>Simulate Error</button>
				<button type="button" class="primary" on:click={openCreateForm}>+ Add User</button>
			</div>
		</header>

		{#if isLoading}
			<div class="status-panel">
				<p class="loading-text">Loading users...</p>
			</div>
		{:else if appError}
			<div class="error-panel">
				<h2>{appError.title}</h2>
				<p>{appError.message}</p>
				<button type="button" class="primary" on:click={handleRetry}>Try Again</button>
			</div>
		{:else if currentView === 'list'}
			{#if users.length === 0}
				<div class="empty-panel">
					<h2>No users found.</h2>
					<p>There are currently no users to display.</p>
					<button type="button" class="primary" on:click={openCreateForm}>Create User</button>
				</div>
			{:else}
				<div class="user-list">
					{#each users as user (user.id)}
						<article class="user-row">
							<div class="user-main">
								<p class="user-name">{user.name}</p>
								<p class="user-email">{user.email}</p>
							</div>

							<div class="user-role">{user.role}</div>

							<div class="user-status">
								<span class={`status-badge ${user.status.toLowerCase()}`}>
									{user.status}
								</span>
							</div>

							<div class="row-actions">
								<button type="button" class="ghost" on:click={() => openDetail(user)}>View</button>
								<button type="button" class="ghost" on:click={() => openEdit(user)}>Edit</button>
								<button type="button" class="danger-light" on:click={() => openDeleteDialog(user)}>Delete</button>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		{:else if currentView === 'detail' && selectedUser}
			<section class="detail-card">
				<div class="detail-header">
					<div>
						<p class="eyebrow">User Details</p>
						<h2>{selectedUser.name}</h2>
						<p class="detail-email">{selectedUser.email}</p>
					</div>
					<button type="button" class="secondary" on:click={openList}>Back</button>
				</div>

				<div class="detail-grid">
					<div>
						<span class="detail-label">Role</span>
						<strong>{selectedUser.role}</strong>
					</div>
					<div>
						<span class="detail-label">Status</span>
						<strong>{selectedUser.status}</strong>
					</div>
				</div>

				<div class="form-actions">
					<button type="button" class="secondary" on:click={openList}>Return to list</button>
					<button type="button" class="primary" on:click={() => openEdit(selectedUser)}>Edit User</button>
					<button type="button" class="danger" on:click={() => openDeleteDialog(selectedUser)}>Delete User</button>
				</div>
			</section>
		{:else if currentView === 'form'}
			<div class="section-header">
				<h2>{formMode === 'edit' ? 'Edit User' : 'Create User'}</h2>
			</div>
			<UserForm
				mode={formMode}
				initialValues={formValues}
				onSubmit={handleFormSubmit}
				onCancel={handleFormCancel}
			/>
		{:else if currentView === 'delete' && userToDelete}
			<DeleteDialog user={userToDelete} onConfirm={confirmDelete} onCancel={cancelDelete} />
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: Inter, 'Segoe UI', sans-serif;
		background: #f3f5f9;
		color: #1f2937;
	}

	* {
		box-sizing: border-box;
	}

	button,
	input,
	select {
		font: inherit;
	}

	.page-shell {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px 16px;
	}

	.app-card {
		width: min(100%, 980px);
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 18px;
		box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
		padding: 28px;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 28px;
	}

	.eyebrow {
		margin: 0 0 8px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.7rem;
		font-weight: 700;
		color: #4f46e5;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(2rem, 2vw + 1rem, 2.7rem);
		line-height: 1.1;
	}

	.header-actions,
	.form-actions,
	.row-actions {
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
	}

	button {
		border: none;
		border-radius: 10px;
		padding: 10px 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	button:hover {
		transform: translateY(-1px);
	}

	.primary {
		background: #2563eb;
		color: #ffffff;
	}

	.secondary {
		background: #eef2ff;
		color: #1f2a44;
	}

	.ghost {
		background: transparent;
		color: #1f2937;
		border: 1px solid #d1d5db;
	}

	.danger {
		background: #dc2626;
		color: #ffffff;
	}

	.danger-light {
		background: #fee2e2;
		color: #991b1b;
	}

	.status-panel,
	.error-panel,
	.empty-panel,
	.detail-card,
	.form-card,
	.modal-card {
		background: #f8fafc;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
	}

	.status-panel,
	.error-panel,
	.empty-panel {
		padding: 30px 24px;
		text-align: center;
	}

	.loading-text {
		font-size: 1.1rem;
		color: #475569;
	}

	.error-panel h2,
	.empty-panel h2,
	.detail-card h2,
	.section-header h2,
	.modal-card h2 {
		margin-bottom: 12px;
		font-size: 1.8rem;
	}

	.error-panel p,
	.empty-panel p,
	.modal-card p,
	.detail-email,
	.user-email {
		color: #475569;
	}

	.user-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.user-row {
		display: grid;
		grid-template-columns: minmax(200px, 2fr) 110px 120px 220px;
		gap: 12px;
		align-items: center;
		padding: 18px 20px;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		background: #ffffff;
	}

	.user-main {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.user-name {
		font-size: 1.08rem;
		font-weight: 700;
		color: #111827;
	}

	.user-role {
		font-weight: 600;
		color: #374151;
	}

	.user-status {
		display: flex;
		justify-content: flex-start;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		padding: 6px 10px;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.status-badge.active {
		background: #dcfce7;
		color: #166534;
	}

	.status-badge.away {
		background: #fef3c7;
		color: #92400e;
	}

	.status-badge.inactive {
		background: #e5e7eb;
		color: #374151;
	}

	.detail-card,
	.form-card,
	.modal-card {
		padding: 24px;
	}

	.detail-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 26px;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(180px, 1fr));
		gap: 18px;
		margin-bottom: 26px;
	}

	.detail-grid > div {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px 18px;
		border-radius: 12px;
		background: #ffffff;
		border: 1px solid #e5e7eb;
	}

	.detail-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: #64748b;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 18px;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(150px, 1fr));
		gap: 16px;
	}

	label {
		font-weight: 600;
		color: #374151;
	}

	input,
	select {
		width: 100%;
		padding: 12px 14px;
		border-radius: 10px;
		border: 1px solid #d1d5db;
		background: #ffffff;
		color: #111827;
	}

	input:focus,
	select:focus {
		outline: 2px solid rgba(37, 99, 235, 0.2);
		border-color: #2563eb;
	}

	.error-text {
		color: #b91c1c;
		font-size: 0.84rem;
	}

	.section-header {
		margin-bottom: 20px;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		background: rgba(15, 23, 42, 0.4);
		padding: 20px;
	}

	.modal-card {
		width: min(100%, 450px);
		border: 1px solid #e5e7eb;
		box-shadow: 0 18px 45px rgba(15, 23, 42, 0.15);
	}

	.muted {
		margin-top: 8px;
		color: #6b7280;
	}

	@media (max-width: 700px) {
		.app-card {
			padding: 18px;
		}

		.topbar,
		.detail-header {
			display: block;
		}

		.header-actions,
		.form-actions {
			margin-top: 12px;
		}

		.user-row {
			grid-template-columns: 1fr;
		}

		.detail-grid,
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
