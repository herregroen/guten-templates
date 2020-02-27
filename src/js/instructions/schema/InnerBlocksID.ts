import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { BlockInstance } from "@wordpress/blocks";
import { select } from "@wordpress/data";
import { getBlockSchemaId } from "../../functions/gutenberg/block";

/**
 * InnerBlocksID instruction
 */
class InnerBlocksID extends SchemaInstruction {
	public options: {
		"allowed-blocks"?: string[];
		"allowed-tags"?: string[];
		"only-first"?: boolean;
		"skip-first"?: boolean;
		split?: string;
		"null-when-empty"?: boolean;
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

		if ( this.options[ "allowed-blocks" ] ) {
			innerBlocks = innerBlocks.filter( innerBlock => this.options[ "allowed-blocks" ].includes( innerBlock.name ) );
		}

		if ( this.options[ "only-first" ] === true ) {
			innerBlocks = innerBlocks.slice( 0, 1 );
		} else if ( this.options[ "skip-first" ] === true ) {
			innerBlocks = innerBlocks.slice( 1 );
		}

		if ( innerBlocks.length === 0 && this.options[ "null-when-empty" ] ) {
			return null;
		}

		const ids = innerBlocks.map( innerBlock => ( { "@id": getBlockSchemaId( innerBlock ) } ) );

		if ( ids.length === 1 ) {
			return ids[ 0 ];
		}

		return ids;
	}
}

SchemaInstruction.register( "inner-blocks-id", InnerBlocksID );
