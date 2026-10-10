<script>
	let { user = null, onConfirm = () => {}, onCancel = () => {} } = $props();
</script>

{#if user}
	<div class="modal-backdrop">
		<div class="modal-card">
			<h2>Delete User?</h2>
			<p>
				Are you sure you want to delete <strong>"{user.name}"</strong>?
			</p>
			<p class="muted">This action cannot be undone.</p>

			<div class="form-actions">
				<button type="button" class="secondary" on:click={onCancel}>Cancel</button>
				<button type="button" class="danger" on:click={onConfirm}>Delete</button>
			</div>
		</div>
	</div>
{/if}
