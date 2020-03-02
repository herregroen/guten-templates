import "./instructions";
import process from "./functions/process";
import SchemaDefinition from "./core/schema/SchemaDefinition";
import SchemaInstruction from "./core/schema/SchemaInstruction";
import BlockDefinition from "./core/blocks/BlockDefinition";
import BlockInstruction from "./core/blocks/BlockInstruction";
import watch from "./functions/gutenberg/watch";

jQuery( 'script[type="text/guten-template"]' ).each( function() {
	try {
		const template   = this.innerHTML.split( "\n" ).map( s => s.trim() ).join( "" );
		const definition = process( template, BlockDefinition, BlockInstruction );
		console.log( definition );
		definition.register();
	} catch ( e ) {
		console.error( "Failed parsing guten-template", e, this );
	}
} );
jQuery( 'script[type="text/schema-template"]' ).each( function() {
	try {
		const template   = this.innerHTML.split( "\n" ).map( s => s.trim() ).join( "" );
		const definition = process( template, SchemaDefinition, SchemaInstruction );
		definition.register();
	} catch ( e ) {
		console.error( "Failed parsing schema-template", e, this );
	}
} );

// Watch Gutenberg for block changes that require schema updates.
watch();
