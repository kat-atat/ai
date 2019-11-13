// せりふ

export default {
	core: {
		tyo: {
			specify: (thing, name) => name ? [
				`${thing}どうぞ！`,
			] : [
				`${thing}どうぞ！`,
			],
		},
	}
};

export function getSerif(variant: string | string[]): string {
	if (Array.isArray(variant)) {
		return variant[Math.floor(Math.random() * variant.length)];
	} else {
		return variant;
	}
}
