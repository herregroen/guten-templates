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
	 * Renders editing a leaf.
	 *
	 * @returns The rendered element.
	 */
	save(): JSX.Element | string {
		return this.value;
	}

	/**
	 * Renders saving a leaf.
	 *
	 * @returns The rendered element.
	 */
	edit(): JSX.Element | string {
		return this.value;
	}
}
