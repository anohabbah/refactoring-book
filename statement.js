const createStatementData = require("./createStatementData");
const invoices = require("./invoices.json");
const plays = require("./plays.json");

/**
 * @param { { customer: string, performances: { playID: string, audience: string }[] } } invoice
 * @param { { type: string, name: string } } plays
 * @return {string}
 */
function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${(data.totalVolumeCredits)} credits\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(aNumber / 100);
    }
}

const expectedResult = `Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
console.log(statement(invoices[0], plays) === expectedResult)
