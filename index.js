const operators = {
	add: '+',
	sub: '-',
	mul: '*',
	div: '/',
	mod: '%',
}
const reserved = ['with', 'to', 'by']
const lexer = code => code.split(' ').map(val => val.trim()).filter(val => val.length)
const parser = tokens => {
	let index = 0
	const parseNumber = () => ({
		value: parseInt(tokens[index++]),
		type: 'Number'
	})
	const parseOperator = () => {
		const node = {
			value: tokens[index++],
			type: 'Operator',
			expression: []
		}
		if(!operators.hasOwnProperty(node.value) && !reserved.includes(node.value))
			throw new Error(`Invalid operator ${node.value}`)

		while(tokens[index]) {
			node.expression.push(parseExpression())
		}
		return node
	}
	const parseExpression = () => (/\d/.test(tokens[index]) ? parseNumber() : parseOperator())
	return parseExpression()
}
const transpiler = ast => {
	let cache
	const node = ast => ast.type == 'Number' ? number(ast) : operator(ast)
	const number = ast => parseFloat(ast.value)
	const operator = ast => {
		const expr = `${ast.expression.map(node).join(operators[ast.value] || cache)}`
		cache = operators[ast.value]
		return expr
	}
	return operator(ast)
}
const evaluate = code => eval(transpiler(parser(lexer(code))))
const REPL = () => {
	while(true) {
		try {
			const code = prompt('>>')
			console.log(`= ${evaluate(code)}`)
		}
		catch(e) {
			console.log(e)
		}
	}
}
REPL()