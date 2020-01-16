/**
 * Generates a random separator of a given length.
 *
 * @param length The length.
 *
 * @returns The separator.
 */
export function generateSeparator( length: number ): string {
	const chars = [ "@", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", "[", "]" ];

	let output = "";

	for ( let i = 0; i < length; i++ ) {
		output += chars[ Math.floor( Math.random() * chars.length ) ];
	}

	return output;
}

/**
 * Generates a unique separator for a given text.
 *
 * @param text The text.
 *
 * @returns The separator.
 */
export function generateUniqueSeparator( text: string ): string {
	let length = 2;

	while ( true ) {
		const separator = generateSeparator( Math.floor( length ) );
		if ( ! text.includes( separator ) ) {
			return separator;
		}
		length += 0.2;
	}
}
