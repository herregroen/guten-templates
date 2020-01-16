import Leaf from "../core/Leaf";

/**
 * TextLeaf class.
 */
export default class TextLeaf extends Leaf {
	public value: string;

	/**
     * Creates a text leaf.
     *
     * @param value The value.
     */
	constructor(
		value: string,
	) {
		super();
		this.value = value;
	}

	/**
     * Renders this leaf.
     *
     * @returns The text of this leaf.
     */
	render(): string {
		return this.value;
	}
}
