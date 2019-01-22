'use strict';

module.exports = {
	location,
	settings,
	indents,
	check
};

const defaultOptions = {
	tabs: 2
};

function check(options = defaultOptions) {
	if (typeof options === 'number' && options > -1) {
		options = {
			tabs: options
		};
	}

	if (typeof options === 'object' && !Array.isArray(options)) {
		options = Object.assign({}, defaultOptions, options)
	}

	if (typeof options !== 'object' || Array.isArray(options)) {
		throw new TypeError(
			`Unexpected type \`${
				Array.isArray(options) ? 'array' : typeof options
			}\` for options.`
		);
	}

	if (typeof options.tabs !== 'number') {
		throw new TypeError(
			`Unexpected value \`${
				options.tabs
			}\` for \`tabs\` option.`
		);
	}

	return options;
}

function location(node, ...options) {
	const nl = '\n';
	let result = '';

	const {tabs} = this.options;

	const [open, close, fn] = settings(...options);

	const [start, end, indent] = position(node.position);

	const [l, r, li, ri] = indents(indent, tabs);

	while (start.line > this.line) {
		this.line += 1;
		result += nl;
	}

	result += l + open + li + fn(node);

	while (end.line > this.line) {
		this.line += 1;
		result += nl;
	}

	result += ri + close + r;

	return result;
}

function settings(open = '', close = '', fn = r => r) {
	if (typeof open === 'function') {
		fn = open;
		open = '';
	}
	if (typeof close === 'function') {
		fn = close;
		close = '';
	}

	return [open, close, fn];
}

function position({start = {}, end = {}, indent = [0, 0, 0, 0]} = {}) {
	return [start, end, indent];
}

function indents(indent = [0, 0, 0, 0], tabs = 0) {
	const returns = [];
	let index = -1;

	while (++index < 4) {
		const dent = indent[index];

		if (!dent) {
			returns.push('');
			continue;
		}
		if (tabs > 0) {
			returns.push(
				'\t'.repeat(dent / tabs) +
					' '.repeat(dent % tabs)
			);
			continue;
		}
		returns.push(' '.repeat(dent));
	}

	return returns;
}

