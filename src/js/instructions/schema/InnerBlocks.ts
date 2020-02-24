import { select } from "@wordpress/data";

import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { schemaDefinitions, SchemaValue } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends SchemaInstruction {
	public options: {
		blocks?: string[];
	}

	/**
	 * Renders schema.
	 *
	 * @param props The props.
	 *
	 * @returns The schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		let innerBlocks = select( "core/block-editor" ).getBlocksByClientId( props.clientId )[ 0 ].innerBlocks;

		if ( this.options.blocks ) {
			innerBlocks = innerBlocks.filter( block => this.options.blocks.includes( block.name ) );
		}

		return innerBlocks.map( block => {
			const schemaDefinition = schemaDefinitions[ block.name ];

			if ( ! schemaDefinition ) {
				return null;
			}
			return schemaDefinition.render( block );
		} ).filter( schema => schema !== null );
	}
}

SchemaInstruction.register( "inner-blocks", InnerBlocks );
