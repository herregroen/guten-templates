import { createElement, Fragment } from "@wordpress/element";
import { registerBlockType, BlockConfiguration, BlockEditProps, BlockSaveProps } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { merge } from "lodash";

import Instruction from "./Instruction";
import Leaf from "./Leaf";

export enum RenderMode {
	edit = "edit",
	save = "save",
}

export type RenderProps = BlockEditProps<Record<string, unknown>> | BlockSaveProps<Record<string, unknown>>;

/**
 * Definition clas
 */
export default class Definition {
	/**
	 * Creates a block definition.
	 *
	 * @param {string}        template     The template.
	 * @param {Instruction[]} instructions The parsed instructions.
	 * @param {string}        separator    The separator used.
	 * @param {Leaf[]}        tree         The parsed leaves.
	 */
	constructor(
		public template: string,
		public instructions: Instruction[],
		public separator: string,
		public tree: Leaf[],
	) { }

	/**
	 * Renders the block.
	 *
	 * @param {RenderMode}  mode  The render mode, "edit" or "save".
	 * @param {RenderProps} props The props.
	 *
	 * @returns {JSX.Element} The rendered block.
	 */
	render(mode: RenderMode, props: RenderProps): JSX.Element {
		const elements = this.tree.map((leaf, i) => leaf.render(mode, props, i)).filter(e => e !== null);

		if (mode === "edit") {
			const sidebarElements = this.instructions.map((instruction, i) => instruction.sidebar(props, i)).filter(e => e !== null);
			if (sidebarElements.length > 0) {
				const sidebar = createElement(InspectorControls, null, sidebarElements);
				elements.unshift(sidebar);
			}
		}

		if (elements.length === 1) {
			return elements[0];
		}

		return createElement(Fragment, null, elements);
	}

	/**
	 * Registers the block with Gutenberg.
	 *
	 * @returns {void}
	 */
	register(): void {
		const configuration = this.instructions.reduce(
			(config, instruction) => merge(config, instruction.configuration()), {},
		) as BlockConfiguration;
		const name = configuration.name;
		delete configuration.name;

		configuration.edit = props => this.render(RenderMode.edit, props);
		configuration.save = props => this.render(RenderMode.save, props);

		registerBlockType(name, configuration);
	}
}
