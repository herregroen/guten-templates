import Leaf from "../core/Leaf";
import { RenderEditProps, RenderSaveProps } from "../core/Definition";
import { createElement, AllHTMLAttributes } from "@wordpress/element";

const attributeMap: Record<string, keyof AllHTMLAttributes<unknown>> = { "class": "className", "for": "htmlFor" };

/**
 * ElementLeaf class.
 */
export default class ElementLeaf extends Leaf {
	public tag: string;
	public attributes: Record<keyof AllHTMLAttributes<unknown>, Leaf[]>;
	public children: Leaf[];

	/**
     * Creates an element leaf.
     *
     * @param tag        The tag.
     * @param attributes The attributes.
     * @param children   The children.
     */
	constructor(
		tag: string,
		attributes: Record<string, Leaf[]> = {},
		children: Leaf[] = [],
	) {
		super();
		this.tag        = tag;
		this.attributes = attributes;
		this.children   = children;
	}

	/**
	 * Renders editing a leaf.
	 *
	 * @param props The render props.
	 * @param i     The number child this leaf is.
	 *
	 * @returns The rendered element.
	 */
	save( props: RenderSaveProps ): JSX.Element {
		const attributes: AllHTMLAttributes<unknown> = {};
		for ( const key in this.attributes ) {
			if ( ! Object.prototype.hasOwnProperty.call( attributes, key ) ) {
				continue;
			}

			const fixedKey = attributeMap[ key ] || key as keyof AllHTMLAttributes<unknown>;
			attributes[ fixedKey ] = this.attributes[ key as keyof AllHTMLAttributes<unknown> ]
				.map( ( leaf, i ) => leaf.save( props, i ) ).join( "" ) as never;
		}

		return createElement( this.tag, attributes, this.children && this.children.map( ( child, i ) => child.save( props, i ) ) );
	}

	/**
	 * Renders saving a leaf.
	 *
	 * @param props The render props.
	 * @param i     The number child this leaf is.
	 *
	 * @returns The rendered element.
	 */
	edit( props: RenderEditProps ): JSX.Element {
		const attributes: AllHTMLAttributes<unknown> = {};
		for ( const key in this.attributes ) {
			if ( ! Object.prototype.hasOwnProperty.call( attributes, key ) ) {
				continue;
			}

			const fixedKey = attributeMap[ key ] || key as keyof AllHTMLAttributes<unknown>;
			attributes[ fixedKey ] = this.attributes[ key as keyof AllHTMLAttributes<unknown> ]
				.map( ( leaf, i ) => leaf.edit( props, i ) ).join( "" ) as never;
		}
		if ( [ "button", "a" ].indexOf( this.tag ) !== -1 ) {
			attributes.onClick = e => {
				e.preventDefault();
				return false;
			};
		}

		return createElement( this.tag, attributes, this.children && this.children.map( ( child, i ) => child.edit( props, i ) ) );
	}
}
