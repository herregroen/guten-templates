import { isEqual } from "lodash";
import { subscribe, select, dispatch } from "@wordpress/data";

import SchemaDefinition, { schemaDefinitions } from "../../core/schema/SchemaDefinition";
import { BlockInstance } from "@wordpress/blocks";

let updatingSchema = false;
let previousRootBlocks: BlockInstance[];

/**
 * Renders a block's schema and updates the attributes if it has changed.
 *
 * @param block      The block to render schema for.
 * @param definition The definition of the schema.
 */
function renderSchema( block: BlockInstance, definition: SchemaDefinition ) {
	const schema = definition.render( block );

	if ( isEqual( schema, block.attributes[ "yoast-schema" ] ) ) {
		return;
	}

	dispatch( "core/block-editor" ).updateBlockAttributes( block.clientId, { "yoast-schema": schema } );
}

/**
 * Generates schema for blocks.
 *
 * @param blocks          The blocks.
 * @param previousBlocks  Optional. The previous blocks used for schema generation.
 * @param parentHasSchema Optional. Whether or not the parent has already rendered schema.
 */
function generateSchemaForBlocks( blocks: BlockInstance[], previousBlocks: BlockInstance[] = [], parentHasSchema = false ) {
	for ( let i = 0; i < blocks.length; i++ ) {
		const block = blocks[ i ];
		const previousBlock = previousBlocks[ i ];

		if ( block === previousBlock ) {
			continue;
		}

		const definition = schemaDefinitions[ block.name ];
		let shouldRenderSchema: boolean;
		if ( parentHasSchema ) {
			// If the parent has schema only render schema if the schema needs to be separate in the graph.
			shouldRenderSchema = definition.separateInGraph();
		} else {
			// If the parent does not have schema only render schema if the schema isn't only nested.
			shouldRenderSchema = ! definition.onlyNested();
		}
		if ( definition && shouldRenderSchema ) {
			renderSchema( block, definition );
			if ( Array.isArray( block.innerBlocks ) ) {
				generateSchemaForBlocks( block.innerBlocks, previousBlock.innerBlocks, true );
			}
			continue;
		}
		if ( Array.isArray( block.innerBlocks ) ) {
			generateSchemaForBlocks( block.innerBlocks, previousBlock.innerBlocks, parentHasSchema );
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
