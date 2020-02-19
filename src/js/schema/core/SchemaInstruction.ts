import { SchemaValue } from "./SchemaDefinition";
import { InstructionOptions } from "../core/Instruction";

export type SchemaInstructionClass   = { new( id: number, options: InstructionOptions ): SchemaInstruction };

/**
 * SchemaInstruction class.
 */
export default abstract class SchemaInstruction {
	static registeredInstructions: Record<string, SchemaInstructionClass> = {};

	public id: number;
	public options: InstructionOptions;

	/**
	 * Creates a schema instruction.
	 *
	 * @param id      The id.
	 * @param options The options.
	 */
	constructor(
		id: number,
		options: InstructionOptions,
	) {
		this.id = id;
		this.options = options;
	}

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
