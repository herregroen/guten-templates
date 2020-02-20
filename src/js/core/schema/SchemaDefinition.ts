import SchemaInstruction from "./SchemaInstruction";
import SchemaLeaf from "./SchemaLeaf";

export type SchemaPrimitive = string | number | boolean;
export type SchemaValue = SchemaPrimitive | SchemaObject | SchemaArray;
export type SchemaObject = { [member: string]: SchemaValue };
export type SchemaArray = SchemaValue[];

/**
 * Schema definition class
 */
export default class SchemaDefinition {
	public separator: string;
	public template: string;
	public instructions: SchemaInstruction[];
	public tree: SchemaLeaf;

	/**
	 * Creates a block definition.
	 *
	 * @param separator    The separator used.
	 * @param template     The template.
	 * @param instructions The parsed instructions.
	 * @param tree         The parsed leaves.
	 */
	constructor(
		separator: string,
		template = "",
		instructions: SchemaInstruction[] = [],
		tree: SchemaLeaf = null,
	) {
		this.separator = separator;
		this.template = template;
		this.instructions = instructions;
		this.tree = tree;
	}

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
