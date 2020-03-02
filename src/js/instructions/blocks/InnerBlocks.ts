import { createElement, ComponentClass } from "@wordpress/element";
import { InnerBlocks as WordPressInnerBlocks } from "@wordpress/block-editor";

import BlockInstruction from "../../core/blocks/BlockInstruction";

/**
 * InnerBlocks instruction
 */
class InnerBlocks extends BlockInstruction {
	public options: {
		allowedBlocks: string[];
		appender: string;
	};

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
			attributes.renderAppender = () => {
				// The type definition of InnerBlocks are wrong so cast to fix them.
				return createElement( ( WordPressInnerBlocks as unknown as { ButtonBlockAppender: ComponentClass } ).ButtonBlockAppender );
			};
		}
		if ( this.options.appender === "default" ) {
			attributes.renderAppender = () => createElement( WordPressInnerBlocks.DefaultBlockAppender );
		}
		if ( this.options.allowedBlocks ) {
			attributes.allowedBlocks = this.options.allowedBlocks;
		}

		return createElement( WordPressInnerBlocks, attributes );
	}
}

BlockInstruction.register( "inner-blocks", InnerBlocks );
