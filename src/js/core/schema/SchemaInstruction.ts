import { SchemaValue, SchemaDefinitionConfiguration } from "./SchemaDefinition";
import Instruction, { InstructionOptions } from "../Instruction";
import { RenderSaveProps } from "../blocks/BlockDefinition";

export type SchemaInstructionClass = { new( id: number, options: InstructionOptions ): SchemaInstruction };

/**
 * SchemaInstruction class.
 */
export default abstract class SchemaInstruction extends Instruction {
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/**
	 * Renders schema.
	 *
	 * @param props The props.
	 *
	 * @returns The schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		return null;
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */

	/**
	 * Returns the schema definition configuration.
	 *
	 * @returns The configuration.
	 */
	configuration(): Partial<SchemaDefinitionConfiguration> {
		return {};
	}
}
