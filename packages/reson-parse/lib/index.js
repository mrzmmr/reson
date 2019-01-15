'use strict';

const {generate} = require('pegjs');
const rules = require('./rules');
const {
	format,
	toString,
	indent,
	u
} = require('./utils');

module.exports = Reson;

Reson.prototype.name = 'reson-parse';

Reson.prototype.parse = parse;

Reson.prototype.rules = rules;

Reson.prototype.methods = {indent, u};

Reson.prototype.options = {};

Reson.prototype.order = [
	'Null',
	'Boolean',
	'Number',
	'String',
	'Array',
	'Object'
];

function Reson(doc, file) {
	this.file = file;
}

function parse() {
	const {options, methods, order, rules, file, name} = this;
	const value = format(String(file), options);
	const grammar = toString(rules, order);
	const allowedStartRules = ['Root', 'Tokens'];
	const startRule = 'Root';
	let message;
	let origin;
	let parser;
	let token;

	const settings = Object.assign({}, {allowedStartRules, startRule}, methods);

	/* Build parser */
	try {
		parser = generate(grammar, settings);
	} catch (error) {
		this.file.fail(error);
	}

	try {
		return parser.parse(value, settings);
	} catch (error) {
		/* istanbul ignore if */
		if (!(error instanceof parser.SyntaxError)) {
			this.file.fail(error);
		}

		settings.startRule = 'Tokens';

		origin = name + ':SyntaxError';

		try {
			token = parser.parse(
				value.substring(error.location.start.offset),
				settings
			);
		} catch (error) {
			token = error.found;
		}

		message = 'Unexpected token: ' + token;

		this.file.fail(message, error.location, origin);
	}
}
