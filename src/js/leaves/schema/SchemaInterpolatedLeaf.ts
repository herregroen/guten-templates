import SchemaLeaf from "../../core/schema/SchemaLeaf";
import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";

/**
 * SchemaInterpolatedLeaf class
 */
export default class SchemaInterpolatedLeaf extends SchemaLeaf {
	public values: Array<string | SchemaInstruction>;

	/**
     * Constructs a schema interpolated leaf.
     *
     * @param values The values.
     */
	public constructor( values: Array<string | SchemaInstruction> ) {
		super();
		this.values = values;
	}

	/**
	 * Renders a schema leaf.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	render( props: RenderSaveProps ): string {
		return this.values.map( value => {
			if ( typeof value === "string" ) {
				return value;
			}
			return value.render( props ) as string;
		} ).join( "" );
	}
}
