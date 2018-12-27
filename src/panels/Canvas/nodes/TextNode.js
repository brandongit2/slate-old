import {Html} from '../../../SVG';

export class TextNode {
    constructor(x, y, props, addNode) {
        this.html = new Html(x, y, 0, 0).setStyle({
            overflow: 'visible'
        });
        this.textarea = document.createElement('textarea');
        this.textarea.style.width = '100%';
        this.textarea.style.height = '100%';
        this.textarea.style.fontSize = `${props.text.fontSize}pt`;
        this.textarea.style.color = props.text.color;
        this.textarea.setAttribute('class', 'box');
        this.html.append(this.textarea);

    }
}
