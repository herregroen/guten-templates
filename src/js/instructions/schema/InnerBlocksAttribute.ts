import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";
import stripTags from "../../functions/stripTags";
import { getInnerBlocksAttributes } from "../../functions/blocks";

/**
 * InnerBlocks instruction
 */
class InnerBlocksAttribute extends SchemaInstruction {
	public options: {
		blocks?: Record<string, string>;
		allowedTags?: string[];
		onlyFirst?: boolean;
	}

	/**
	 * Renders schema.
	 *
	 * @param props The props.
	 *
	 * @returns The schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		let values = getInnerBlocksAttributes( props.clientId, this.options.blocks );

		if ( this.options.onlyFirst === true ) {
			values = values.slice( 0, 1 );
		}

		const html = values.map( ( { value } ) => value ).join( " " );

		return stripTags( html, this.options.allowedTags );
	}
}

SchemaInstruction.register( "inner-blocks-attribute", InnerBlocksAttribute );
