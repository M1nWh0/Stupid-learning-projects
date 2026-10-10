/**
 * @typedef {{ id: number, name: string, description: string, price: number }} Product
 */

/** @type {Product[]} */
export const products = [
	{ id: 1, name: 'Laptop', description: 'Lightweight workstation for everyday productivity.', price: 999.99 },
	{ id: 2, name: 'Mechanical Keyboard', description: 'Tactile keyboard with RGB lighting.', price: 129.5 },
	{ id: 3, name: 'Wireless Mouse', description: 'Ergonomic mouse with silent click switches.', price: 59.99 }
];

/**
 * @param {{ name?: string, description?: string, price?: number | string }} [input]
 * @returns {{ name: string, description: string, price: number }}
 */
export function validateProductInput(input = {}) {
	const name = String(input.name ?? '').trim();
	const description = String(input.description ?? '').trim();
	const price = Number(input.price);

	if (!name) {
		throw Object.assign(new Error('Product name is required.'), { status: 400 });
	}

	if (!description) {
		throw Object.assign(new Error('Product description is required.'), { status: 400 });
	}

	if (Number.isNaN(price) || price < 0) {
		throw Object.assign(new Error('Price must be a valid non-negative number.'), { status: 400 });
	}

	return {
		name,
		description,
		price: Number(price.toFixed(2))
	};
}

/**
 * @param {string | number} id
 * @returns {Product | undefined}
 */
export function findProductById(id) {
	return products.find((product) => product.id === Number(id));
}
