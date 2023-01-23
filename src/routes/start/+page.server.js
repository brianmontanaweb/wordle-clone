import { get } from 'src/lib/api';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		console.log('load');
		const res = await get('wordle');
		const data = res.json();
		return { data };
	} catch (e) {
		console.error(e);
	}
}
