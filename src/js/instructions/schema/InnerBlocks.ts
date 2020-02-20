import { select } from "@wordpress/data";

import Instruction from "../../core/Instruction";
import Definition, { RenderSaveProps } from "../../core/Definition";
import { renderToString } from "@wordpress/element";
import SchemaInstruction from "../core/SchemaInstruction";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends SchemaInstruction {
	/**
	 * Renders the instruction.
	 *
     * @param props The render props.
	 *
	 * @returns The inner blocks as schema.
	 */
	save( props: RenderSaveProps ): string {
		select( "core/block-editor" ).getBlocksByClientId( props.clientId )[ 0 ].innerBlocks.map( block => {
			const schemaDefinition = Definition.registeredDefinitions.schema[ block.name ];

			if ( ! schemaDefinition ) {
				return "";
			}
			return renderToString( schemaDefinition.save( { attributes: block.attributes } ) );
		} );
	}
}

Instruction.register( "schema-inner-blocks", InnerBlocks );
