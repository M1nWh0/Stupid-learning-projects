import { json } from '@sveltejs/kit';
import { findProductById, products, validateProductInput } from '../../../../lib/data/products.js';

export function GET({ params }) {
	const product = findProductById(params.id);

	if (!product) {
		return json({ message: 'Product not found.' }, { status: 404 });
	}

	return json(product);
}

export async function PATCH({ params, request }) {
	const product = findProductById(params.id);

	if (!product) {
		return json({ message: 'Product not found.' }, { status: 404 });
	}

	try {
		const body = await request.json();
		const updateData = {
			...product,
			...(body.name !== undefined ? { name: String(body.name).trim() } : {}),
			...(body.description !== undefined ? { description: String(body.description).trim() } : {}),
			...(body.price !== undefined ? { price: Number(body.price) } : {})
		};

		const validated = validateProductInput(updateData);
		const productIndex = products.findIndex(
			/** @param {{ id: number }} item */
			(item) => item.id === Number(params.id)
		);

		if (productIndex === -1) {
			return json({ message: 'Product not found.' }, { status: 404 });
		}

		products[productIndex] = {
			...products[productIndex],
			...validated
		};

		return json(products[productIndex]);
	} catch (error) {
		const appError = /** @type {{ message?: string, status?: number }} */ (error);
		return json(
			{ message: appError.message ?? 'Unable to update product.' },
			{ status: appError.status ?? 400 }
		);
	}
}

export function DELETE({ params }) {
	const productIndex = products.findIndex(
		/** @param {{ id: number }} product */
		(product) => product.id === Number(params.id)
	);

	if (productIndex === -1) {
		return json({ message: 'Product not found.' }, { status: 404 });
	}

	products.splice(productIndex, 1);

	return new Response(null, { status: 204 });
}
