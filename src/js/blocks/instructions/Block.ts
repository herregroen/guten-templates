import Instruction from "../core/Instruction";
import { BlockConfiguration } from "@wordpress/blocks";

/**
 * Block instruction.
 */
class Block extends Instruction {
	/**
	 * Pass on the optoins as configuration.
	 *
	 * @returns The configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return this.options;
	}
}

Instruction.register( "block", Block );
