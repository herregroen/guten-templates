import { createElement, Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { merge } from "lodash";

export default class Definition {
	constructor( values ) {
		this.template     = '';
		this.instructions = [];
		this.separator    = '';
		this.tree         = [];
		Object.assign( this, values );
	}

	render( mode, props ) {
		const elements = this.tree.map( ( leaf, i ) => leaf.render( mode, props, i ) ).filter( e => e !== null );

		if ( mode === "edit" ) {
			const sidebarElements = this.instructions.map( instruction => instruction.sidebar( props ) ).filter( e => e !== null );
			if ( sidebarElements.length > 0 ) {
				const sidebar = createElement( InspectorControls, null, sidebarElements );
				elements.unshift( sidebar );
			}
		}

		if ( elements.length === 1 ) {
			return elements[ 0 ];
		}

		return createElement( Fragment, null, elements );
	}

	register() {
		const configuration = this.instructions.reduce( ( config, instruction ) => merge( config, instruction.configuration() ), {} )
		const name          = configuration.name;
		delete configuration.name;

		configuration.edit = props => this.render( "edit", props );
		configuration.save = props => this.render( "save", props );

		registerBlockType( name, configuration );
	}
}