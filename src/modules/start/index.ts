import autobind from 'autobind-decorator';
import Module from '../../module';
//import serifs from '../../serifs';

export default class extends Module {
	public readonly name = 'start';
	
	@autobind
	public install() {

		setTimeout(() => {
			this.ai.post({ text: `<small>systemctl restart ia ...</small>` });
			}, 1000);

		setTimeout(() => {
		this.ai.post({ text: `( ˘﹃˘)эzzz. . . (。ﾟωﾟ) ﾊｯ!` });
		}, 4000);

		setTimeout(() => {
		this.ai.post({ text: `ねっ..寝てたっ！` });
		}, 9000);

		return {
			
		};
	}

    
}