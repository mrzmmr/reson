const {test} = require('tap');
const unified = require('unified');
const parser = require('..');

test('reson().parse() (errors)', t => {
	const processor = unified()
		.use(parser)
		.freeze();

	t.throws(
		() => {
			try {
				processor.parse('\n{\n');
			} catch (error) {
				t.ok(error.line === 3, 'correct error line.');
				t.ok(error.column === 1, 'correct error column.');
				throw error;
			}
		},
		/Unexpected token: End of input/,
		'should throw for unclosed object.'
	);

	t.throws(
		() => {
			try {
				processor.parse('\n[\n');
			} catch (error) {
				t.ok(error.line === 3, 'correct error line.');
				t.ok(error.column === 1, 'correct error column.');
				throw error;
			}
		},
		/Unexpected token: End of input/,
		'should throw for unclosed array.'
	);

	t.throws(
		() => {
			try {
				processor.parse('\n{\n\tfalse\n');
			} catch (error) {
				t.ok(error.line === 3, 'correct error line.');
				t.ok(error.column === 3, 'correct error column.');
				throw error;
			}
		},
		/Unexpected token: false/,
		'should throw with unexpected value.'
	);

	t.throws(
		() => processor.parse('\n{ false, true }\n'),
		/Unexpected token: false/,
		'should throw value up to newline or space.'
	);

	t.throws(
		() => processor()
			.use(function () {
				this.Parser.prototype.rules.tokens = () => {
					return 'Tokens = "true"';
				};
			})
			.parse('{ false, true }'),
		/Unexpected token: f/,
		'should fall back to peg error if tokens rule does not match.'
	);

	t.throws(
		() => processor()
			.use(function () {
				this.Parser.prototype.order.push('hello');
			})
			.parse(''),
		/Rule "hello" is not defined./,
		'should throw if building parser fails with bad peg grammar.'
	);

	t.end();
});
