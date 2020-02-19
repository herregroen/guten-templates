import { createElement, Fragment, ReactElement } from "@wordpress/element";
import { registerBlockType, BlockConfiguration, BlockEditProps, BlockSaveProps } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { merge } from "lodash";

import Instruction from "./Instruction";
import Leaf from "./Leaf";

export interface RenderEditProps extends BlockEditProps<Record<string, unknown>> {
	clientId?: string;
}

export interface RenderSaveProps extends BlockSaveProps<Record<string, unknown>> {
	clientId?: string;
}

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
	 * Renders editing the block.
	 *
	 * @param {RenderProps} props The props.
	 *
	 * @returns {JSX.Element} The rendered block.
	 */
	edit( props: RenderEditProps ): JSX.Element {
		const elements = this.tree.map( ( leaf, i ) => leaf.edit( props, i ) ).filter( e => e !== null );

		const sidebarElements = this.instructions.map( ( instruction, i ) => instruction.sidebar( props, i ) ).filter( e => e !== null );
		if ( sidebarElements.length > 0 ) {
			const sidebar = createElement( InspectorControls, null, sidebarElements );
			elements.unshift( sidebar );
		}

		if ( elements.length === 1 ) {
			return elements[ 0 ] as ReactElement;
		}

		return createElement( Fragment, null, elements );
	}

	/**
	 * Renders saving the block.
	 *
	 * @param {RenderProps} props The props.
	 *
	 * @returns {JSX.Element} The rendered block.
	 */
	save( props: RenderSaveProps ): JSX.Element {
		const elements = this.tree.map( ( leaf, i ) => leaf.save( props, i ) ).filter( e => e !== null );

		if ( elements.length === 1 ) {
			return elements[ 0 ] as ReactElement;
		}

		return createElement( Fragment, null, elements );
	}

	/**
	 * Registers the block with Gutenberg.
	 */
	register(): void {
		const configuration = this.instructions.reduce(
			( config, instruction ) => merge( config, instruction.configuration() ), {},
		) as MutableBlockConfiguration;
		const name = configuration.name;
		delete configuration.name;

		configuration.edit = props => this.edit( props );
		configuration.save = props => this.save( props );

		registerBlockType( name, configuration );
	}
}
