import SchemaLeaf from "../../core/schema/SchemaLeaf";
import { SchemaValue } from "../../core/schema/SchemaDefinition";
import SchemaInstruction from "../../core/schema/SchemaInstruction";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";

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
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		return this.instruction.render( props );
	}
}
