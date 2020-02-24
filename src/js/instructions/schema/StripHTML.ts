import { SchemaValue } from "../../core/schema/SchemaDefinition";
import { RenderSaveProps } from "../../core/blocks/BlockDefinition";
import SchemaInstruction from "../../core/schema/SchemaInstruction";
import stripTags from "../../functions/stripTags";

/**
 * SchemaInstruction class.
 */
export default class StripHTML extends SchemaInstruction {
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
		const html        = props.attributes[ this.options.name ] as string || this.options.default;
		const allowedTags = this.options.allowedTags || [];

		return stripTags( html, allowedTags );
	}
}

SchemaInstruction.register( "strip-html", StripHTML );
