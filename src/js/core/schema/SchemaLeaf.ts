import { SchemaValue } from "./SchemaDefinition";
import Leaf from "../Leaf";
import { RenderSaveProps } from "../blocks/BlockDefinition";

/**
 * Leaf class
 */
export default abstract class SchemaLeaf extends Leaf {
	parent: SchemaLeaf;

	/**
	 * Renders a schema leaf.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	abstract render( props: RenderSaveProps ): SchemaValue
}
