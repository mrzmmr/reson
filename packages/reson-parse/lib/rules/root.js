/*
 * Add [ \n]* to beginning
 */

exports.root = () => String.raw`
Root
	= nl value:Order* ([ \n]* eof)? {
		return u(
			'root',
			value || [],
			assign(location(), {indent:indent()})
		)
	}
`;
