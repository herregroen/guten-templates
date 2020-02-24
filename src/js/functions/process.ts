import { camelCase } from "lodash";
import { IToken } from "tokenizr";

import Definition, { DefinitionClass } from "../core/Definition";
import Instruction from "../core/Instruction";
import { generateUniqueSeparator } from "./separator";
import tokenize from "./tokenize";

let id = 0;

/**
 * Processes an instruction.
 *
 * @param token            The current token.
 * @param tokens           The remaining tokens.
 * @param instructionClass The instruction class.
 *
 * @returns The instruction.
 */
function processBlockInstruction( token: IToken<string>, tokens: IToken[], instructionClass: typeof Instruction ) {
	const instruction = instructionClass.create( token.value, id++ );

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
 * @param template         The template to process.
 * @param definitionClass  The definition class.
 * @param instructionClass The instruction class.
 *
 * @return The template BlockDefinition.
 */
export default function process<T extends Definition>(
	template: string,
	definitionClass: DefinitionClass<T>,
	instructionClass: typeof Instruction,
): T {
	const tokens     = tokenize( template );
	const separator  = generateUniqueSeparator( template, definitionClass.separatorCharacters );
	const definition = new definitionClass( separator );

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
			const instruction = processBlockInstruction( token as IToken<string>, tokens, instructionClass );
			definition.instructions.push( instruction );
			definition.template += separator + instruction.id + separator;
		}
	}

	return definitionClass.parser( definition );
}
