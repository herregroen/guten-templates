import { mapValues } from "lodash";

import SchemaLeaf from "../../core/schema/SchemaLeaf";
import { SchemaObject } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";

/**
 * SchemaObjectLeaf class
 */
export default class SchemaObjectLeaf extends SchemaLeaf {
	public object: Record<string, SchemaLeaf>;

	/**
     * Constructs a schema object leaf.
     *
     * @param object The object.
     */
	public constructor( object: Record<string, SchemaLeaf> ) {
		super();
		this.object = object;
	}

	/**
	 * Renders a schema leaf.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	render( props: RenderSaveProps ): SchemaObject {
		return mapValues( this.object, leaf => leaf.render( props ) );
	}
}
