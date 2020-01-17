import { RenderMode, RenderProps } from "./Definition";
import { ReactElement } from "@wordpress/element";

/**
 * Leaf class
 */
export default abstract class Leaf {
	/**
	 * Renders a leaf.
	 *
	 * @param mode  The render mode.
	 * @param props The render props.
	 * @param i     The number child this leaf is.
	 *
	 * @returns The rendered element.
	 */
	abstract render( mode: RenderMode, props: RenderProps, i: number ): ReactElement | string
}
