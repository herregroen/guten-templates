import { flatMap } from "lodash";

import Leaf from "../core/Leaf";
import Definition from "../core/Definition";
import InstructionLeaf from "../leaves/InstructionLeaf";
import TextLeaf from "../leaves/TextLeaf";
import ElementLeaf from "../leaves/ElementLeaf";
import { AllHTMLAttributes } from "@wordpress/element";

/**
 * Parses text into leaves.
 *
 * @param text       The text.
 * @param definition The block definition.
 *
 * @returns The parsed leaves.
 */
export function parseText( text: string, { separator, instructions }: Definition ): Leaf[] {
	const parts = text.split( separator );

	return parts
		.map( ( value, i ) => ( i % 2 ) ?  new InstructionLeaf( instructions[ parseInt( value, 10 ) ] ) : new TextLeaf( value ) )
		.filter( leaf => ! ( leaf instanceof TextLeaf && leaf.value === "" ) );
}

/**
 * Parses a list of nodes.
 *
 * @param nodes      The nodes.
 * @param definition The definition being parsed.
 *
 * @returns The nodes parsed as leaves.
 */
function parseNodes( nodes: NodeListOf<ChildNode>, definition: Definition ): Leaf[] {
	const parsed = flatMap( nodes, node => parseNode( node, definition ) );
	if ( parsed.length === 0 ) {
		return null;
	}
	return parsed;
}

/**
 * Parses a node.
 *
 * @param node       The node to be parsed.
 * @param definition The definition being parsed.
 *
 * @returns {Leaf[]} The parsed leaves.
 */
function parseNode( node: ChildNode, definition: Definition ): Leaf[] {
	switch ( node.nodeType ) {
		case Node.TEXT_NODE:
			return parseText( node.nodeValue, definition );
		case Node.ELEMENT_NODE: {
			const leaf = new ElementLeaf( node.nodeName.toLowerCase() );
			for ( let i = 0; i < ( node as Element ).attributes.length; i++ ) {
				const attribute = ( node as Element ).attributes[ i ];
				leaf.attributes[ attribute.name as keyof AllHTMLAttributes<unknown> ] = parseText( attribute.value, definition );
			}
			leaf.children = parseNodes( node.childNodes, definition );
			if ( leaf.children ) {
				leaf.children.forEach( child => {
					child.parent = leaf;
				} );
			}
			return [ leaf ];
		}
	}

	return [];
}

/**
 * Parses a definition.
 *
 * @param definition The definition being parsed.
 *
 * @returns The parsed definition.
 */
export default function parse( definition: Definition ): Definition {
	const parser = new DOMParser();
	const doc    = parser.parseFromString( definition.template, "text/html" );

	definition.tree = parseNodes( doc.body.childNodes, definition );

	return definition;
}
