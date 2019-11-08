import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';
import config from '../../config';
//import serifs from '../../serifs';

export default class extends Module {
    mentionHook: any;
	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
    }
    
    public readonly name = 'start';
    this.ai.post({ text: `zzz...っは！？` });
}