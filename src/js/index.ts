import "./instructions";
import process from "./functions/process";
import BlockDefinition from "./core/blocks/BlockDefinition";
import BlockInstruction from "./core/blocks/BlockInstruction";
import SchemaDefinition from "./core/schema/SchemaDefinition";
import SchemaInstruction from "./core/schema/SchemaInstruction";

// Const template = `
// <?block name="my/block" category="whatever" ?>
// <div class="whatever">
//     <?rich-text tag="p" name="content" ?>
//     <div class="<?field array=[1,2,3] name="imageWrapperClass" type="text" label="Mooi" bool=false other=true ?>">TEST!</div>
// </div>
// <span class="<?post-meta name="bla" ?>"></span>
// `.split( "\n" ).map( s => s.trim() ).join( "" );

jQuery( 'script[type="text/guten-template"]' ).each( function() {
	try {
		const template   = this.innerHTML.split( "\n" ).map( s => s.trim() ).join( "" );
		const definition = process( template, BlockDefinition, BlockInstruction );
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
