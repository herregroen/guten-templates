import Instruction from "./Instruction";
import { createElement } from "@wordpress/element";

const attributeMap = { class: "className", for: "htmlFor" };

export default class Leaf {
	constructor( type, props ) {
		Object.assign( this, props );
		this.type = type;
	}

	render( mode, props, i ) {
		switch ( this.type ) {
			case Leaf.TYPE_TEXT:
				return this.value;
			case Leaf.TYPE_ELEMENT:
				const attributes = {};
				for ( const key in this.attributes ) {
					attributes[ attributeMap[ key ] || key ] = this.attributes[ key ]
						.map( ( leaf, i ) => leaf.render( mode, props, i ) ).join( '' );
				}
				if ( mode === "edit" && [ "button", "a" ].includes( this.tag ) ) {
					attributes.onClick = e => e.preventDefault() && false;
				}

				this.rendered = createElement( this.tag, attributes, this.children && this.children.map( ( child, i ) => child.render( mode, props, i ) ) );
				return this.rendered;
			case Leaf.TYPE_INSTRUCTION:
				return this.instruction.render( mode, props, this, i );
			default:
				return null;
		}
	}

	static get TYPE_TEXT() {
		return 'text';
	}

	static Text( props ) {
		return new Leaf( Leaf.TYPE_TEXT, props );
	}

	static get TYPE_INSTRUCTION() {
		return 'instruction';
	}

	static Instruction( props ) {
		return new Leaf( Leaf.TYPE_INSTRUCTION, props );
	}

	static get TYPE_ELEMENT() {
		return 'element';
	}

	static Element( props ) {
		return new Leaf( Leaf.TYPE_ELEMENT, props );
	}
}