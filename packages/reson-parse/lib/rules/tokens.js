exports.tokens = () => String.raw`
Tokens
	= '\n'? value:$(![ \n] .)* (.)*
	{
		return value ? value : 'End of input'
	}
`;
