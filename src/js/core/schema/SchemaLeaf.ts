import { SchemaValue } from "./SchemaDefinition";
import Leaf from "../Leaf";

/**
 * Leaf class
 */
export default abstract class SchemaLeaf extends Leaf {
	parent: SchemaLeaf;

	/**
	 * Renders a schema leaf.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	abstract render( attributes: Record<string, unknown> ): SchemaValue
}
