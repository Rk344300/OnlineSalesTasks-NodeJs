const { expect } = require('chai');
const { generateOutcome, testEvent } = require('..');

describe('generateOutcome', () => {
    it('should generate an outcome based on probabilities', () => {
        const probabilities = [
            { value: 'A', probability: 0.3 },
            { value: 'B', probability: 0.5 },
            { value: 'C', probability: 0.2 }
        ];

        const outcome = generateOutcome(probabilities);

        expect(outcome).to.be.oneOf(['A', 'B', 'C']);
    });

    it('should handle probabilities with a total of 1', () => {
        const probabilities = [
            { value: 'A', probability: 0.1 },
            { value: 'B', probability: 0.3 },
            { value: 'C', probability: 0.6 }
        ];

        const outcome = generateOutcome(probabilities);

        expect(outcome).to.be.oneOf(['A', 'B', 'C']);
    });

    it('should handle probabilities with a total greater than 1', () => {
        const probabilities = [
            { value: 'A', probability: 0.2 },
            { value: 'B', probability: 0.3 },
            { value: 'C', probability: 0.6 }
        ];

        const outcome = generateOutcome(probabilities);

        expect(outcome).to.be.oneOf(['A', 'B', 'C']);
    });

    it('should handle probabilities with a total less than 1', () => {
        const probabilities = [
            { value: 'A', probability: 0.2 },
            { value: 'B', probability: 0.3 }
        ];

        const outcome = generateOutcome(probabilities);

        expect(outcome).to.be.oneOf(['A', 'B']);
    });
});

describe('testEvent', () => {
    it('should generate outcomes for the specified number of iterations', () => {
        const event = [
            { value: 'A', probability: 0.4 },
            { value: 'B', probability: 0.6 }
        ];
        const iterations = 1000;

        const results = testEvent(event, iterations);

        expect(results).to.have.property('A').that.is.a('number');
        expect(results).to.have.property('B').that.is.a('number');
        expect(results.A + results.B).to.equal(iterations);
    });

    it('should handle empty event and zero iterations', () => {
        const event = [];
        const iterations = 0;

        const results = testEvent(event, iterations);

        expect(results).to.deep.equal({});
    });

    it('should handle event with a single outcome', () => {
        const event = [
            { value: 'A', probability: 1 }
        ];
        const iterations = 100;

        const results = testEvent(event, iterations);

        expect(results).to.deep.equal({ A: iterations });
    });
});
