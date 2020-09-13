import autobind from 'autobind-decorator';
import Message from '../../message';
import Module from '../../module';
import serifs from '../../serifs';
import { genItem } from '../../vocabulary';
import config from '../../config';
import * as loki from 'lokijs';

export default class extends Module {
	public readonly name = 'poll';

	private learnedKeywords?: loki.Collection<{
		keyword: string;
		learnedAt: number;
	}>;

	@autobind
	public install() {
		if (config.keywordEnabled) {
			this.learnedKeywords = this.ai.getCollection('_keyword_learnedKeywords', {
				indices: ['userId']
			});
		}

		setInterval(() => {
			if (Math.random() < 0.1) {
				this.post();
			}
		}, 1000 * 60 * 60);

		return {
			mentionHook: this.mentionHook,
			timeoutCallback: this.timeoutCallback,
		};
	}

	@autobind
	private async post() {
		const duration = 1000 * 60 * 30;

		const polls = [ // TODO: Extract serif
			['いちばん珍しそうなもの', 'みんなは、どれがいちばん珍しいと思う？ ヽ(・∀・)'],
			['いちばん美味しそうなもの', 'みんなは、どれがいちばん美味しいと思う？ ヽ(・∀・)'],
			['いちばん重そうなもの', 'みんなは、どれがいちばん重いと思う？ ヽ(・∀・)'],
			['いちばん欲しいもの', 'みんなは、どれがいちばん欲しい？ ヽ(・∀・)'],
			['無人島に持っていきたいもの', 'みんなは、無人島にひとつ持っていけるとしたらどれにする？ ヽ(・∀・)'],
		];

		const poll = polls[Math.floor(Math.random() * polls.length)];

		const getKeyword = (rng: () => number) => {
			if (!this.learnedKeywords) return null;

			const count = this.learnedKeywords.count();
			const offset = Math.floor(rng() * count);
	
			const x = this.learnedKeywords.chain().find().offset(offset).limit(1).data();
			const keyword = x[0]?.keyword || null;
			return keyword;
		};

		const note = await this.ai.post({
			text: poll[1],
			poll: {
				choices: [
					genItem(undefined, getKeyword),
					genItem(undefined, getKeyword),
					genItem(undefined, getKeyword),
					genItem(undefined, getKeyword),
				],
				expiredAfter: duration,
				multiple: false,
			}
		});

		// タイマーセット
		this.setTimeoutWithPersistence(duration + 3000, {
			title: poll[0],
			noteId: note.id,
		});
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (!msg.or(['/poll']) || msg.user.username !== config.master) {
			return false;
		} else {
			this.log('Manualy poll requested');
		}

		this.post();

		return true;
	}

	@autobind
	private async timeoutCallback({ title, noteId }) {
		const note = await this.ai.api('notes/show', { noteId });

		const choices = note.poll.choices;

		let mostVotedChoice;

		for (const choice of choices) {
			if (mostVotedChoice == null) {
				mostVotedChoice = choice;
				continue;
			}

			// TODO: 同数一位のハンドリング
			if (choice.votes > mostVotedChoice.votes) {
				mostVotedChoice = choice;
			}
		}

		if (mostVotedChoice.votes === 0) {
			this.ai.post({ // TODO: Extract serif
				text: '投票はなかったよ〜…',
				renoteId: noteId,
			});
		} else {
			this.ai.post({ // TODO: Extract serif
				cw: `${title}アンケートの結果発表〜！`,
				text: `結果は「${mostVotedChoice.text}」だったよ！`,
				renoteId: noteId,
			});
		}
	}
}
