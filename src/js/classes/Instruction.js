const registeredInstructions = [];

export default class Instruction {
	constructor( id, options ) {
		this.id      = id;
		this.options = options;
	}

	render( mode, props, leaf, i ) {
		return null;
	}

	sidebar( props, i ) {
		return null;
	}

	configuration() {
		return {};
	}

	static register( name, instruction ) {
		registeredInstructions[ name ] = instruction;
	}

	static create( name, id, options = {} ) {
		const klass = registeredInstructions[ name ];

		if ( ! klass ) {
			console.error( "Invalid instruction: ", instruction );
		}

		return new klass( id, options );
	}
}