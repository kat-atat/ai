import autobind from 'autobind-decorator';
import Module from '../../module';
//import serifs from '../../serifs';

export default class extends Module {
	public readonly name = 'start';
	
	@autobind
	public install() {

		setTimeout(() => {
		this.ai.post({ text: `zzz...っは！？` });
		}, 2000);

		setTimeout(() => {
		this.ai.post({ text: `寝てたっ！` });
		}, 3000);

		return {
			
		};
	}

    
}