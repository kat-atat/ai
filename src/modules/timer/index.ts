import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';
import serifs from '../../serifs';

export default class extends Module {
	public readonly name = 'timer';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook,
			timeoutCallback: this.timeoutCallback,
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		const secondsQuery = (msg.text || '').match(/([0-9]+)秒/);
		const minutesQuery = (msg.text || '').match(/([0-9]+)分/);
		const hoursQuery = (msg.text || '').match(/([0-9]+)時間/);

		const seconds = secondsQuery ? parseInt(secondsQuery[1], 10) : 0;
		const minutes = minutesQuery ? parseInt(minutesQuery[1], 10) : 0;
		const hours = hoursQuery ? parseInt(hoursQuery[1], 10) : 0;

		if (!(secondsQuery || minutesQuery || hoursQuery)) return false;

		if ((seconds + minutes + hours) == 0) {
			msg.reply(serifs.timer.invalid);
			return true;
		}

		const time =
			(1000 * seconds) +
			(1000 * 60 * minutes) +
			(1000 * 60 * 60 * hours);

		if (time > 86400000) {
			msg.reply(serifs.timer.tooLong);
			return true;
		}

		const pre = time ==  300 * 1000 && /(?:カレーメシ|ぶっこみ飯)/.test(msg.text) ? 'またカップめし？私にも欲しいな！' : '';

		const pre = time ==  180 * 1000 && /(?:ごつ盛り塩焼きそば|ごつ盛り塩)/.test(msg.text) ? 'ごつ盛り塩焼きそば！？私にも頂戴！！' : '';


		msg.reply(pre + serifs.timer.set);

		const str = `${hours ? hoursQuery[0] : ''}${minutes ? minutesQuery[0] : ''}${seconds ? secondsQuery[0] : ''}`;

		// タイマーセット
		this.setTimeoutWithPersistence(time + 2000, {
			isDm: msg.isDm,
			msgId: msg.id,
			userId: msg.friend.userId,
			time: str
		});

		return true;
	}

	@autobind
	private timeoutCallback(data) {
		const friend = this.ai.lookupFriend(data.userId);
		const text = serifs.timer.notify(data.time, friend.name);
		if (data.isDm) {
			this.ai.sendMessage(friend.userId, {
				text: text
			});
		} else {
			this.ai.post({
				replyId: data.msgId,
				text: text
			});
		}
	}
}
