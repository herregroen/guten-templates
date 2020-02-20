import { SchemaValue } from "./SchemaDefinition";
import Instruction, { InstructionOptions } from "../Instruction";

export type SchemaInstructionClass = { new( id: number, options: InstructionOptions ): SchemaInstruction };

/**
 * SchemaInstruction class.
 */
export default abstract class SchemaInstruction extends Instruction {
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/**
	 * Renders schema.
	 *
	 * @param attributes The attributes.
	 *
	 * @returns The schema.
	 */
	render( attributes: Record<string, unknown> ): SchemaValue {
		return null;
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */
}
