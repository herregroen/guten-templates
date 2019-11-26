import { createElement } from "@wordpress/element"
import { TextControl } from "@wordpress/components";

import Instruction from "../classes/Instruction";

class SidebarInput extends Instruction {
	render( mode, props ) {
		return props.attributes[ this.options.name ] || this.options.default;
	}

	sidebar( props, i ) {
		const attributes = {
			label: this.options.label,
			value: props[ this.options.name ],
			onChange: value => props.setAttributes( { [this.options.name]: value } ),
			key: i,
		};

		if ( this.options.help ) {
			attributes.help = this.options.help;
		}

		return createElement( TextControl, attributes );
	}

	configuration() {
		return {
			attributes: {
				[this.options.name]: {
					type: 'string',
				}
			}
		};
	}
}

Instruction.register( 'sidebar-input', SidebarInput );
