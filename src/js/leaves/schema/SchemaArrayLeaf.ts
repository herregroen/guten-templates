import SchemaLeaf from "../../core/schema/SchemaLeaf";
import { SchemaArray } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";

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
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	render( props: RenderSaveProps ): SchemaArray {
		return this.array.map( leaf => leaf.render( props ) );
	}
}
