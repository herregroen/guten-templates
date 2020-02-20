import { createElement } from "@wordpress/element";
import { InnerBlocks as WordPressInnerBlocks } from "@wordpress/block-editor";

import Instruction from "../core/Instruction";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends Instruction {
	/**
	 * Renders saving the instruction.
	 *
	 *
	 * @returns The inner blocks.
	 */
	save(): JSX.Element {
		return createElement( WordPressInnerBlocks.Content );
	}

	/**
	 * Renders editing the instruction.
	 *
	 *
	 * @returns The inner blocks.
	 */
	edit(): JSX.Element {
		const attributes: WordPressInnerBlocks.Props = {};

		if ( this.options.appender === "button" ) {
			attributes.renderAppender = () => createElement( WordPressInnerBlocks.ButtonBlockerAppender );
		}
		if ( this.options.appender === "default" ) {
			attributes.renderAppender = () => createElement( WordPressInnerBlocks.DefaultBlockAppender );
		}
		if ( this.options.allowedBlocks ) {
			attributes.allowedBlocks = this.options.allowedBlocks as string[];
		}

		return createElement( WordPressInnerBlocks, attributes );
	}
}

Instruction.register( "inner-blocks", InnerBlocks );
