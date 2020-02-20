import SchemaLeaf from "../core/SchemaLeaf";
import { SchemaPrimitive } from "../core/SchemaDefinition";

/**
 * SchemaConstantLeaf class
 */
export default class SchemaConstantLeaf extends SchemaLeaf {
	public constant: SchemaPrimitive;

	/**
     * Constructs a schema constant leaf.
     *
     * @param constant The constant.
     */
	public constructor( constant: SchemaPrimitive ) {
		super();
		this.constant = constant;
	}

	/**
	 * Renders a schema leaf.
	 *
	 * @returns The rendered schema.
	 */
	render(): SchemaPrimitive {
		return this.constant;
	}
}
