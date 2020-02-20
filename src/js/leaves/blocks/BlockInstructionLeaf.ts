import BlockLeaf from "../core/BlockBlockLeaf";
import BlockInstruction from "../core/BlockInstruction";
import { RenderEditProps, RenderSaveProps } from "../core/BlockDefinition";

/**
 * BlockBlockInstructionBlockLeaf class.
 */
export default class BlockBlockInstructionBlockLeaf extends BlockLeaf {
	public instruction: BlockInstruction;

	/**
     * Creates an instruction leaf.
     *
     * @param instruction The instruction.
     * @param options     The options.
     */
	constructor(
		instruction: BlockInstruction,
	) {
		super();
		this.instruction = instruction;
	}

	/**
	 * Renders editing a leaf.
	 *
	 * @param props The render props.
	 * @param i     The number child this leaf is.
	 *
	 * @returns The rendered element.
	 */
	save( props: RenderSaveProps, i: number ): JSX.Element | string {
		return this.instruction.save( props, this, i );
	}

	/**
	 * Renders saving a leaf.
	 *
	 * @param props The render props.
	 * @param i     The number child this leaf is.
	 *
	 * @returns The rendered element.
	 */
	edit( props: RenderEditProps, i: number ): JSX.Element | string {
		return this.instruction.edit( props, this, i );
	}
}
