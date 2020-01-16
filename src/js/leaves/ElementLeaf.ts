import Leaf from "../core/Leaf";
import { RenderMode, RenderProps } from "../core/Definition";
import { createElement, HTMLAttributes } from "@wordpress/element";

const attributeMap: Record<string, string> = { "class": "className", "for": "htmlFor" };

/**
 * ElementLeaf class.
 */
export default class ElementLeaf extends Leaf {
	public tag: string;
	public attributes: Record<string, Leaf[]>;
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
     * Renders this element leaf.
     *
     * @param mode  The render mode.
     * @param props The render props.
     *
     * @returns The rendered element.
     */
	render( mode: RenderMode, props: RenderProps ): JSX.Element {
		const attributes: HTMLAttributes<unknown> = {};
		for ( const key in this.attributes ) {
			if ( ! Object.prototype.hasOwnProperty.call( attributes, key ) ) {
				continue;
			}

			attributes[ attributeMap[ key ] || key ] = this.attributes[ key ]
				.map( ( leaf, i ) => leaf.render( mode, props, i ) ).join( "" );
		}
		if ( mode === "edit" && [ "button", "a" ].includes( this.tag ) ) {
			attributes.onClick = e => {
				e.preventDefault();
				return false;
			};
		}

		return createElement( this.tag, attributes, this.children && this.children.map( ( child, i ) => child.render( mode, props, i ) ) );
	}
}
