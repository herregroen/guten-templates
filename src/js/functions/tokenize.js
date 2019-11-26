const Tokenizr = require( "tokenizr" );

const lexer = new Tokenizr();

lexer.rule( "default", /(.*?)({{[a-zA-Z\-]+|$)/, ( ctx, matches ) => {
	if ( matches[ 1 ] && matches[ 1 ].length > 0 ) {
		ctx.accept( "constant", matches[ 1 ] );
	}

	if ( matches[ 2 ] && matches[ 2 ].slice( 0, 2 ) === '{{' ) {
		ctx.state( "definition" );
		ctx.accept( "definition", matches[ 2 ].slice( 2 ) );
	}
} );

lexer.rule( "definition", /\s*}}/, ( ctx ) => {
	ctx.untag( "undefined" );
	ctx.state( "default" );
	ctx.ignore();
} );

// Options object key
lexer.rule( "definition", /\s*([a-zA-Z][a-zA-Z0-9-_]*)=/, ( ctx, matches ) => {
	ctx.accept( "key", matches[ 1 ] );
	ctx.state( "definition-value" );
} );

// Open array
lexer.rule( "definition-value", /\s*\[/, ( ctx ) => {
	ctx.tag( "array" );
	ctx.accept( "array-open" );
} );

// Close array
lexer.rule( "definition-value #array", /\s*]/, ( ctx ) => {
	ctx.untag( "array" );
	ctx.accept( "array-close" );
	ctx.state( "definition" );
} );

// Comma in array
lexer.rule( "definition-value #array", /\s*,/, ( ctx ) => {
	ctx.ignore();
} );

// Number values
lexer.rule( "definition-value", /\s*(\d+)/, ( ctx, matches ) => {
	ctx.accept( "value", parseInt( matches[ 1 ], 10 ) );
	if ( ! ctx.tagged( "array" ) ) {
		ctx.state( "definition" );
	}
} );

// Boolean values
lexer.rule( "definition-value", /\s*(true|false)/, ( ctx, matches ) => {
	ctx.accept( "value", matches[ 1 ] === "true" );
	if ( ! ctx.tagged( "array" ) ) {
		ctx.state( "definition" );
	}
} );

// String values
lexer.rule( "definition-value", /\s*"([^"\\]+|\\.)*"/, ( ctx, matches ) => {
	ctx.accept( "value", matches[ 1 ] );
	if ( ! ctx.tagged( "array" ) ) {
		ctx.state( "definition" );
	}
} );

/**
 * Tokenizes a given text.
 * 
 * @param {string} text The text.
 * 
 * @returns {{type: string, value: string}[]} An array of tokens.
 */
export default function tokenize( text ) {
	lexer.reset();
	lexer.input( text );
	return lexer.tokens();
}
