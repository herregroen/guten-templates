import { createElement, Fragment, ReactElement } from "@wordpress/element";
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

type MutableBlockConfiguration = {
	-readonly [K in keyof BlockConfiguration]: BlockConfiguration[K]
}

/**
 * Definition clas
 */
export default class Definition {
	public separator: string;
	public template: string;
	public instructions: Instruction[];
	public tree: Leaf[];
	/**
	 * Creates a block definition.
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
		tree: Leaf[] = [],
	) {
		this.separator = separator;
		this.template = template;
		this.instructions = instructions;
		this.tree = tree;
	}

	/**
	 * Renders the block.
	 *
	 * @param {RenderMode}  mode  The render mode, "edit" or "save".
	 * @param {RenderProps} props The props.
	 *
	 * @returns {JSX.Element} The rendered block.
	 */
	render( mode: RenderMode, props: RenderProps ): ReactElement {
		const elements = this.tree.map( ( leaf, i ) => leaf.render( mode, props, i ) ).filter( e => e !== null );

		if ( mode === "edit" ) {
			const sidebarElements = this.instructions.map( ( instruction, i ) => instruction.sidebar( props, i ) ).filter( e => e !== null );
			if ( sidebarElements.length > 0 ) {
				const sidebar = createElement( InspectorControls, null, sidebarElements );
				elements.unshift( sidebar );
			}
		}

		if ( elements.length === 1 ) {
			return elements[ 0 ] as ReactElement;
		}

		return createElement( Fragment, null, elements );
	}

	/**
	 * Registers the block with Gutenberg.
	 *
	 * @returns {void}
	 */
	register(): void {
		const configuration = this.instructions.reduce(
			( config, instruction ) => merge( config, instruction.configuration() ), {},
		) as MutableBlockConfiguration;
		const name = configuration.name;
		delete configuration.name;

		configuration.edit = props => this.render( RenderMode.edit, props );
		configuration.save = props => this.render( RenderMode.save, props );

		registerBlockType( name, configuration );
	}
}
