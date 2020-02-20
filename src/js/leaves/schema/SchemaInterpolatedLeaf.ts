import SchemaLeaf from "../core/SchemaLeaf";
import SchemaInstruction from "../core/SchemaInstruction";

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
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	render( attributes: Record<string, unknown> ): string {
		return this.values.map( value => {
			if ( typeof value === "string" ) {
				return value;
			}
			return value.render( attributes ) as string;
		} ).join( "" );
	}
}
