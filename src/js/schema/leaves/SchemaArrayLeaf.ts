import SchemaLeaf from "../core/SchemaLeaf";
import { SchemaArray } from "../core/SchemaDefinition";

/**
 * SchemaArrayLeaf class
 */
export default class SchemaArrayLeaf extends SchemaLeaf {
	public array: SchemaLeaf[];

	/**
     * Constructs a schema array leaf.
     *
     * @param array The array.
     */
	public constructor( array: SchemaLeaf[] ) {
		super();
		this.array = array;
	}

	/**
	 * Renders a schema leaf.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	render( attributes: Record<string, unknown> ): SchemaArray {
		return this.array.map( leaf => leaf.render( attributes ) );
	}
}
