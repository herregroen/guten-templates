import Instruction from "../core/Instruction";

/**
 * Block instruction.
 */
class Block extends Instruction {
	/**
	 * Pass on the optoins as configuration.
	 *
	 * @returns The configuration.
	 */
	configuration() {
		return this.options;
	}
}

Instruction.register( "block", Block );
