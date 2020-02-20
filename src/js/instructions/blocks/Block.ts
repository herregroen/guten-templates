import BlockInstruction from "../core/BlockInstruction";
import { BlockConfiguration } from "@wordpress/blocks";

/**
 * Block instruction.
 */
class Block extends BlockInstruction {
	/**
	 * Pass on the optoins as configuration.
	 *
	 * @returns The configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return this.options;
	}
}

BlockInstruction.register( "block", Block );
