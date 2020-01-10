import Leaf from "./Leaf";
import { BlockConfiguration } from "@wordpress/blocks";
import { RenderMode, RenderProps } from "./Definition";

export type InstructionOptions = Record<string, string | boolean | number | Array<string> | Array<boolean> | Array<number>>;
export type InstructionClass   = { new( id: string, options: InstructionOptions ): Instruction };

/**
 * Instruction class.
 */
export default abstract class Instruction {
	static registeredInstructions: Record<string, InstructionClass> = {};

	/**
	 * Creates a render instruction.
	 *
	 * @param id      The id.
	 * @param options The options.
	 */
	constructor(
		public id: string,
		public options: InstructionOptions,
	) { }

	/**
	 * Renders the element.
	 *
	 * @param mode  The render mode.
	 * @param props} props The props.
	 * @param leaf  The leaf being rendered.
	 * @param i      The number the rendered element is of it's parent.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	abstract render( mode: RenderMode, props: RenderProps, leaf: Leaf, i: number ): JSX.Element

	/**
	 * Renders the sidebar.
	 *
	 * @param props The props.
	 * @param i      The number the rendered element is of it's parent.
	 *
	 * @returns The sidebar element to render.
	 */
	abstract sidebar( props: RenderProps, i: number ): JSX.Element

	/**
	 * Returns the configuration of this instruction.
	 *
	 * @returns The configuration.
	 */
	abstract configuration(): Partial<BlockConfiguration>

	/**
	 * Register a new instruction.
	 *
	 * @param name        The name of the instruction.
	 * @param instruction The instruction class.
	 *
	 * @returns {void}
	 */
	static register( name: string, instruction: InstructionClass ): void {
		Instruction.registeredInstructions[ name ] = instruction;
	}

	/**
	 * Creates an instruction instance.
	 *
	 * @param name    The name of the instruction.
	 * @param id      The id of the instance.
	 * @param options The options of the instance.
	 *
	 * @returns The instruction instance.
	 */
	static create( name: string, id: string, options: InstructionOptions = {} ) {
		const klass = Instruction.registeredInstructions[ name ];

		if ( ! klass ) {
			console.error( "Invalid instruction: ", this );
		}

		return new klass( id, options );
	}
}
