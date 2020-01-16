import Leaf from "../core/Leaf";
import Instruction from "../core/Instruction";
import { RenderMode, RenderProps } from "../core/Definition";

/**
 * InstructionLeaf class.
 */
export default class InstructionLeaf extends Leaf {
	public instruction: Instruction;

	/**
     * Creates an instruction leaf.
     *
     * @param instruction The instruction.
     * @param options     The options.
     */
	constructor(
		instruction: Instruction,
	) {
		super();
		this.instruction = instruction;
	}


	/**
     * Renders the instruction leaf.
     *
     * @param mode  The render mode.
     * @param props The render props.
     * @param i     The number child this leaf is.
     *
     * @returns The rendered leaf.
     */
	render( mode: RenderMode, props: RenderProps, i: number ): JSX.Element | string {
		return this.instruction.render( mode, props, this, i );
	}
}
