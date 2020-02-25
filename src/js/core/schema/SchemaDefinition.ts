import SchemaInstruction from "./SchemaInstruction";
import SchemaLeaf from "./SchemaLeaf";
import Definition from "../Definition";
import parse from "../../functions/schema/parse";
import { RenderSaveProps } from "../blocks/BlockDefinition";

export type SchemaPrimitive = string | number | boolean;
export type SchemaValue = SchemaPrimitive | SchemaObject | SchemaArray;
export type SchemaObject = { [member: string]: SchemaValue };
export type SchemaArray = SchemaValue[];

export const schemaDefinitions: Record<string, SchemaDefinition> = {};

export type SchemaDefinitionConfiguration = {
	name: string;
	onlyNested?: boolean;
};

/**
 * Schema definition class
 */
export default class SchemaDefinition extends Definition {
	public static separatorCharacters = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
	public static parser = parse;

	public instructions: SchemaInstruction[];
	public tree: SchemaLeaf;

	/**
	 * Renders a schema definition.
	 *
	 * @param props The props.
	 *
	 * @returns The rendered schema.
	 */
	render( props: RenderSaveProps ): SchemaValue {
		return this.tree.render( props );
	}

	/**
	 * Registers a schema definition.
	 */
	register(): void {
		const configuration = this.configuration() as SchemaDefinitionConfiguration;

		schemaDefinitions[ configuration.name ] = this;
	}

	/**
	 * Returns whether or not schema should only be rendered for nested blocks.
	 *
	 * @returns Whether or not schema should only be rendered for nested blocks.
	 */
	onlyNested(): boolean {
		const configuration = this.configuration() as SchemaDefinitionConfiguration;

		return configuration.onlyNested === true;
	}
}
