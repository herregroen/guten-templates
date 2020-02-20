import Instruction from "./Instruction";
import Leaf from "./Leaf";

/**
 * Definition clas
 */
export default abstract class Definition {
	public separator: string;
	public template: string;
	public instructions: Instruction[];
	public tree: Leaf;

	/**
	 * Creates a block BlockDefinition.
	 *
	 * @param separator    The separator used.
	 * @param template     The template.
	 * @param instructions The parsed instructions.
	 * @param tree         The parsed leaves.
	 */
	constructor(
		separator: string,
		template = "",
		instructions: Instruction[] = [],
		tree: Leaf = null,
	) {
		this.separator = separator;
		this.template = template;
		this.instructions = instructions;
		this.tree = tree;
	}
}
