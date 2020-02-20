import { createElement, Fragment } from "@wordpress/element";
import { registerBlockType, BlockConfiguration, BlockEditProps, BlockSaveProps } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { merge } from "lodash";

import BlockInstruction from "./BlockInstruction";
import Definition from "../Definition";
import BlockRootLeaf from "../../leaves/blocks/BlockRootLeaf";

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
 * BlockDefinition clas
 */
export default class BlockDefinition extends Definition {
	public instructions: BlockInstruction[];
	public tree: BlockRootLeaf;

	/**
	 * Renders editing the block.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered block.
	 */
	edit( props: RenderEditProps ): JSX.Element {
		// Take the children directly to avoid creating too many Fragments.
		const elements = this.tree.children.map( ( leaf, i ) => leaf.edit( props, i ) ).filter( e => e !== null );

		const sidebarElements = this.instructions.map( ( instruction, i ) => instruction.sidebar( props, i ) ).filter( e => e !== null );
		if ( sidebarElements.length > 0 ) {
			const sidebar = createElement( InspectorControls, null, sidebarElements );
			elements.unshift( sidebar );
		}

		if ( elements.length === 1 ) {
			return elements[ 0 ] as JSX.Element;
		}

		return createElement( Fragment, null, elements );
	}

	/**
	 * Renders saving the block.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered block.
	 */
	save( props: RenderSaveProps ): JSX.Element {
		return this.tree.save( props );
	}

	/**
	 * Returns the configuration of this BlockDefinition.
	 *
	 *@returns The configuration.
	 */
	configuration(): MutableBlockConfiguration {
		return this.instructions.reduce( ( config, instruction ) => merge( config, instruction.configuration() ), {} as MutableBlockConfiguration );
	}

	/**
	 * Registers the block with Gutenberg.
	 */
	register(): void {
		const configuration = this.configuration();

		const name = configuration.name as string;
		delete configuration.name;

		configuration.edit = props => this.edit( props );
		configuration.save = props => this.save( props );

		registerBlockType( name, configuration );
	}
}
