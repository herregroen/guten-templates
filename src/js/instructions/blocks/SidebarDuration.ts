import moment from "moment";
import { createElement, Fragment } from "@wordpress/element";
import { TextControl } from "@wordpress/components";

import BlockInstruction from "../../core/blocks/BlockInstruction";
import { RenderSaveProps, RenderEditProps } from "../../core/blocks/BlockDefinition";
import { BlockEditProps, BlockConfiguration } from "@wordpress/blocks";
import SidebarBase from "./abstract/SidebarBase";
import { __ } from "@wordpress/i18n";

/**
 * Sidebar input instruction
 */
class SidebarDuration extends SidebarBase {
	public options: {
		name: string;
		default?: string;
		label?: string;
		help?: string;
		output?: boolean;
	}

	/**
	 * Renders the sidebar.
	 *
	 * @param props The render props.
	 * @param i     The number sidebar element this is.
	 *
	 * @returns The sidebar element.
	 */
	sidebar( props: BlockEditProps<Record<string, unknown>>, i: number ): JSX.Element {
		let labelPrefix = "", duration = moment.duration( NaN );

		if ( typeof props.attributes[ this.options.name ] === "string" ) {
			duration = moment.duration( props.attributes[ this.options.name ] );
		} else if ( typeof this.options.default === "string" ) {
			duration = moment.duration( this.options.default );
		}

		if ( typeof this.options.label === "string" ) {
			labelPrefix = this.options.label + " ";
		}

		const hours   = Math.floor( duration.asHours() );
		const minutes = duration.minutes();

		const hourAttributes: TextControl.Props = {
			label: labelPrefix + __( "hours", "wordpress-seo" ),
			value: isNaN( hours ) ? "" : hours,
			onChange: value => {
				const newDuration = moment.duration( { hours: parseInt( value, 10 ), minutes } );
				props.setAttributes( { [ this.options.name ]: newDuration.toISOString() } );
			},
			type: "number",
		};
		const minuteAttributes: TextControl.Props = {
			label: labelPrefix + __( "minutes", "wordpress-seo" ),
			value: isNaN( minutes ) ? "" : minutes,
			onChange: value => {
				const newDuration = moment.duration( { hours, minutes: parseInt( value, 10 ) } );
				props.setAttributes( { [ this.options.name ]: newDuration.toISOString() } );
			},
			type: "number",
		};

		if ( this.options.help ) {
			hourAttributes.help = this.options.help;
			minuteAttributes.help = this.options.help;
		}

		return createElement( Fragment, { key: i }, [
			createElement( TextControl, hourAttributes ),
			createElement( TextControl, minuteAttributes ),
		] );
	}

	/**
	 * Adds the sidebar input to the block configuration.
	 *
	 * @returns The block configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return {
			attributes: {
				[ this.options.name ]: {
					type: "string",
				},
			},
		};
	}

	/**
	 * Renders the value of a sidebar input.
	 *
	 * @param props The render props.
	 *
	 * @returns The value of the sidebar input.
	 */
	protected value( props: RenderSaveProps | RenderEditProps ): string {
		let duration = moment.duration( NaN );

		if ( typeof props.attributes[ this.options.name ] === "string" ) {
			duration = moment.duration( props.attributes[ this.options.name ] );
		} else if ( typeof this.options.default === "string" ) {
			duration = moment.duration( this.options.default );
		}

		if ( ! duration.isValid() ) {
			return "";
		}

		return duration.humanize();
	}
}

BlockInstruction.register( "sidebar-duration", SidebarDuration );
