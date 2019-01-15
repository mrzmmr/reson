'use strict';

const unherit = require('unherit');
const {check} = require('./lib/utils');
const Reson = require('./lib');

module.exports = parser;

function parser(options = {}) {
	options = check(options);

	const Local = unherit(Reson);

	Object.assign(
		Local.prototype.options,
		this.data('settings'),
		options
	);

	this.Parser = Local;
}

