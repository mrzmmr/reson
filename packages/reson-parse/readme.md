# reson-parse

A [parser][] for [unified][] that transforms json into a [unist][] tree. Used in the [reson][] [processor][] .

## Installation

## Usage

With the following json file `example.json`:

```json
{
    "type": "string",
    "value": "hello"
}
```

And a script `example.js`:

```js
var unified = require('unified')
var reson = require('reson-parse')
var inspect = require('unist-util-inspect')
var vfile = require('to-vfile')

var tree = unified()
	.use(reson)
	.parse(vfile.readSync('./example.json'))

console.log(inspect(tree))
```

Will output:

```text
root[1] (1:1-5:1, 0-47)
└─ object[2] (1:1-4:2, 0-46)
   ├─ property[2] (2:1-2:21, 2-22)
   │  ├─ key[1] (2:1-2:11, 2-12)
   │  │  └─ string: "type" (2:5-2:11, 6-12)
   │  └─ value[1] (2:12-2:21, 13-22)
   │     └─ string: "string" (2:13-2:21, 14-22)
   └─ property[2] (2:21-4:1, 22-45)
      ├─ key[1] (2:22-3:12, 23-35)
      │  └─ string: "value" (3:1-3:12, 24-35)
      └─ value[1] (3:13-4:1, 36-45)
         └─ string: "hello" (3:14-3:21, 37-44)
```

[MIT][license] © Paul Zimmer

<!-- definitions -->

[parser]: https://github.com/unifiedjs/unified#processorparser

[unist]: https://github.com/syntax-tree/unist

[unified]: https://github.com/unifiedjs/unified

[utilities]: https://github.com/syntax-tree/unist#list-of-utilities

[reson]: https://github.com/mrzmmr/reson/blob/master/packages/reson

[processor]: https://github.com/unifiedjs/unified#processor

[license]: https://github.com/mrzmmr/reson/blob/master/license

