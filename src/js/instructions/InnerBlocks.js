import { createElement } from "@wordpress/element";
import { InnerBlocks as WordPressInnerBlocks } from '@wordpress/block-editor';

import Instruction from "../classes/Instruction";

class InnerBlocks extends Instruction {
	render( mode ) {
		if ( mode === 'edit' ) {
			const attributes = {};

			if ( this.options.appender === 'button' ) {
				attributes.renderAppender = () => createElement( WordPressInnerBlocks.ButtonBlockerAppender );
			}
			if ( this.options.appender === 'default' ) {
				attributes.renderAppender = () => createElement( WordPressInnerBlocks.DefaultBlockAppender );
			}
			if ( this.options.allowedBlocks ) {
				attributes.allowedBlocks = this.options.allowedBlocks;
			}

			return createElement( WordPressInnerBlocks, attributes );
		}

		return createElement( WordPressInnerBlocks.Content );
	} 
}

Instruction.register( 'inner-blocks', InnerBlocks );
