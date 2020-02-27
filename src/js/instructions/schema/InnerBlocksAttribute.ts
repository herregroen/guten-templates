import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { stripTags } from "../../functions/html";
import { getInnerBlocksAttributes } from "../../functions/blocks";
import { BlockInstance } from "@wordpress/blocks";

/**
 * InnerBlocks instruction
 */
class InnerBlocksAttribute extends SchemaInstruction {
	public options: {
		blocks?: Record<string, string>;
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
		let values = getInnerBlocksAttributes( block.clientId, this.options.blocks );

		if ( this.options[ "only-first" ] === true ) {
			values = values.slice( 0, 1 );
		} else if ( this.options[ "skip-first" ] === true ) {
			values = values.slice( 1 );
		}

		if ( values.length === 0 && this.options[ "null-when-empty" ] ) {
			return null;
		}

		const html = values.map( ( { value } ) => value ).join( this.options.split || " " );

		return stripTags( html, this.options[ "allowed-tags" ] );
	}
}

SchemaInstruction.register( "inner-blocks-attribute", InnerBlocksAttribute );
