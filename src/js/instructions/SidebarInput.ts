import { createElement } from "@wordpress/element";
import { TextControl } from "@wordpress/components";

import Instruction from "../core/Instruction";
import { RenderMode, RenderProps } from "../core/Definition";
import { BlockEditProps, BlockConfiguration } from "@wordpress/blocks";

/**
 * Sidebar input instruction
 */
class SidebarInput extends Instruction {
	public options: {
		name: string;
		default?: string;
		label?: string;
		help?: string;
	}

	/**
	 * Renders the value of a sidebar input.
	 *
	 * @param mode  The render mode.
	 * @param props The render props.
	 *
	 * @returns The value of the sidebar input.
	 */
	render( mode: RenderMode, props: RenderProps ): string {
		return props.attributes[ this.options.name ] as string || this.options.default;
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
		const attributes: TextControl.Props = {
			label: this.options.label,
			value: props.attributes[ this.options.name ] as string,
			onChange: value => props.setAttributes( { [ this.options.name ]: value } ),
			key: i,
		};

		if ( this.options.help ) {
			attributes.help = this.options.help;
		}

		return createElement( TextControl, attributes );
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

Instruction.register( "sidebar-input", SidebarInput );
