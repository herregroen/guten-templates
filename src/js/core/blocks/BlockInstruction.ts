import BlockLeaf from "./BlockLeaf";
import { RenderSaveProps, RenderEditProps } from "./BlockDefinition";
import { ReactElement } from "@wordpress/element";
import { BlockConfiguration } from "@wordpress/blocks";
import { InstructionOptions } from "../../general/core/Instruction";

export type BlockInstructionClass = { new( id: number, options: InstructionOptions ): BlockInstruction };

/**
 * BlockInstruction class.
 */
export default abstract class BlockInstruction {
	static registeredBlockInstructions: Record<string, BlockInstructionClass> = {};

	public id: number;
	public options: InstructionOptions;

	/**
	 * Creates a render instruction.
	 *
	 * @param id      The id.
	 * @param options The options.
	 */
	constructor(
		id: number,
		options: InstructionOptions,
	) {
		this.id = id;
		this.options = options;
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	/**
	 * Renders editing the element.
	 *
	 * @param props} props The props.
	 * @param leaf  The leaf being rendered.
	 * @param i      The number the rendered element is of it's parent.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	save( props: RenderSaveProps, leaf: BlockLeaf, i: number ): ReactElement | string {
		return null;
	}

	/**
	 * Renders saving the element.
	 *
	 * @param props} props The props.
	 * @param leaf  The leaf being rendered.
	 * @param i      The number the rendered element is of it's parent.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	edit( props: RenderEditProps, leaf: BlockLeaf, i: number ): ReactElement | string {
		return null;
	}

	/**
	 * Renders the sidebar.
	 *
	 * @param props The props.
	 * @param i      The number the rendered element is of it's parent.
	 *
	 * @returns The sidebar element to render.
	 */
	sidebar( props: RenderEditProps, i: number ): ReactElement | string {
		return null;
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */

	/**
	 * Returns the configuration of this instruction.
	 *
	 * @returns The configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return {};
	}

	/**
	 * Register a new instruction.
	 *
	 * @param name        The name of the instruction.
	 * @param instruction The instruction class.
	 *
	 * @returns {void}
	 */
	static register( name: string, instruction: BlockInstructionClass ): void {
		BlockInstruction.registeredBlockInstructions[ name ] = instruction;
	}

	/**
	 * Creates an instruction instance.
	 *
	 * @param name    The name of the instruction.
	 * @param id      The id of the instance.
	 * @param options The options of the instance.
	 *
	 * @returns The instruction instance.
	 */
	static create( name: string, id: number, options: InstructionOptions = {} ) {
		const klass = BlockInstruction.registeredBlockInstructions[ name ];

		if ( ! klass ) {
			console.error( "Invalid instruction: ", this );
		}

		return new klass( id, options );
	}
}
