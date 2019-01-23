'use strict';

const unified = require('unified');
const {test} = require('tap');
const {indents} = require('../lib/utils');
const reson = require('..');

test('reson().stringify()', t => {
	const {Compiler} = reson;
	const {stringify} = unified().use(reson);

	t.throws(
		() => new Compiler().visit({type: 'string'}),
		/Expected a `string` to be returned but got: object./,
		'should throw when wrong type is returned by visit.'
	);

	t.throws(
		() => stringify({type: 'error'}),
		/Could not compile node of type `error`./,
		'should throw with unknown node type.'
	);

	t.throws(
		() => unified().use(reson, {tabs: false}).freeze(),
		/Unexpected value `false` for `tabs` option./,
		'should throw with bad option.'
	);

	t.throws(
		() => unified().use(reson, '').freeze(),
		/Unexpected type `string` for options./,
		'should throw with bad option.'
	);

	t.throws(
		() => unified().use(reson, []).freeze(),
		/Unexpected type `array` for options./,
		'should throw with bad option.'
	);

	t.doesNotThrow(() => {
		unified()
		.use(reson, {})
		.use(function () {
			t.equal(
				this.Compiler.prototype.options.tabs,
				0,
				'should default to default options for `tabs`.'
			)
		})
		.freeze()
	})

	t.equal(
		unified().use(reson, 4).stringify(
			{type: 'string', value: 'one', position: {
				indent: [4]
			}}
		),
		'\t"one"',
		'should convert spaces to tabs based on option.'
	);

	t.deepEqual(
		indents([2]),
		['  ', '', '', ''],
		'should convert number to spaces.'
	);

	t.deepEqual(
		indents([2], 2),
		['\t', '', '', ''],
		'should convert number to tabs with tabs option.'
	);

	t.deepEqual(
		indents([3], 2),
		['\t ', '', '', ''],
		'should add spaces to end of string when n / tabs !== 0.'
	);

	t.deepEqual(
		indents(),
		['', '', '', ''],
		'should default to spaces.'
	);

	t.equal(
		new Compiler().visit({type: 'one', value: 'one'}),
		'one',
		'should return value by default.'
	);

	t.equal(
		new Compiler().visit(
			{type: 'one', value: 'one'},
			node => [node.type, node.value]
		),
		'oneone',
		'should join by default if array is returned.'
	);

	t.equal(
		new Compiler().visit(
			{type: 'one', raw: 'one'},
			({raw}) => raw
		),
		'one',
		'should return a string.'
	);

	t.equal(
		new Compiler().visit(
			{type: 'one', children: [{type: 'null', raw: 'null'}]}
		),
		'null',
		'should pass array as argument when node has children.'
	);

	t.equal(
		new Compiler().visit(
			{type: 'one', value: '1', position: {
				start: {line: 2},
				end: {line: 3},
				indent: [2]
			}}
		),
		'\n  1\n',
		'should handle newlines and indents.'
	);

	t.end();
});
