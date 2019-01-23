module.exports = {
	roots,
	nulls,
	booleans,
	numbers,
	strings,
	arrays,
	items,
	objects,
	propertys,
	keys,
	values
};

function roots(node) {
	return this.visit(node);
}

function nulls(node) {
	return this.visit(node, () => node.raw);
}

function booleans(node) {
	return this.visit(node, () => node.raw);
}

function arrays(node) {
	return this.visit(node, '[', ']');
}

function objects(node) {
	return this.visit(node, '{', '}');
}

function propertys(node, index) {
	if (index > 0) {
		return this.visit(node, ',', children => {
			return children.join(':');
		});
	}

	return this.visit(node, children => children.join(':'));
}

function keys(node) {
	return this.visit(node);
}

function values(node) {
	return this.visit(node);
}

function items(node, index) {
	if (index > 0) {
		return this.visit(node, ',');
	}
	return this.visit(node);
}

function numbers(node) {
	return this.visit(node, () => node.raw);
}

function strings(node) {
	return this.visit(node, '"', '"', () => node.value);
}
