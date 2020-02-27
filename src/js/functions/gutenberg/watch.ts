import { isEqual } from "lodash";
import { subscribe, select, dispatch } from "@wordpress/data";

import { schemaDefinitions } from "../../core/schema/SchemaDefinition";
import { BlockInstance } from "@wordpress/blocks";

let updatingSchema = false;
let previousRootBlocks: BlockInstance[];

/**
 * Generates schema for blocks.
 *
 * @param blocks         The blocks.
 * @param previousBlocks Optional. The previous blocks used for schema generation.
 */
function generateSchemaForBlocks( blocks: BlockInstance[], previousBlocks: BlockInstance[] = [] ) {
	for ( let i = 0; i < blocks.length; i++ ) {
		const block = blocks[ i ];
		const previousBlock = previousBlocks[ i ];

		if ( block === previousBlock ) {
			continue;
		}

		const definition = schemaDefinitions[ block.name ];
		if ( definition && ! definition.onlyNested() ) {
			const schema = definition.render( block );

			if ( isEqual( schema, block.attributes[ "yoast-schema" ] ) ) {
				continue;
			}

			dispatch( "core/block-editor" ).updateBlockAttributes( block.clientId, { "yoast-schema": schema } );
			continue;
		}
		if ( Array.isArray( block.innerBlocks ) ) {
			generateSchemaForBlocks( block.innerBlocks, previousBlock.innerBlocks );
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

		const rootBlocks = select( "core/block-editor" ).getBlocks();

		if ( rootBlocks === previousRootBlocks ) {
			return;
		}

		updatingSchema = true;
		generateSchemaForBlocks( rootBlocks, previousRootBlocks );
		previousRootBlocks = rootBlocks;
		updatingSchema = false;
	} );
}
