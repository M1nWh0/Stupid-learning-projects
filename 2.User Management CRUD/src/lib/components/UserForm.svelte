<script>
	let {
		mode = 'create',
		initialValues = { name: '', email: '', role: 'Viewer', status: 'Active' },
		onSubmit = () => {},
		onCancel = () => {}
	} = $props();

	let form = $state({
		name: initialValues.name ?? '',
		email: initialValues.email ?? '',
		role: initialValues.role ?? 'Viewer',
		status: initialValues.status ?? 'Active'
	});

	let errors = $state({});

	$effect(() => {
		form = {
			name: initialValues.name ?? '',
			email: initialValues.email ?? '',
			role: initialValues.role ?? 'Viewer',
			status: initialValues.status ?? 'Active'
		};
		errors = {};
	});

	function validate() {
		const nextErrors = {};

		if (!form.name.trim()) {
			nextErrors.name = 'Name is required.';
		}

		if (!form.email.trim()) {
			nextErrors.email = 'Email is required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
			nextErrors.email = 'Enter a valid email address.';
		}

		if (!form.role) {
			nextErrors.role = 'Role is required.';
		}

		if (!form.status) {
			nextErrors.status = 'Status is required.';
		}

		return nextErrors;
	}

	function submitForm() {
		const nextErrors = validate();
		errors = nextErrors;

		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		onSubmit({
			name: form.name.trim(),
			email: form.email.trim(),
			role: form.role,
			status: form.status
		});
	}
</script>

<div class="form-card">
	<div class="field-group">
		<label for="name">Name</label>
		<input id="name" bind:value={form.name} type="text" placeholder="Enter full name" />
		{#if errors.name}
			<p class="error-text">{errors.name}</p>
		{/if}
	</div>

	<div class="field-group">
		<label for="email">Email</label>
		<input id="email" bind:value={form.email} type="email" placeholder="name@example.com" />
		{#if errors.email}
			<p class="error-text">{errors.email}</p>
		{/if}
	</div>

	<div class="field-row">
		<div class="field-group">
			<label for="role">Role</label>
			<select id="role" bind:value={form.role}>
				<option value="Admin">Admin</option>
				<option value="Editor">Editor</option>
				<option value="Viewer">Viewer</option>
			</select>
			{#if errors.role}
				<p class="error-text">{errors.role}</p>
			{/if}
		</div>

		<div class="field-group">
			<label for="status">Status</label>
			<select id="status" bind:value={form.status}>
				<option value="Active">Active</option>
				<option value="Away">Away</option>
				<option value="Inactive">Inactive</option>
			</select>
			{#if errors.status}
				<p class="error-text">{errors.status}</p>
			{/if}
		</div>
	</div>

	<div class="form-actions">
		<button type="button" class="secondary" on:click={onCancel}>Cancel</button>
		<button type="button" class="primary" on:click={submitForm}>
			{mode === 'edit' ? 'Save Changes' : 'Create User'}
		</button>
	</div>
</div>
