export function groupBy<T, K extends number | string>(
	items: T[],
	getKey: (item: T) => K,
) {
	const grouped = {} as Record<K, T[]>;

	for (const item of items) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		(grouped[getKey(item)] ??= []).push(item);
	}

	return Object.fromEntries(
		Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)),
	) as typeof grouped;
}

export const withBase = (path: string) => {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "/");
	return `${base}${path}`;
};
