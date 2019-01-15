'use strict';

module.exports = Object.assign(
	{},
	require('./global'),
	require('./root'),
	require('./null'),
	require('./boolean'),
	require('./number'),
	require('./string'),
	require('./array'),
	require('./object'),
	require('./terminals'),
	require('./tokens')
);
