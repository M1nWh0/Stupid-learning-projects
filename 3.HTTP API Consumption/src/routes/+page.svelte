<script>
	import { onMount } from 'svelte';
	import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../lib/api/products.js';

	/** @type {Array<{ id: number, name: string, description: string, price: number }>} */
	let products = $state([]);

	/** @type {boolean} */
	let loading = $state(true);

	/** @type {string} */
	let error = $state('');

	/** @type {string} */
	let successMessage = $state('');

	/** @type {string} */
	let formError = $state('');

	/** @type {boolean} */
	let isEditing = $state(false);

	/** @type {number | null} */
	let editingId = $state(null);

	/** @type {{ name: string, description: string, price: string }} */
	let form = $state({
		name: '',
		description: '',
		price: ''
	});

	function createEmptyForm() {
		return {
			name: '',
			description: '',
			price: ''
		};
	}

	async function loadProducts() {
		loading = true;
		error = '';
		successMessage = '';

		try {
			products = await fetchProducts();
		} catch (loadError) {
			error = loadError instanceof Error ? loadError.message : 'Unable to load products.';
		} finally {
			loading = false;
		}
	}

	function resetForm() {
		form = createEmptyForm();
		isEditing = false;
		editingId = null;
		formError = '';
	}

	/**
	 * @param {{ id: number, name: string, description: string, price: number }} product
	 */
	function prepareEdit(product) {
		isEditing = true;
		editingId = product.id;
		form = {
			name: product.name,
			description: product.description,
			price: String(product.price)
		};
		formError = '';
		successMessage = '';
	}

	async function handleSubmit() {
		formError = '';
		successMessage = '';

		const name = form.name.trim();
		const description = form.description.trim();
		const price = Number(form.price);

		if (!name || !description || Number.isNaN(price) || price < 0) {
			formError = 'Please enter a valid name, description, and non-negative price.';
			return;
		}

		const payload = {
			name,
			description,
			price: Number(price.toFixed(2))
		};

		try {
			if (isEditing && editingId !== null) {
				const updatedProduct = await updateProduct(editingId, payload);
				products = products.map((product) =>
					product.id === editingId ? updatedProduct : product
				);
				successMessage = 'Product updated successfully.';
			} else {
				const createdProduct = await createProduct(payload);
				products = [createdProduct, ...products];
				successMessage = 'Product created successfully.';
			}

			resetForm();
		} catch (submitError) {
			formError = submitError instanceof Error ? submitError.message : 'Unable to save product.';
		}
	}

	/**
	 * @param {number} productId
	 */
	async function handleDelete(productId) {
		const product = products.find((item) => item.id === productId);

		if (!product) {
			return;
		}

		const confirmed = window.confirm(`Delete "${product.name}"?`);
		if (!confirmed) {
			return;
		}

		try {
			await deleteProduct(productId);
			products = products.filter((item) => item.id !== productId);
			successMessage = 'Product deleted successfully.';

			if (editingId === productId) {
				resetForm();
			}
		} catch (deleteError) {
			error = deleteError instanceof Error ? deleteError.message : 'Unable to delete product.';
		}
	}

	onMount(() => {
		loadProducts();
	});
</script>

