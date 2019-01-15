exports.array = () => String.raw`
Array
	= l:ws '[' value:(
		nl head:Item
		nl tail:(v:AdditionalItems {return v})*
		{
			return [head].concat(tail)
		}
	)? nl ri:ws ']'
	{
		return u(
			'array',
			value || [],
			assign(location(), {indent:indent(l, 0, 0, ri)})
		)
	}
`;

exports.item = () => String.raw`
Item
	= l:ws value:Order
	{
		return u(
			'item',
			value,
			assign(location(), {indent:indent(l)})
		)
	}
`;

exports.additionalItems = () => String.raw`
AdditionalItems
	= l:ws ',' nl value:Order nl
	{
		return u(
			'item',
			value,
			assign(location(), {indent:indent(l)})
		)
	}
`;
