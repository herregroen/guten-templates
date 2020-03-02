import { select } from "@wordpress/data";

import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { schemaDefinitions, SchemaValue } from "../../core/schema/SchemaDefinition";
import { BlockInstance } from "@wordpress/blocks";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends SchemaInstruction {
	public options: {
		allowedBlocks?: string[];
	}

	/**
	 * Renders schema.
	 *
	 * @param block The block.
	 *
	 * @returns The schema.
	 */
	render( block: BlockInstance ): SchemaValue {
		let innerBlocks = select( "core/block-editor" ).getBlocksByClientId( block.clientId )[ 0 ].innerBlocks;

		if ( this.options.allowedBlocks ) {
			innerBlocks = innerBlocks.filter( innerBlock => this.options.allowedBlocks.includes( innerBlock.name ) );
		}

		return innerBlocks.map( innerBlock => {
			const schemaDefinition = schemaDefinitions[ innerBlock.name ];

			if ( ! schemaDefinition ) {
				return null;
			}
			return schemaDefinition.render( innerBlock );
		} ).filter( schema => schema !== null );
	}
}

SchemaInstruction.register( "inner-blocks", InnerBlocks );
