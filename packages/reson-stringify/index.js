'use strict';

const unherit = require('unherit');
const {check} = require('./lib/utils');
const Reson = require('./lib');

module.exports = compiler;

compiler.Compiler = Reson;

function compiler(options) {
	options = check(options);

	const Local = unherit(Reson);

	Object.assign(
		Local.prototype.options,
		this.data('settings'),
		options
	);

	this.Compiler = Local;
}
