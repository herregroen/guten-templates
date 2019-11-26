import { createElement } from "@wordpress/element"
import { SelectControl } from "@wordpress/components";

import Instruction from "../classes/Instruction";

class SidebarSelect extends Instruction {
	render( mode, props ) {
		return props.attributes[ this.options.name ] || this.options.values[ 0 ];
	}

	sidebar( props, i ) {
		const options = [];
		for ( let i = 0; i < this.options.values.length; i++ ) {
			const value = this.options.values[ i ];
			const label = this.options.labels && this.options.labels[ i ] || this.options.values[ i ];
			options.push( { label, value } );
		}

		return createElement( SelectControl, {
			label: this.options.label,
			value: props[ this.options.name ],
			options,
			onChange: value => props.setAttributes( { [this.options.name]: value } ),
			key: i,
		} );
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

Instruction.register( 'sidebar-select', SidebarSelect );
