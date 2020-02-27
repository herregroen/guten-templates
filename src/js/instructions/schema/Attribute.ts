import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";
import SchemaInstruction from "../../core/schema/SchemaInstruction";
import stripTags from "../../functions/stripTags";

/**
 * SchemaInstruction class.
 */
export default class Attribute extends SchemaInstruction {
	public options: {
		name: string;
		default?: string;
		allowedTags?: string[];
	}

	/**
	 * Renders schema.
	 *
	 * @param props The props.
	 *
	 * @returns The schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		const html = props.attributes[ this.options.name ] as string || this.options.default;
		return stripTags( html, this.options.allowedTags );
	}
}

SchemaInstruction.register( "attribute", Attribute );
