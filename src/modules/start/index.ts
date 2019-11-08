import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';


export default class extends Module {
    public readonly name = 'start';
    
    this.ai.post({ text: `...はっ！？` });
    this.ai.post({ text: `寝てた...。` });
}
