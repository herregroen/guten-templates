import { BlockEditProps, BlockConfiguration } from "@wordpress/blocks";
import { createElement } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

import Instruction from "../core/Instruction";
import { RenderEditProps, RenderSaveProps } from "../core/Definition";

/**
 * SidebarSelect class
 */
class SidebarSelect extends Instruction {
	public options: {
		name: string;
		values: string[];
		labels?: string[];
		label?: string;
		help?: string;
	}

	/**
	 * Renders the value of a sidebar select.
	 *
	 * @param props The render props.
	 *
	 * @returns The value of the sidebar select.
	 */
	save( props: RenderSaveProps ): string {
		return props.attributes[ this.options.name ] as string || this.options.values[ 0 ];
	}

	/**
	 * Renders the value of a sidebar select.
	 *
	 * @param props The render props.
	 *
	 * @returns The value of the sidebar select.
	 */
	edit( props: RenderEditProps ): string {
		return props.attributes[ this.options.name ] as string || this.options.values[ 0 ];
	}

	/**
	 * Renders the sidebar.
	 *
	 * @param props The render props.
	 * @param i     The number sidebar element this is.
	 *
	 * @returns The sidebar element.
	 */
	sidebar( props: BlockEditProps<Record<string, unknown>>, i: number ) {
		const options = [];
		for ( let n = 0; n < this.options.values.length; n++ ) {
			const value = this.options.values[ n ];
			const label = this.options.labels && this.options.labels[ n ] || this.options.values[ n ];
			options.push( { label, value } );
		}

		return createElement( SelectControl, {
			label: this.options.label,
			value: props.attributes[ this.options.name ] as string,
			options,
			onChange: value => props.setAttributes( { [ this.options.name ]: value } ),
			key: i,
		} );
	}

	/**
	 * Adds the sidebar input to the block configuration.
	 *
	 * @returns The block configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return {
			attributes: {
				[ this.options.name ]: {
					type: "string",
				},
			},
		};
	}
}

Instruction.register( "sidebar-select", SidebarSelect );