<div class="page-shell">
	<header class="topbar">
		<div>
			<p class="eyebrow">Product Management</p>
			<h1>Products</h1>
		</div>
		<button class="secondary" type="button" onclick={loadProducts} disabled={loading}>
			Refresh list
		</button>
	</header>

	{#if successMessage}
		<div class="message success">{successMessage}</div>
	{/if}

	{#if error}
		<div class="message error">{error}</div>
	{/if}

	<div class="content-grid">
		<section class="panel">
			<h2>{isEditing ? 'Edit product' : 'Add product'}</h2>

			<form class="product-form" onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}>
				<label>
					<span>Name</span>
					<input bind:value={form.name} type="text" placeholder="Product name" />
				</label>

				<label>
					<span>Description</span>
					<textarea bind:value={form.description} rows="4" placeholder="Product description"></textarea>
				</label>

				<label>
					<span>Price</span>
					<input bind:value={form.price} type="number" min="0" step="0.01" placeholder="0.00" />
				</label>

				<div class="form-actions">
					<button class="primary" type="submit">
						{isEditing ? 'Update product' : 'Create product'}
					</button>

					{#if isEditing}
						<button class="secondary" type="button" onclick={resetForm}>Cancel</button>
					{/if}
				</div>

				{#if formError}
					<p class="field-error">{formError}</p>
				{/if}
			</form>
		</section>

		<section class="panel">
			<div class="list-header">
				<h2>All products</h2>
			</div>

			{#if loading}
				<div class="state-box loading">Loading products...</div>
			{:else if products.length === 0}
				<div class="state-box empty">No products available yet.</div>
			{:else}
				<div class="product-list">
					{#each products as product (product.id)}
						<article class="product-card">
							<div class="card-topline">
								<span class="badge">#{product.id}</span>
							</div>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<div class="price">$ {Number(product.price).toFixed(2)}</div>

							<div class="card-actions">
								<button class="secondary" type="button" onclick={() => prepareEdit(product)}>
									Edit
								</button>
								<button class="danger" type="button" onclick={() => handleDelete(product.id)}>
									Delete
								</button>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', sans-serif;
		background: #f4f7fb;
		color: #1d2433;
	}

	* {
		box-sizing: border-box;
	}

	.page-shell {
		max-width: 1200px;
		margin: 0 auto;
		padding: 32px 20px 60px;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin-bottom: 20px;
	}

	.eyebrow {
		margin: 0 0 6px;
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #4d5f7a;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 2.6rem);
	}

	.content-grid {
		display: grid;
		grid-template-columns: minmax(280px, 400px) minmax(0, 1fr);
		gap: 24px;
	}

	.panel {
		background: white;
		padding: 24px;
		border-radius: 18px;
		box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
	}

	.product-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.product-form label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-weight: 600;
		color: #273448;
	}

	.product-form input,
	.product-form textarea {
		padding: 12px 14px;
		border: 1px solid #dfe7f3;
		border-radius: 10px;
		font: inherit;
		background: #f9fbff;
	}

	.product-form input:focus,
	.product-form textarea:focus {
		outline: 2px solid rgba(59, 130, 246, 0.2);
		border-color: #7aa7ff;
	}

	.form-actions,
	.card-actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	button {
		border: none;
		border-radius: 10px;
		padding: 10px 16px;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.15s ease, opacity 0.15s ease;
	}

	button:hover {
		transform: translateY(-1px);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.primary {
		background: #2563eb;
		color: white;
	}

	.secondary {
		background: #eaf1ff;
		color: #1c3d7a;
	}

	.danger {
		background: #fee2e2;
		color: #991b1b;
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.state-box {
		padding: 24px 16px;
		text-align: center;
		border-radius: 12px;
		color: #445163;
		background: #f8fafc;
	}

	.loading {
		border: 1px dashed #c7d2fe;
	}

	.empty {
		border: 1px dashed #cbd5e1;
	}

	.product-list {
		display: grid;
		gap: 14px;
	}

	.product-card {
		border: 1px solid #e5ebf5;
		border-radius: 14px;
		padding: 18px;
		background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
	}

	.card-topline {
		margin-bottom: 8px;
	}

	.badge {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		padding: 4px 8px;
		border-radius: 999px;
		background: #dfeaff;
		color: #1e40af;
	}

	.product-card h3 {
		margin: 0 0 10px;
		font-size: 1.2rem;
	}

	.product-card p {
		margin: 0 0 12px;
		line-height: 1.5;
		color: #53657c;
	}

	.price {
		font-size: 1.4rem;
		font-weight: 700;
		margin-bottom: 14px;
		color: #0f172a;
	}

	.message {
		padding: 12px 16px;
		border-radius: 12px;
		margin-bottom: 18px;
		font-weight: 600;
	}

	.message.success {
		background: #dcfce7;
		color: #166534;
	}

	.message.error {
		background: #fee2e2;
		color: #991b1b;
	}

	.field-error {
		margin: 0;
		font-size: 0.92rem;
		color: #b91c1c;
	}

	@media (max-width: 820px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.topbar {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
