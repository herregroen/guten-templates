import { createElement, FunctionComponent, ReactElement } from "@wordpress/element";
import { RichText as WordPressRichText } from "@wordpress/block-editor";

import Instruction from "../core/Instruction";
import { RenderMode, RenderProps } from "../core/Definition";
import Leaf from "../core/Leaf";
import { BlockEditProps } from "@wordpress/blocks";

interface RichTextPropsWithDataId extends WordPressRichText.ContentProps<keyof HTMLElementTagNameMap> {
	"data-id": string;
}

/**
 * RichText instruction
 */
class RichText extends Instruction {
	public options: {
		tag: keyof HTMLElementTagNameMap;
		name: string;
		class: string;
		placeholder: string;
		multiline: boolean;
	};

	/**
	 * Renders the RichText.
	 *
	 * @param mode  The render mode.
	 * @param props The render props.
	 * @param leaf  The leaf being rendered.
	 * @param i     The number child this is.
	 *
	 * @returns The RichText element.
	 */
	render( mode: RenderMode, props: RenderProps, leaf: Leaf, i: number ): ReactElement {
		let ElementClass: FunctionComponent = WordPressRichText.Content;
		const attributes: RichTextPropsWithDataId = {
			tagName: this.options.tag,
			value: props.attributes[ this.options.name ] as string,
			className: this.options.class,
			placeholder: this.options.placeholder,
			"data-id": this.options.name,
			key: i,
		};

		if ( this.options.multiline ) {
			attributes.multiline = this.options.multiline;
		}

		if ( mode === "edit" ) {
			ElementClass = WordPressRichText;
			attributes.onChange = ( value ) => ( props as BlockEditProps<Record<string, unknown>> ).setAttributes( { [ this.options.name ]: value } );
			if ( this.options.placeholder ) {
				attributes.placeholder = this.options.placeholder;
			}
		}

		return createElement( ElementClass, attributes );
	}

	/**
	 * Adds the RichText attributes to the block configuration.
	 *
	 * @returns The block configuration.
	 */
	configuration() {
		return {
			attributes: {
				[ this.options.name ]: {
					type: "string",
					source: "html",
					selector: `[data-id=${this.options.name}]`,
				},
			},
		};
	}
}

Instruction.register( "rich-text", RichText );
