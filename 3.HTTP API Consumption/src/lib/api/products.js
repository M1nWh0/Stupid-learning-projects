/**
 * @typedef {{ id: number, name: string, description: string, price: number }} Product
 */

const API_BASE = '/api/products';

/**
 * @param {Response} response
 * @returns {Promise<any | null>}
 */
async function readJsonResponse(response) {
	const contentType = response.headers.get('content-type') ?? '';

	if (contentType.includes('application/json')) {
		return response.json();
	}

	return null;
}

/**
 * @param {Response} response
 * @param {string} defaultMessage
 * @returns {Promise<any>}
 */
async function handleResponse(response, defaultMessage) {
	const payload = await readJsonResponse(response);

	if (!response.ok) {
		throw new Error(payload?.message ?? defaultMessage);
	}

	return payload;
}

/** @returns {Promise<Product[]>} */
export async function fetchProducts() {
	const response = await fetch(API_BASE);
	return handleResponse(response, 'Unable to load products.');
}

/**
 * @param {{ name: string, description: string, price: number }} productData
 * @returns {Promise<Product>}
 */
export async function createProduct(productData) {
	const response = await fetch(API_BASE, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(productData)
	});

	return handleResponse(response, 'Unable to create product.');
}

/**
 * @param {number} productId
 * @param {{ name: string, description: string, price: number }} productData
 * @returns {Promise<Product>}
 */
export async function updateProduct(productId, productData) {
	const response = await fetch(`${API_BASE}/${productId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(productData)
	});

	return handleResponse(response, 'Unable to update product.');
}

/**
 * @param {number} productId
 * @returns {Promise<{ success: boolean }>} 
 */
export async function deleteProduct(productId) {
	const response = await fetch(`${API_BASE}/${productId}`, {
		method: 'DELETE'
	});

	if (response.status === 204) {
		return { success: true };
	}

	return handleResponse(response, 'Unable to delete product.');
}
