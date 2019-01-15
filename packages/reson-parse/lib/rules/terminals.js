exports.terminals = () => String.raw`
nl
	= ([\n]+ [ ]* [\n]+ / [\n]+)?

ws
	= [ ]*

eof
	= !.

frac
	= '.' digit0_9+

int
	= '0' / (digit1_9 digit0_9*)

exp
	= [eE] ('-' / '+')? digit0_9+

digit0_9
	= [0-9]

digit1_9
	= [1-9]
`;
