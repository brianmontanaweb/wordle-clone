import { error } from '@sveltejs/kit';

export const base = 'http://wordle-clone.com/api';

interface RequestApi extends RequestInit {
	path: string;
	data?: any;
}

interface RequestOptions {
	method: string | undefined;
	headers: { [k: string]: string };
	body?: string;
}

async function send<T>({ method, path, data }: RequestApi): Promise<T> {
	const opts: RequestOptions = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get<T>(path: string) {
	return send<T>({ method: 'GET', path });
}
