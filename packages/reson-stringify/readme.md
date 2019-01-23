# reson-stringify

A [compiler][] for [unified][]. Used in the [reson][] [processor][].

## Install

```sh
npm install reson-stringify
```

## Usage

```js
var unified = require('unified')
var parser = require('reson-parse')
var stringify = require('reson-stringify')
var createStream = require('unified-stream')

var processor = unified()
    .use(parser)
    .use(stringify)

process.stdin
    .pipe(createStream(processor))
    .pipe(process.stdout)
```

## API

### `processor.use(stringify[, options])`

#### `options`

Options can be passed directly, or later through [`processor.data()`][data].

##### `options.tabs`

Replace spaces with tabs and specifies how many spaces equal one tab. Remaining spaces are appended to the end. For example:

```js
unified()
    .use(parser)
    .use(stringify, {tabs: 4})
    .processSync('[      1    ]').toString()
    //             ^^^^^^ ^^^^
```

Outputs:

```js
[\t  1\t]
```

## License

[MIT][license] © [Paul Zimmer][author]

[reson]: https://github.com/mrzmmr/reson

[unified]: https://github.com/unifiedjs/unified

[data]: https://github.com/unifiedjs/unified#processordatakey-value

[processor]: https://github.com/mrzmmr/reson/blob/master/packages/reson

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[license]: https://github.com/mrzmmr/reson/blob/master/license

[author]: https://github.com/mrzmmr
