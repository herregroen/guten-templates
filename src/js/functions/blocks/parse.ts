import { flatMap } from "lodash";

import BlockLeaf from "../core/BlockLeaf";
import BlockDefinition from "../core/BlockDefinition";
import BlockInstructionLeaf from "../leaves/BlockInstructionLeaf";
import BlockTextLeaf from "../leaves/BlockTextLeaf";
import BlockElementLeaf from "../leaves/BlockElementLeaf";
import { AllHTMLAttributes } from "@wordpress/element";

/**
 * Parses text into leaves.
 *
 * @param text       The text.
 * @param definition The block BlockDefinition.
 *
 * @returns The parsed leaves.
 */
function parseText( text: string, { separator, instructions }: BlockDefinition ): BlockLeaf[] {
	const parts = text.split( separator );

	return parts
		.map( ( value, i ) => ( i % 2 ) ?  new BlockInstructionLeaf( instructions[ parseInt( value, 10 ) ] ) : new BlockTextLeaf( value ) )
		.filter( leaf => ! ( leaf instanceof BlockTextLeaf && leaf.value === "" ) );
}

/**
 * Parses a list of nodes.
 *
 * @param nodes      The nodes.
 * @param definition The BlockDefinition being parsed.
 *
 * @returns The nodes parsed as leaves.
 */
function parseNodes( nodes: NodeListOf<ChildNode>, definition: BlockDefinition ): BlockLeaf[] {
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
 * @param definition The BlockDefinition being parsed.
 *
 * @returns {BlockLeaf[]} The parsed leaves.
 */
function parseNode( node: ChildNode, definition: BlockDefinition ): BlockLeaf[] {
	switch ( node.nodeType ) {
		case Node.TEXT_NODE:
			return parseText( node.nodeValue, definition );
		case Node.ELEMENT_NODE: {
			const leaf = new BlockElementLeaf( node.nodeName.toLowerCase() );
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
 * Parses a BlockDefinition.
 *
 * @param definition The BlockDefinition being parsed.
 *
 * @returns The parsed BlockDefinition.
 */
export default function parse( definition: BlockDefinition ): BlockDefinition {
	const parser = new DOMParser();
	const doc    = parser.parseFromString( definition.template, "text/html" );

	definition.tree = parseNodes( doc.body.childNodes, definition );

	return definition;
}
