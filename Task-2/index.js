const axios = require('axios');

const API = 'https://api.mathjs.org/v4/'

// Function to evaluate the expression using mathjs API
async function evaluateExpression(expression) {
    try {
        const response = await axios.get(API, {
            params: {
                expr: expression
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Failed to evaluate expression "${expression}":`, error);
        return null;
    }
}

// Function to process the expressions and display the results
async function processExpressions(expressions) {
    for (const expression of expressions) {
        if (expression.toLowerCase() === 'end') {
            break;
        }

        const res = await evaluateExpression(expression);
        console.log(`${expression} => ${res}`);
    }
}

// Example expressions
const expressions = [
    '2 * 4 * 4',
    '5 / (7 - 5)',
    'sqrt(5^2 - 4^2)',
    'sqrt(-3^2 - 4^2)',
    'end'
];

// Start processing the expressions
processExpressions(expressions);

module.exports = { evaluateExpression, API };