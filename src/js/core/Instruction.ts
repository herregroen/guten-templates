export type InstructionOptions = Record<string, string | boolean | number | Array<string> | Array<boolean> | Array<number>>;

/**
 * Abstract instruction class.
 */
export default abstract class Instruction {
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
}
