import { createElement } from "@wordpress/element";
import { RichText as WordPressRichText } from "@wordpress/block-editor";

import Instruction from "../classes/Instruction";

class RichText extends Instruction {
	render( mode, props, leaf, i ) {
		let Element      = WordPressRichText.Content;
		const attributes = {
			tagName: this.options.tag,
			value: props.attributes[ this.options.name ],
			className: this.options.class,
			placeholder: this.options.placeholder,
			'data-id': this.options.name,
			key: i,
		}

		if ( this.options.multiline ) {
			attributes.multiline = this.options.multiline;
		}

		if ( mode === 'edit' ) {
			Element = WordPressRichText;
			attributes.onChange = ( value ) => props.setAttributes( { [this.options.name]: value } );
			if ( this.options.placeholder ) {
				attributes.placeholder = this.options.placeholder;
			}
		}
		
		return createElement( Element, attributes );
	}

	configuration() {
		return {
			attributes: {
				[this.options.name]: {
					type: 'string',
            		source: 'html',
            		selector: `[data-id=${this.options.name}]`,
				}
			}
		};
	}
}

Instruction.register( 'rich-text', RichText );
