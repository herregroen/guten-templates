import { createElement } from "@wordpress/element";
import { TextControl } from "@wordpress/components";

import BlockInstruction from "../../core/blocks/BlockInstruction";
import { RenderSaveProps, RenderEditProps } from "../../core/blocks/BlockDefinition";
import { BlockEditProps, BlockConfiguration } from "@wordpress/blocks";
import SidebarBase from "./abstract/SidebarBase";

/**
 * Sidebar input instruction
 */
class SidebarInput extends SidebarBase {
	public options: {
		name: string;
		default?: string;
		label?: string;
		help?: string;
		output?: boolean;
	}

	/**
	 * Renders the sidebar.
	 *
	 * @param props The render props.
	 * @param i     The number sidebar element this is.
	 *
	 * @returns The sidebar element.
	 */
	sidebar( props: BlockEditProps<Record<string, unknown>>, i: number ): JSX.Element {
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

	/**
	 * Renders the value of a sidebar input.
	 *
	 * @param props The render props.
	 *
	 * @returns The value of the sidebar input.
	 */
	protected value( props: RenderSaveProps | RenderEditProps ): string {
		return props.attributes[ this.options.name ] as string || this.options.default || "";
	}
}

BlockInstruction.register( "sidebar-input", SidebarInput );
