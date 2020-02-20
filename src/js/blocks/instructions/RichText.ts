import { createElement } from "@wordpress/element";
import { RichText as WordPressRichText } from "@wordpress/block-editor";

import Instruction from "../core/Instruction";
import { RenderSaveProps, RenderEditProps } from "../core/Definition";
import Leaf from "../core/Leaf";
import { BlockEditProps } from "@wordpress/blocks";

interface RichTextSaveProps extends WordPressRichText.ContentProps<keyof HTMLElementTagNameMap> {
	"data-id": string;
}

interface RichTextEditProps extends WordPressRichText.Props<keyof HTMLElementTagNameMap> {
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
	 * Renders saving the rich text.
	 *
	 * @param props The render props.
	 * @param leaf  The leaf being rendered.
	 * @param i     The number child this is.
	 *
	 * @returns The RichText element.
	 */
	save( props: RenderSaveProps, leaf: Leaf, i: number ) {
		return createElement( WordPressRichText.Content, this.getBaseAttributes( props, i ) as RichTextSaveProps );
	}

	/**
	 * Renders editing the rich text.
	 *
	 * @param props The render props.
	 * @param leaf  The leaf being rendered.
	 * @param i     The number child this is.
	 *
	 * @returns The RichText element.
	 */
	edit( props: RenderEditProps, leaf: Leaf, i: number ) {
		const attributes = this.getBaseAttributes( props, i ) as RichTextEditProps;
		attributes.onChange = ( value ) => ( props as BlockEditProps<Record<string, unknown>> ).setAttributes( { [ this.options.name ]: value } );
		if ( this.options.placeholder ) {
			attributes.placeholder = this.options.placeholder;
		}

		return createElement( WordPressRichText, attributes );
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

	/**
	 * Gets the base attributes of the rich text.
	 *
	 * @param props The props.
	 * @param i     The number child this is.
	 *
	 * @returns The base attributes.
	 */
	private getBaseAttributes( props: RenderSaveProps | RenderEditProps, i: number ): RichTextSaveProps | RichTextEditProps {
		const attributes: RichTextSaveProps | RichTextEditProps = {
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

		return attributes;
	}
}

Instruction.register( "rich-text", RichText );
