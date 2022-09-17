import autobind from 'autobind-decorator';
import Module from '@/module';
import serifs from '@/serifs';
import { genItem } from '@/vocabulary';
import config from '@/config';
import * as loki from 'lokijs';

export default class extends Module {
	public readonly name = 'noting';

	private learnedKeywords?: loki.Collection<{
		keyword: string;
		learnedAt: number;
	}>;

	@autobind
	public install() {
		if (config.notingEnabled === false) return {};

		if (config.keywordEnabled) {
			this.learnedKeywords = this.ai.getCollection('_keyword_learnedKeywords', {
				indices: ['userId']
			});
		}

		setInterval(() => {
			if (Math.random() < 0.5) {
				this.post();
			}
		}, 1000 * 60 * 1);

		return {};
	}

	@autobind
	private post() {
		const getKeyword = (rng: () => number) => {
			if (!this.learnedKeywords) return null;

			const count = this.learnedKeywords.count();
			const offset = Math.floor(rng() * count);
	
			const x = this.learnedKeywords.chain().find().offset(offset).limit(1).data();
			const keyword = x[0]?.keyword || null;
			return keyword;
		};


		const notes = [
			...serifs.noting.notes,
			() => {
				const item = genItem(undefined, getKeyword);
				return serifs.noting.want(item);
			},
			() => {
				const item = genItem(undefined, getKeyword);
				return serifs.noting.see(item);
			},
			() => {
				const item = genItem(undefined, getKeyword);
				return serifs.noting.expire(item);
			},
		];

		const note = notes[Math.floor(Math.random() * notes.length)];

		this.ai.post({
			text: typeof note === 'function' ? note() : note
		});
	}
}
