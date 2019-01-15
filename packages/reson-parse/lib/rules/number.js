exports.number = () => `
Number
	= l:ws '-'? int frac? exp? r:ws
	{
		return u(
			'number',
			parseFloat(text()),
			assign(location(), {indent:indent(l, r)}),
			{raw: text().trim()}
		)
	}
`;
