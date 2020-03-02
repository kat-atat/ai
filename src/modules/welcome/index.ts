import autobind from 'autobind-decorator';
import Module from '../../module';

export default class extends Module {
	public readonly name = 'welcome';

	@autobind
	public install() {
		const tl = this.ai.connection.useSharedConnection('globalTimeline');

		tl.on('note', this.onLocalNote);

		return {};
	}

	@autobind
	private onLocalNote(note: any) {
		if (note.isFirstNote) {
			setTimeout(() => {
				this.ai.api('notes/create', {
					visibility: 'public',
					text: '新規さんいらっしゃい！',
					renoteId: note.id
				});
			}, 3000);
			
			setTimeout(() => {
				this.ai.api('notes/create', {
					visibility: 'public',
					replyId: note.id,
					text: 'Misskey-leiへようこそ！ \n このインスタンスについて了解してほしいことがあるから、 \n ?[このページ](https://github.com/Misskey-lei/Policy/blob/master/kiyaku_kari.md)を見てくれると嬉しいなっ☆'
				});
			}, 4000);

			setTimeout(() => {
				this.ai.api('notes/reactions/create', {
					noteId: note.id,
					reaction: 'congrats'
				});
			}, 5000);
		}
	}
}
