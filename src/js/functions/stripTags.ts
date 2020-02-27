/**
 * Strips tags from HTML nodes.
 *
 * @param nodes The nodes.
 * @param allowedTags The allowed tags.
 */
function stripTagsFromNodes( nodes: NodeListOf<ChildNode>, allowedTags: string[] ) {
	nodes.forEach( node => {
		if ( node.nodeType !== Node.ELEMENT_NODE ) {
			return;
		}
		const tag = node.nodeName.toLowerCase();
		if ( tag === "script" || tag === "style" ) {
			node.remove();
			return;
		}
		stripTagsFromNodes( node.childNodes, allowedTags );
		if ( allowedTags.includes( tag ) ) {
			return;
		}
		node.replaceWith( ...Array.from( node.childNodes ) );
	} );
}

/**
 * Strips tags from HTML.
 *
 * @param html The HTML.
 * @param allowedTags Optional. The allowed tags.
 *
 * @returns The stripped HTML.
 */
export default function stripTags( html: string, allowedTags: string[] = [] ): string {
	const parser = new DOMParser();
	const document = parser.parseFromString( html, "text/html" );

	stripTagsFromNodes( document.body.childNodes, allowedTags );

	return document.body.innerHTML;
}
