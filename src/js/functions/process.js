import { camelCase }from "lodash";

import Definition from "../classes/Definition";
import Instruction from "../classes/Instruction";

/**
 * Transforms an array of tokens into a template definition.
 *
 * @param {array}  tokens    The tokens.
 * @param {string} separator A unique separator that isn't contained in any strings.
 *
 * @return {Definition} The template definition.
 */
export default function process( tokens, separator ) {
	const definition = new Definition( { separator } );
	let id = 0;

	while ( true ) {
		const token = tokens.shift();

		if ( ! token ) {
			break;
		}

		if ( token.type === 'constant' ) {
			definition.template += token.value;
			continue;
		}

		if ( token.type === 'definition' ) {
			const instruction = Instruction.create( token.value, id++ );

			while ( tokens[0] && tokens[0].type === 'key' ) {
				const key = camelCase( tokens.shift().value );
				let value;
				if ( tokens[0].type === 'array-open' ) {
					tokens.shift(); // Consume the array-open token.
					value = [];
					while ( tokens[0].type !== 'array-close' ) {
						value.push( tokens.shift().value );
					}
					tokens.shift(); // Consume the array-close token.
				} else if ( tokens[0].type === 'value' ) {
					value = tokens.shift().value;
				}
				instruction.options[ key ] = value;
			}

			definition.instructions.push( instruction );
			definition.template += separator + instruction.id + separator;
		}
	}

	return definition;
};
