import { camelCase } from "lodash";

import BlockDefinition from "../core/BlockDefinition";
import BlockInstruction from "../core/BlockInstruction";
import { IToken } from "tokenizr";

let id = 0;

/**
 * Processes an instruction.
 *
 * @param token  The current token.
 * @param tokens The remaining tokens.
 *
 * @returns The instruction.
 */
function processBlockInstruction( token: IToken<string>, tokens: IToken[] ) {
	const instruction = BlockInstruction.create( token.value, id++ );

	while ( tokens[ 0 ] && tokens[ 0 ].isA( "key" ) ) {
		const key = camelCase( ( tokens.shift() as IToken<string> ).value );
		let value;
		if ( tokens[ 0 ].isA( "array-open" ) ) {
			// Consume the array-open token.
			tokens.shift();
			value = [];
			while ( ! tokens[ 0 ].isA( "array-close" ) ) {
				value.push( tokens.shift().value );
			}
			// Consume the array-close token.
			tokens.shift();
		} else if ( tokens[ 0 ].isA( "value" ) ) {
			value = tokens.shift().value;
		}
		instruction.options[ key ] = value as string | boolean | number | Array<string> | Array<boolean> | Array<number>;
	}

	return instruction;
}

/**
 * Transforms an array of tokens into a template BlockDefinition.
 *
 * @param {array}  tokens    The tokens.
 * @param {string} separator A unique separator that isn't contained in any strings.
 *
 * @return {Definition} The template BlockDefinition.
 */
export default function process( tokens: IToken[], separator: string ) {
	const definition = new BlockDefinition( separator );

	while ( true ) {
		const token = tokens.shift();

		if ( ! token ) {
			break;
		}

		if ( token.isA( "constant" ) ) {
			definition.template += token.value;
			continue;
		}

		if ( token.isA( "definition" ) ) {
			const instruction = processBlockInstruction( token as IToken<string>, tokens );
			definition.instructions.push( instruction );
			definition.template += separator + instruction.id + separator;
		}
	}

	return definition;
}
