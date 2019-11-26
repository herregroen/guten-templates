/**
 * Generates a random separator of a given length.
 * 
 * @param {int} length The length.
 * 
 * @returns {string} The separator.
 */
export function generateSeparator( length ) {
	const chars = [ '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']' ];

	let output = '';

	for ( let i = 0; i < length; i++ ) {
		output += chars[ Math.floor( Math.random() * chars.length ) ];
	}

	return output;
}

/**
 * Generates a unique separator for a given text. 
 * 
 * @param {string} text The text.
 * 
 * @returns {string} The separator.
 */
export function generateUniqueSeparator( text ) {
	let length = 2;

	while ( true ) {
		const separator = generateSeparator( Math.floor( length ) );
		if ( ! text.includes( separator ) ) {
			return separator;
		}
		length += 0.2;
	}
}