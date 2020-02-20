import SchemaInstruction from "./SchemaInstruction";
import SchemaLeaf from "./SchemaLeaf";
import Definition from "../Definition";

export type SchemaPrimitive = string | number | boolean;
export type SchemaValue = SchemaPrimitive | SchemaObject | SchemaArray;
export type SchemaObject = { [member: string]: SchemaValue };
export type SchemaArray = SchemaValue[];

/**
 * Schema definition class
 */
export default class SchemaDefinition extends Definition {
	public instructions: SchemaInstruction[];
	public tree: SchemaLeaf;

	/**
	 * Renders a schema definition.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	render( attributes: Record<string, unknown> ): SchemaValue {
		return this.tree.render( attributes );
	}
}
