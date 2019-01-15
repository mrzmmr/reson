const {test} = require('tap');
const unified = require('unified');
const parser = require('..');
const {indent, u, check} = require('../lib/utils');

test('reson().parse() (api)', t => {
	t.throws(
		() => unified()
			.use(parser, [])
			.freeze(),
		/Unexpected type `array` for options./,
		'should throw with wrong options type.'
	);

	t.throws(
		() => unified()
			.use(parser, '9')
			.freeze(),
		/Unexpected type `string` for options./,
		'should throw with wrong options type.'
	);

	t.throws(
		() => unified()
			.use(parser, {tabs: false})
			.freeze(),
		/Unexpected value `false` for `tabs` option./,
		'should throw with wrong `type` of value for `tabs` option.'
	);

	t.throws(
		() => check([]),
		/Unexpected type `array` for options./,
		'should throw with wrong options type.'
	);

	t.throws(
		() => check({tabs: false}),
		/Unexpected value `false` for `tabs` option./,
		'should throw with wrong `tabs` option.'
	);

	t.deepEqual(
		check(),
		{tabs: 2},
		'should default to default options.'
	);

	t.deepEqual(
		u('root'),
		{
			type: 'root',
			children: [],
			position: {}
		},
		'should create a node with `type`, `children`, `position.'
	);

	t.deepEqual(
		u('null', null),
		{
			type: 'null',
			value: null,
			position: {}
		},
		'should create a node with `type`, `value`, `position`.'
	);

	t.deepEqual(
		u('key', {type: 'string'}),
		{
			type: 'key',
			children: [{
				type: 'string'
			}],
			position: {}
		},
		'should create a node with `children` when value has `type`.'
	);

	t.deepEqual(
		indent('  '),
		[2, 0, 0, 0],
		'should default to zero for indents.'
	);

	t.deepEqual(
		unified()
			.use(parser)
			.parse('\tnull')
			.children[0]
			.position
			.indent,
		[2, 0, 0, 0],
		'should default to 2 spaces for tabs.'
	);

	t.deepEqual(
		unified()
			.use(parser, {tabs: 4})
			.parse('\tnull')
			.children[0]
			.position
			.indent,
		[4, 0, 0, 0],
		'should handle setting `tabs` option in object.'
	);

	t.deepEqual(
		unified()
			.use(parser, 8)
			.parse('\tnull')
			.children[0]
			.position
			.indent,
		[8, 0, 0, 0],
		'should handle setting `tabs` option with number.'
	);

	t.end();
});

