
//based on probabilities the outcome is generated
function generateOutcome(probabilities) {

    // Calculating the total sum of probabilities
    const total = probabilities.reduce((sum, outcome) => sum + outcome.probability, 0);

    // Generate a random value between 0 and the total sum
    const randomValue = Math.random() * total;

    let cumulativeProbability = 0;
    for (const outcome of probabilities) {
        //  checking if the random value falls within its range by iterating over the outcome
        cumulativeProbability += outcome.probability;
        if (randomValue <= cumulativeProbability) {
            return outcome.value;
        }
    }

    // return the last outcome as a fallback, If no outcome is returned yet
    return probabilities[probabilities.length - 1].value;
}

//this function is uesd to test the event by generating outcomes for a specified number of iterations
function testEvent(event, iterations) {
    const results = {};

    for (let i = 0; i < iterations; i++) {
        const outcome = generateOutcome(event);
        results[outcome] = (results[outcome] || 0) + 1;
    }

    return results;
}

// Example usage
const EventOfDice = [
    { value: 1, probability: 10 },
    { value: 2, probability: 30 },
    { value: 3, probability: 15 },
    { value: 4, probability: 15 },
    { value: 5, probability: 30 },
    { value: 6, probability: 0 }
];

const EventOfCoin = [
    { value: 'Head', probability: 35 },
    { value: 'Tail', probability: 65 }
];

const Occurrences = 1000;

const diceResults = testEvent(EventOfDice, Occurrences);
const coinResults = testEvent(EventOfCoin, Occurrences);

console.log('Results of dice:', diceResults);
console.log('Results of coin:', coinResults);

module.exports = {
    generateOutcome, testEvent

}
