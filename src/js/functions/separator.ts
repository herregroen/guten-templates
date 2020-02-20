/**
 * Generates a random separator of a given length.
 *
 * @param length The length.
 * @param numerical Whether or not the separator should be numerical.
 *
 * @returns The separator.
 */
export function generateSeparator( length: number, numerical = false ): string {
	const chars   = numerical
		? [ "@", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", "[", "]" ]
		: [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];

	let output = "";

	for ( let i = 0; i < length; i++ ) {
		output += chars[ Math.floor( Math.random() * chars.length ) ];
	}

	return output;
}

export function generateUniqueSeparator( text: string ): string;
export function generateUniqueSeparator( text: string, numerical: false ): string;
export function generateUniqueSeparator( text: string, numerical: true ): number;
/**
 * Generates a unique separator for a given text.
 *
 * @param text The text.
 * @param numerical Whether or not the separator should be numerical.
 *
 * @returns The separator.
 */
export function generateUniqueSeparator( text: string, numerical = false ) {
	let length = 2;

	while ( true ) {
		const separator = generateSeparator( Math.floor( length ), numerical );
		if ( text.indexOf( separator ) === -1 ) {
			return numerical ? parseInt( separator, 10 ) : separator;
		}
		length += 0.2;
	}
}
