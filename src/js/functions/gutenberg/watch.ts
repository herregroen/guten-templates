import { subscribe, select, dispatch } from "@wordpress/data";
import { schemaDefinitions } from "../../core/schema/SchemaDefinition";
import { BlockInstance } from "@wordpress/blocks";

let updatingSchema = false;
let previousBlocks: BlockInstance[];

/**
 * Generates schema for blocks.
 *
 * @param blocks The blocks.
 */
function generateSchemaForBlocks( blocks: BlockInstance[] ) {
	for ( const block of blocks ) {
		const definition = schemaDefinitions[ block.name ];
		if ( definition && ! definition.onlyNested() ) {
			const schema = definition.render( block );
			dispatch( "core/block-editor" ).updateBlockAttributes( block.clientId, { "yoast-schema": schema } );
			continue;
		}
		if ( Array.isArray( block.innerBlocks ) ) {
			generateSchemaForBlocks( block.innerBlocks );
		}
	}
}

/**
 * Watches Gutenberg for relevant changes.
 */
export default function watch() {
	subscribe( () => {
		if ( updatingSchema ) {
			return;
		}

		const blocks = select( "core/block-editor" ).getBlocks();

		if ( blocks === previousBlocks ) {
			return;
		}

		updatingSchema = true;
		generateSchemaForBlocks( blocks );
		previousBlocks = blocks;
		updatingSchema = false;
	} );
}
