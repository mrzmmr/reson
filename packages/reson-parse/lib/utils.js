'use strict';

module.exports = {
	check,
	format,
	indent,
	toString,
	u
};

const defaultOptions = {
	tabs: 2
};

function format(value, {tabs}) {
	const space = ' '.repeat(tabs);
	const line = /\r\n|\r/g;
	return value.replace(line, '\n').replace(/\t/g, space);
}

function indent(l = '', r = '', li = '', ri = '') {
	return [space(l), space(r), space(li), space(ri)];

	function space(value) {
		let index = value.length - 1;
		let result = 0;

		while (value[index] === ' ') {
			result++;
			index--;
		}

		return result;
	}
}

function toString(rules, order) {
	const reducer = (result, rule) => `${result + rules[rule]()}`;
	return Object.keys(rules)
		.reduce(reducer, '')
		.concat(`\nOrder = ${order.join(' / ')}\n`);
}

function u(type, value = [], position = {}, more = {}) {
	const node = {type};

	Object.assign(node, more);

	if (Array.isArray(value)) {
		node.children = value;
	} else if (value && value.type) {
		node.children = [value];
	} else {
		node.value = value;
	}

	node.position = position;

	return node;
}

function check(options = defaultOptions) {
	if (typeof options === 'number' && options > -1) {
		options = {tabs: options};
		return options;
	}
	if (typeof options === 'object' && !Array.isArray(options)) {
		options = Object.assign({}, defaultOptions, options);

		if (typeof options.tabs !== 'number') {
			throw new TypeError(
				`Unexpected value \`${
					options.tabs
				}\` for \`tabs\` option.`
			);
		}

		return options;
	}

	throw new Error(
		`Unexpected type \`${
			Array.isArray(options) ? 'array' : typeof options
		}\` for options.`
	);
}
