import "./instructions/RichText";
import "./instructions/Block";
import "./instructions/SidebarSelect";
import "./instructions/SidebarInput";
import "./instructions/InnerBlocks";
import tokenize from "./functions/tokenize.js";
import process from "./functions/process.js";
import parse from "./functions/parse.js";
import { generateUniqueSeparator } from "./functions/separator.js";

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
		const tokens     = tokenize( template );
		const separator  = generateUniqueSeparator( template );
		const definition = parse( process( tokens, separator ) );
		definition.register();
	} catch ( e ) {
		console.error( "Failed parsing guten-template", e, this );
	}
} );
