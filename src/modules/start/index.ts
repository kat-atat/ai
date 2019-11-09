import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';
import config from '../../config';
//import serifs from '../../serifs';

export default class extends Module {
	public readonly name = 'start';
	
	@autobind
	public install() {

		this.ai.post({ text: `zzz...っは！？` });
		this.ai.post({ text: `寝てたっ！` });

		return {};
	}

    
}