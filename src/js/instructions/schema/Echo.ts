import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";
import SchemaInstruction from "../../core/schema/SchemaInstruction";

/**
 * SchemaInstruction class.
 */
export default class Echo extends SchemaInstruction {
	public options: {
		name: string;
		default?: string;
	}

	/**
	 * Renders schema.
	 *
	 * @param props The props.
	 *
	 * @returns The schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		return props.attributes[ this.options.name ] as string || this.options.default;
	}
}

SchemaInstruction.register( "echo", Echo );
