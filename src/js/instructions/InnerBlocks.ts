import { createElement, ReactElement } from "@wordpress/element";
import { InnerBlocks as WordPressInnerBlocks } from "@wordpress/block-editor";

import Instruction from "../core/Instruction";
import { RenderMode } from "../core/Definition";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends Instruction {
	/**
	 * Renders the instruction.
	 *
	 * @param mode The render mode.
	 *
	 * @returns The inner blocks.
	 */
	render( mode: RenderMode ): ReactElement {
		if ( mode === "edit" ) {
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

		return createElement( WordPressInnerBlocks.Content );
	}
}

Instruction.register( "inner-blocks", InnerBlocks );
