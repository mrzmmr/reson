exports.object = () => String.raw`
Object
	= l:ws '{' value:(
		nl head:Property
		nl tail:(v:AdditionalProperties {return v})*
		{
			return [head].concat(tail)
		}
	)? nl ri:ws '}'
	{
		return u(
			'object',
			value || [],
			assign(location(), {indent:indent(l, 0, 0, ri)})
		)
	}
`;

exports.property = () => String.raw`
Property
	= key:Key ':' value:Value
	{
		return u(
			'property',
			[key, value],
			assign(location(), {indent:indent()})
		)
	}
`;

exports.additionalProperties = () => String.raw`
AdditionalProperties
	= ',' key:Key ':' value:Value
	{
		return u(
			'property',
			[key, value],
			assign(location(), {indent:indent()})
		)
	}
`;

exports.key = () => String.raw`
Key
	= l:ws nl key:String nl r:ws {
		return u(
			'key',
			key,
			assign(location(), {indent:indent(l, r)})
		)
	}
`;

exports.value = () => String.raw`
Value
	= l:ws nl value:Order nl r:ws {
		return u(
			'value',
			value,
			assign(location(), {indent:indent(l, r)})
		)
	}
`;

