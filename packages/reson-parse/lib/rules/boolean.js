exports.boolean = () => String.raw`
Boolean
	= l:ws value:('true' / 'false') r:ws
	{
		return u(
			'boolean',
			value === 'true',
			assign(location(), {indent:indent(l, r)}),
			{raw: value}
		)
	}
`;
