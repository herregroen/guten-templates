import Leaf from '../classes/Leaf';

/**
 * Parses text into leaves.
 * 
 * @param {string}     text       The text. 
 * @param {Definition} definition The block definition.
 * 
 * @returns {Leaf[]} The parsed leaves. 
 */
function parseText( text, { separator, instructions } ) {
	const parts = text.split( separator );

	return parts
		.map( ( value, i ) => ( i % 2 ) ?  Leaf.Instruction( { instruction: instructions[ value ] } ) : Leaf.Text( { value } ) )
		.filter( leaf => ! ( leaf.type === Leaf.TYPE_TEXT && leaf.value === '' ) );
}

/**
 * 
 * @param {Node} node 
 * @param {Definition} definition 
 * 
 * @returns {Leaf[]} The parsed leaves.
 */
function parseNode( node, definition ) {
	switch ( node.nodeType ) {
		case 3: // TEXT_NODE
			return parseText( node.nodeValue, definition );
		case 1: // ELEMENT_NODE
			const leaf = Leaf.Element( {tag: node.nodeName.toLowerCase(), attributes: {} } );
			for ( let i = 0; i < node.attributes.length; i++ ) {
				const attribute = node.attributes[ i ];
				leaf.attributes[ attribute.name ] = parseText( attribute.value, definition );
			}
			leaf.children = parseNodes( node.childNodes, definition );
			if ( leaf.children ) {
				leaf.children.forEach( child => child.parent = leaf );
			}
			return leaf;
	}

	return [];
}

function parseNodes( nodes, definition ) {
	const parsed = Array.prototype.flatMap.call( nodes, node => parseNode( node, definition ) );
	if ( parsed.length === 0 ) {
		return null;
	}
	return parsed;
}

export default function parse( definition ) {
	const parser = new DOMParser();
	const doc    = parser.parseFromString( definition.template, "text/html");

	definition.tree = parseNodes( doc.body.childNodes, definition );

	return definition;
}