import { SchemaValue } from "./SchemaDefinition";

/**
 * Leaf class
 */
export default abstract class SchemaLeaf {
	/**
	 * Renders a schema leaf.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	abstract render( attributes: Record<string, unknown> ): SchemaValue
}
