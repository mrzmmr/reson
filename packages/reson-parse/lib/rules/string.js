exports.string = () => `
String
	= l:ws '"' value:$(!'"' .)* '"' r:ws
	{
		return u(
			'string',
			value,
			assign(location(), {indent:indent(l, r)})
		)
	}
`;
