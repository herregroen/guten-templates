import React, { Component, Fragment } from "react";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { Block, createBlock } from "@wordpress/blocks";

type SelectProps   = { allowedBlocks: Block[]; parentName: string };
type DispatchProps = { insertBlock: ( name: string ) => void };
type Props         = { clientId: string; rootClientId: string };

/**
 * BlockAppender class.
 */
export class BlockAppender extends Component<SelectProps & DispatchProps & Props> {
	/**
     * Renders the appender.
	 *
	 * @returns The appender.
     */
	render(): JSX.Element {
		const { allowedBlocks, insertBlock } = this.props;

		return (
			<Fragment>
				<div>Test</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect<SelectProps, Props>( ( select, { clientId, rootClientId } ) => {
		const { getBlockRootClientId, getBlockName } = select( "core/block-editor" );
		const { __experimentalGetAllowedBlocks } = select( "core/block-editor" ) as unknown as {
			__experimentalGetAllowedBlocks: ( clientId: string ) => Block[];
		};

		rootClientId =
			rootClientId || getBlockRootClientId( clientId );

		const allowedBlocks = __experimentalGetAllowedBlocks( rootClientId );
		const parentName    = getBlockName( rootClientId );

		return { allowedBlocks, parentName };
	} ),
	withDispatch<DispatchProps, Props>( ( dispatch, ownProps, { select } ) => {
		return {
			/**
             * Inserts a block of the given name.
             *
             * @param name The name of the block to insert.
             */
			insertBlock( name: string ) {
				const { rootClientId } = ownProps;
				const { getBlockOrder } = select( "core/block-editor" );
				const { insertBlock } = dispatch( "core/block-editor" );

				const blockToInsert = createBlock( name );

				insertBlock(
					blockToInsert,
					getBlockOrder( rootClientId ).length,
					rootClientId,
				);
			},
		};
	} ),
] )( BlockAppender );
