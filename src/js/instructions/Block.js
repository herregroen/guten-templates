import Instruction from "../classes/Instruction";

class Block extends Instruction {
	configuration() {
		return this.options;
	}
}

Instruction.register( 'block', Block );
