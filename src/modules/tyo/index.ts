import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';
import serifs, { getSerif } from '../../tyos';

export default class extends Module {
	public readonly name = 'tyo';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@autobind

	public async mentionHook(msg: Message) {
		const match = msg.extractedText.match(/(.+?)(?:(?:(?:くだ|下)さ|ちょ[うー]だ)い|ほしいな?|欲しいな?|頂戴)/);
		msg.reply(getSerif(serifs.core.tyo.specify(match[1], msg)));
			return true;
	}
}