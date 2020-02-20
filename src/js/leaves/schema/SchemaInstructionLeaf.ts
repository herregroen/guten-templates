import SchemaLeaf from "../core/SchemaLeaf";
import { SchemaValue } from "../core/SchemaDefinition";
import SchemaInstruction from "../core/SchemaInstruction";

/**
 * SchemaInstructionLeaf class
 */
export default class SchemaInstructionLeaf extends SchemaLeaf {
	public instruction: SchemaInstruction;

	/**
     * Constructs a schema instruction leaf.
     *
     * @param instruction The instruction.
     */
	public constructor( instruction: SchemaInstruction ) {
		super();
		this.instruction = instruction;
	}

	/**
	 * Renders a schema leaf.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The rendered schema.
	 */
	render( attributes: Record<string, unknown> ): SchemaValue {
		return this.instruction.render( attributes );
	}
}
