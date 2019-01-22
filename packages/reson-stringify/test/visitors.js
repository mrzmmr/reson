const unified = require('unified');
const {test} = require('tap');
const reson = require('..');

test('reson().stringify()', t => {
	const {stringify} = unified().use(reson);

	t.equal(
		stringify(
			{type: 'root', children: []}
		),
		'',
		'`root` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'null', raw: 'null'}
		),
		'null',
		'`null` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'boolean', raw: 'true'}
		),
		'true',
		'`boolean` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'number', raw: '1.5'}
		),
		'1.5',
		'`number` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'string', value: 'one'}
		),
		'"one"',
		'`string` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'array', children: []}
		),
		'[]',
		'`array` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'array', children: [{type: 'null', raw: 'null'}]}
		),
		'[null]',
		'`array` with item should compile.'
	);

	t.equal(
		stringify(
			{type: 'array', children: [
				{type: 'item', children: [
					{type: 'number', raw: '1'}
				]},
				{type: 'item', children: [
					{type: 'number', raw: '2'}
				]}
			]}
		),
		'[1,2]',
		'`array` with additional items should compile.'
	);

	t.equal(
		stringify(
			{type: 'object', children: []}
		),
		'{}',
		'`object` type should compile.'
	);

	t.equal(
		stringify(
			{type: 'object', children: [
				{type: 'property', children: [
					{type: 'key', children: [
						{type: 'string', value: 'one'}
					]},
					{type: 'value', children: [
						{type: 'number', raw: '1'}
					]}
				]}
			]}
		),
		'{"one":1}',
		'`object` with property should compile.'
	);

	t.equal(
		stringify(
			{type: 'object', children: [
				{type: 'property', children: [
					{type: 'key', children: [
						{type: 'string', value: 'one'}
					]},
					{type: 'value', children: [
						{type: 'number', raw: '1'}
					]}
				]},
				{type: 'property', children: [
					{type: 'key', children: [
						{type: 'string', value: 'two'}
					]},
					{type: 'value', children: [
						{type: 'number', raw: '2'}
					]}
				]}
			]}
		),
		'{"one":1,"two":2}',
		'`object` with additional properties should compile.'
	);

	t.end();
});
