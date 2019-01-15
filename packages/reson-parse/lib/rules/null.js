exports.null = () => `
Null
	= l:ws 'null' r:ws
	{
		return u(
			'null',
			null,
			assign(location(), {indent: indent(l, r)}),
			{raw: 'null'}
		)
	}
`;
