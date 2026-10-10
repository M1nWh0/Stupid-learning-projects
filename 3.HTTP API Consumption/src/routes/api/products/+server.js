import { json } from '@sveltejs/kit';
import { products, validateProductInput } from '../../../lib/data/products.js';

/** @type {number} */
let nextProductId = Math.max(...products.map((product) => product.id), 0) + 1;

export function GET() {
	return json(products);
}

export async function POST({ request }) {
	try {
		const body = await request.json();
		const validated = validateProductInput(body);
		const product = {
			id: nextProductId++,
			...validated
		};

		products.push(product);

		return json(product, { status: 201 });
	} catch (error) {
		const appError = /** @type {{ message?: string, status?: number }} */ (error);
		return json(
			{ message: appError.message ?? 'Invalid product data.' },
			{ status: appError.status ?? 400 }
		);
	}
}
