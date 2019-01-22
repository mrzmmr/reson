'use strict';

const visitors = require('./visitors');
const {location, indents, settings} = require('./utils');

module.exports = Reson;

Reson.prototype.name = 'reson-stringify';

Reson.prototype.compile = compile;

Reson.prototype.visit = one;

Reson.prototype.indents = indents;

Reson.prototype.location = location;

Reson.prototype.visitors = visitors;

Reson.prototype.options = {};

function Reson(tree) {
	this.tree = tree;
	this.line = 1;
}

function compile() {
	return visit.call(this, this.tree);
}

function visit(node, index, parent) {
	const visitor = this.visitors[node.type + 's'];

	if (typeof visitor !== 'function') {
		throw new TypeError(`Could not compile node of type \`${node.type}\`.`);
	}

	return visitor.call(this, node, index, parent);
}

function one(node, ...options) {
	const [open, close, fn] = settings(...options);

	return this.location(node, open, close, node => {
		let values;

		if (Array.isArray(node.children)) {
			values = fn(node.children.map(handle.bind(this)));
		} else {
			values = fn(node);
		}

		if (typeof values === 'string') {
			return values;
		}

		if (typeof values !== 'string' && values.value) {
			return values.value;
		}

		if (Array.isArray(values)) {
			return values.join('');
		}

		throw new Error(
			`Expected a \`string\` to be returned but got: ${
				typeof values
			}.`
		);
	});

	function handle(child, index) {
		return visit.call(this, child, index, node);
	}
}
