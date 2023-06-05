const axios = require('axios');
const { expect } = require('chai');
const sinon = require('sinon');
const { evaluateExpression, API } = require('..');

describe('evaluateExpression', () => {
    let axiosGetStub;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should evaluate the expression correctly', async () => {
        const expression = '2 * 4 * 4';
        const expectedResult = '32';
        const mockResponse = {
            data: expectedResult
        };

        axiosGetStub.resolves(mockResponse);

        const result = await evaluateExpression(expression);

        expect(result).to.equal(expectedResult);
        expect(axiosGetStub.calledOnce).to.be.true;
        expect(axiosGetStub.args[0][0]).to.equal(API);
        expect(axiosGetStub.args[0][1].params.expr).to.equal(expression);
    });


});
