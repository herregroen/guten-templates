export type InstructionOptions = Record<string, string | boolean | number | Array<string> | Array<boolean> | Array<number>>;
export type InstructionClass<T> = { new( id: number, options: InstructionOptions ): T };

/**
 * Abstract instruction class.
 */
export default abstract class Instruction {
	protected static registeredBlockInstructions: Record<string, InstructionClass<Instruction>> = {};

	public id: number;
	public options: InstructionOptions;

	/**
	 * Creates a render instruction.
	 *
	 * @param id      The id.
	 * @param options The options.
	 */
	constructor(
		id: number,
		options: InstructionOptions,
	) {
		this.id = id;
		this.options = options;
	}

	/**
	 * Register a new instruction.
	 *
	 * @param this        This.
	 * @param name        The name of the instruction.
	 * @param instruction The instruction class.
	 *
	 * @returns {void}
	 */
	static register<T extends typeof Instruction>( this: T, name: string, instruction: InstructionClass<T["prototype"]> ): void {
		this.registeredBlockInstructions[ name ] = instruction;
	}

	/**
	 * Creates an instruction instance.
	 *
	 * @param this    This.
	 * @param name    The name of the instruction.
	 * @param id      The id of the instance.
	 * @param options The options of the instance.
	 *
	 * @returns The instruction instance.
	 */
	static create<T extends typeof Instruction>( this: T, name: string, id: number, options: InstructionOptions = {} ): T["prototype"] {
		const klass = this.registeredBlockInstructions[ name ];

		if ( ! klass ) {
			console.error( "Invalid instruction: ", name );
		}

		return new klass( id, options );
	}
}
