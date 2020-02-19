import { mapValues } from "lodash";

import SchemaLeaf from "../core/SchemaLeaf";
import { SchemaObject } from "../core/SchemaDefinition";

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
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	render( attributes: Record<string, unknown> ): SchemaObject {
		return mapValues( this.object, leaf => leaf.render( attributes ) );
	}
}
