import autobind from 'autobind-decorator';
import Module from '../../module';

export default class extends Module {
	public readonly name = 'welcome';

	@autobind
	public install() {
		const tl = this.ai.connection.useSharedConnection('localTimeline');

		tl.on('note', this.onLocalNote);

		return {};
	}

	@autobind
	private onLocalNote(note: any) {
		if (note.isFirstNote) {
			setTimeout(() => {
				this.ai.api('notes/create', {
					visibility: 'public',
					renoteId: note.id
				});
			}, 3000);
			
			setTimeout(() => {
				this.ai.api('notes/create', {
					visibility: 'public',
					replyId: note.id,
					text: 'ようこそ！ \n このリンク先に注意点とかあるから、 \n 見てくれると嬉しいなっ☆\n https://github.com/Misskey-lei/Policy/blob/master/kiyaku_kari.md'
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
